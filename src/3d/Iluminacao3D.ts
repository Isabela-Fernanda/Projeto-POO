import * as THREE from "three";

import { Mapa } from "../mapa/mapa.js";
import { Luminosidade, Sala } from "../mapa/sala.js";

type Tocha3D = {
    luz: THREE.PointLight;
    chama: THREE.Mesh;
    fase: number;
};

type LuzSala3D = {
    sala: Sala;
    luz: THREE.PointLight;
};

type PerfilIluminacao = {
    cor: number;
    intensidadeAmbiente: number;
    alcanceAmbiente: number;
    intensidadeTocha: number;
    alcanceTocha: number;
    espacamentoTochas: number;
};

const PERFIS: Record<Luminosidade, PerfilIluminacao> = {
    [Luminosidade.ESCURO]: {
        cor: 0xffa052,
        intensidadeAmbiente: 0.8,
        alcanceAmbiente: 8,
        intensidadeTocha: 18,
        alcanceTocha: 8,
        espacamentoTochas: 8,
    },
    [Luminosidade.PENUMBRA]: {
        cor: 0xffbd78,
        intensidadeAmbiente: 1.5,
        alcanceAmbiente: 10,
        intensidadeTocha: 8,
        alcanceTocha: 6,
        espacamentoTochas: 5,
    },
    [Luminosidade.ILUMINADO]: {
        cor: 0xffe5b0,
        intensidadeAmbiente: 2.5,
        alcanceAmbiente: 14,
        intensidadeTocha: 3,
        alcanceTocha: 4,
        espacamentoTochas: 3,
    },
};

export class Iluminacao3D {
    private readonly tochas: Tocha3D[] = [];
    private readonly luzesSalas: LuzSala3D[] = [];

    private readonly objetosCriados = new Set<THREE.Object3D>();
    private readonly geometriasCriadas = new Set<THREE.BufferGeometry>();
    private readonly materiaisCriados = new Set<THREE.Material>();

    private adicionarObjeto<T extends THREE.Object3D>(objeto: T): T {
        this.cena.add(objeto);
        this.objetosCriados.add(objeto);

        return objeto;
    }

    private registrarGeometria<T extends THREE.BufferGeometry>(geometria: T,): T {
        this.geometriasCriadas.add(geometria);

        return geometria;
    }

    private registrarMaterial<T extends THREE.Material>(material: T,): T {
        this.materiaisCriados.add(material);

        return material;
    }

    constructor(
        private readonly cena: THREE.Scene,
        private readonly mapa: Mapa,
    ) {
        this.criarIluminacaoGlobal();
        this.criarIluminacaoSalas();
        this.criarTochas();
    }

    private criarIluminacaoGlobal(): void {
        const ambiente = new THREE.HemisphereLight(
            "#667080",
            "#17120f",
            0.2,
        );

        this.adicionarObjeto(ambiente);

        const direcional = new THREE.DirectionalLight(
            "#a5b4c8",
            0.1,
        );

        direcional.position.set(5, 10, 4);
        direcional.castShadow = true;
        direcional.shadow.mapSize.set(1024, 1024);

        this.adicionarObjeto(direcional);
    }

    private criarIluminacaoSalas(): void {
        for (const sala of this.mapa.getSalas()) {
            if (!sala.ehSubterraneo()) continue;

            const perfil = PERFIS[sala.getIluminacaoAmbiente()];

            const luz = new THREE.PointLight(
                perfil.cor,
                perfil.intensidadeAmbiente,
                perfil.alcanceAmbiente,
                2,
            );

            const centroX = sala.getX() + sala.getLargura() / 2;
            const centroZ = sala.getY() + sala.getAltura() / 2;

            luz.position.set(centroX, 2.5, centroZ);
            luz.castShadow = false;

            this.adicionarObjeto(luz);
            this.luzesSalas.push({ sala, luz });
        }
    }

    private calcularPosicoesTochas(sala: Sala, espacamento: number,): Array<{ x: number; z: number }> {
        const posicoes: Array<{ x: number; z: number }> = [];

        const x = sala.getX();
        const z = sala.getY();
        const largura = sala.getLargura();
        const altura = sala.getAltura();

        const margem = 0.8;

        const adicionarPontosNaParede = (inicio: number, fim: number, coordenadaFixa: number, horizontal: boolean,): void => {
            const comprimento = fim - inicio;

            if (comprimento <= margem * 2) {
                return;
            }

            const quantidade = Math.max(
                1,
                Math.floor((comprimento - margem * 2) / espacamento),
            );

            for (let i = 0; i < quantidade; i++) {
                const posicao = inicio + margem + ((comprimento - margem * 2) * (i + 1)) / (quantidade + 1);

                posicoes.push(horizontal ? { x: posicao, z: coordenadaFixa } : { x: coordenadaFixa, z: posicao },);
            }
        };

        // Paredes superior e inferior.
        adicionarPontosNaParede(
            x,
            x + largura,
            z + margem,
            true,
        );

        adicionarPontosNaParede(
            x,
            x + largura,
            z + altura - margem,
            true,
        );

        // Paredes esquerda e direita.
        adicionarPontosNaParede(
            z,
            z + altura,
            x + margem,
            false,
        );

        adicionarPontosNaParede(
            z,
            z + altura,
            x + largura - margem,
            false,
        );

        return posicoes;
    }

    private criarTochas(): void {
        const materialSuporte = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#332923",
                roughness: 0.9,
                metalness: 0.25,
            })
        );

        const materialBrasa = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#ff8a24",
                emissive: "#ff4b08",
                emissiveIntensity: 3,
                roughness: 0.5,
            })
        );

        const materialChama = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#ffb52e",
                emissive: "#ff6a0a",
                emissiveIntensity: 4,
                roughness: 0.4,
            })
        );

        const posicoesUtilizadas = new Set<string>();
        let indiceTocha = 0;

        for (const sala of this.mapa.getSalas()) {
            // Nesta etapa, apenas salas subterrâneas recebem tochas.
            if (!sala.ehSubterraneo()) {
                continue;
            }

            const perfil = PERFIS[sala.getIluminacaoAmbiente()];

            const posicoes = this.calcularPosicoesTochas(
                sala,
                perfil.espacamentoTochas,
            );

            for (const posicao of posicoes) {
                // Evita criar tochas praticamente na mesma posição.
                const chave = `${posicao.x.toFixed(1)}:${posicao.z.toFixed(1)}`;

                if (posicoesUtilizadas.has(chave)) {
                    continue;
                }

                posicoesUtilizadas.add(chave);

                const suporte = this.adicionarObjeto(
                    new THREE.Mesh(
                        this.registrarGeometria(
                            new THREE.BoxGeometry(0.35, 0.12, 0.12)
                        ),
                        materialSuporte,
                    )
                );

                suporte.position.set(posicao.x, 1.9, posicao.z);
                suporte.castShadow = true;

                const haste = this.adicionarObjeto(
                    new THREE.Mesh(
                        this.registrarGeometria(
                            new THREE.CylinderGeometry(0.055, 0.08, 0.55, 8)
                        ),
                        materialSuporte,
                    )
                );

                haste.position.set(posicao.x, 2.15, posicao.z);
                haste.castShadow = true;

                const brasa = this.adicionarObjeto(
                    new THREE.Mesh(
                        this.registrarGeometria(
                            new THREE.SphereGeometry(0.09, 8, 8)
                        ),
                        materialBrasa,
                    )
                );

                brasa.position.set(posicao.x, 2.43, posicao.z);

                const chama = this.adicionarObjeto(
                    new THREE.Mesh(
                        this.registrarGeometria(
                            new THREE.ConeGeometry(0.12, 0.38, 7)
                        ),
                        materialChama,
                    ));

                chama.position.set(posicao.x, 2.65, posicao.z);

                const luz = this.adicionarObjeto(
                    new THREE.PointLight(
                        perfil.cor,
                        perfil.intensidadeTocha,
                        perfil.alcanceTocha,
                        2,
                    )
                );

                luz.position.set(posicao.x, 2.6, posicao.z);
                luz.castShadow = false;

                this.tochas.push({
                    luz,
                    chama,
                    fase: indiceTocha * 1.7,
                });

                indiceTocha++;
            }
        }
    }

    public atualizar(tempo: number): void {
        for (const tocha of this.tochas) {
            const oscilacao =
                Math.sin(tempo * 8 + tocha.fase) * 0.8 +
                Math.sin(tempo * 13 + tocha.fase * 2) * 0.4;

            tocha.luz.intensity = 25 + oscilacao * 2;
            tocha.chama.scale.y = 1 + oscilacao * 0.06;

            tocha.chama.rotation.z =
                Math.sin(tempo * 5 + tocha.fase) * 0.08;
        }
    }

    public obterLuzesDasSalas(): ReadonlyArray<LuzSala3D> {
        return this.luzesSalas;
    }

    public destruir(): void {
        for (const objeto of this.objetosCriados) {
            objeto.removeFromParent();
        }

        for (const geometria of this.geometriasCriadas) {
            geometria.dispose();
        }

        for (const material of this.materiaisCriados) {
            material.dispose();
        }

        this.tochas.length = 0;
        this.luzesSalas.length = 0;

        this.objetosCriados.clear();
        this.geometriasCriadas.clear();
        this.materiaisCriados.clear();
    }
}

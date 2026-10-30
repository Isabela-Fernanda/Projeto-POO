import * as THREE from "three";

import { Mapa } from "../mapa/mapa.js";
import { Sala } from "../mapa/sala.js";

import { Paredes3D } from "./Paredes3D.js";

export class Cenario3D {
    private mapa: Mapa;
    private readonly cena: THREE.Scene;

    private paredes3D: Paredes3D;

    private readonly objetosCriados = new Set<THREE.Object3D>();
    private readonly geometriasCriadas = new Set<THREE.BufferGeometry>();
    private readonly materiaisCriados = new Set<THREE.Material>();

    constructor(cena: THREE.Scene, mapa: Mapa) {
        this.cena = cena;
        this.mapa = mapa;

        this.paredes3D = new Paredes3D(cena, mapa);
    }

    private adicionarObjeto<T extends THREE.Object3D>(objeto: T): T {
        this.cena.add(objeto);
        this.objetosCriados.add(objeto);

        return objeto;
    }

    private registrarMaterial<T extends THREE.Material>(material: T): T {
        this.materiaisCriados.add(material);

        return material;
    }

    private registrarGeometria<T extends THREE.BufferGeometry>(geometria: T): T {
        this.geometriasCriadas.add(geometria);

        return geometria;
    }

    private criarBaseMasmorra(): void {
        const salas = this.mapa.getSalas();

        if (salas.length === 0) return;

        const minX = Math.min(...salas.map((sala) => sala.getX()));
        const minZ = Math.min(...salas.map((sala) => sala.getY()));

        const maxX = Math.max(
            ...salas.map((sala) => sala.getX() + sala.getLargura())
        );

        const maxZ = Math.max(
            ...salas.map((sala) => sala.getY() + sala.getAltura())
        );

        const largura = maxX - minX;
        const profundidade = maxZ - minZ;
        const espessura = 0.3;

        const geometria = this.registrarGeometria(
            new THREE.BoxGeometry(largura, espessura, profundidade)
        );

        const material = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#29272d",
                roughness: 1,
            })
        );

        const base = new THREE.Mesh(geometria, material);

        base.position.set(
            minX + largura / 2,
            -espessura / 2,
            minZ + profundidade / 2
        );

        base.receiveShadow = true;

        this.adicionarObjeto(base);
    }

    private criarTetoMasmorra(): void {
        const salas = this.mapa.getSalas();

        if (salas.length === 0) return;

        const espessura = 0.3;

        const material = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#39363d",
                roughness: 0.95,
                side: THREE.DoubleSide,
            })
        );

        for (const sala of salas) {
            const alturaTeto = sala.getConfiguracaoArquitetonica().alturaTeto;

            for (const area of sala.getPlanta()) {
                const geometria = this.registrarGeometria(
                    new THREE.BoxGeometry(
                        area.largura,
                        espessura,
                        area.altura,
                    )
                );

                const teto = new THREE.Mesh(geometria, material);

                teto.position.set(
                    sala.getX() + area.x + area.largura / 2,
                    alturaTeto + espessura / 2,
                    sala.getY() + area.y + area.altura / 2,
                );

                teto.receiveShadow = true;

                this.adicionarObjeto(teto);
            }
        }
    }

    private criarPisoSala(sala: Sala): void {
        const materiais = [
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#414047",
                    roughness: 0.96,
                })
            ),
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#49464b",
                    roughness: 0.98,
                })
            ),
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#39383e",
                    roughness: 0.95,
                })
            ),
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#454149",
                    roughness: 0.97,
                })
            ),
        ];

        const altura = 0.06;

        for (const area of sala.getPlanta()) {
            for (let linha = 0; linha < area.altura; linha++) {
                const deslocamentoLinha = linha % 2 === 0 ? 0 : 0.22;

                for (let coluna = 0; coluna < area.largura; coluna++) {
                    const x = sala.getX() + area.x + coluna;
                    const z = sala.getY() + area.y + linha;

                    const semente = Math.sin(
                        x * 127.1 + z * 311.7
                    ) * 43758.5453;

                    const aleatorio = semente - Math.floor(semente);

                    const sementeSecundaria = Math.sin(
                        x * 269.5 + z * 183.3
                    ) * 24634.6345;

                    const aleatorioSecundario =
                        sementeSecundaria - Math.floor(sementeSecundaria);

                    const largura = 0.94 + aleatorio * 0.045;
                    const profundidade = 0.94 + aleatorioSecundario * 0.045;

                    const geometria = this.registrarGeometria(
                        this.criarGeometriaPlaca(
                            largura,
                            profundidade,
                            altura,
                            x * 17 + z * 31,
                        )
                    );

                    const indiceMaterial = Math.floor(
                        aleatorio * materiais.length
                    );

                    const pedra = new THREE.Mesh(
                        geometria,
                        materiais[indiceMaterial],
                    );

                    pedra.position.set(
                        x + 0.5 + deslocamentoLinha,
                        altura / 2,
                        z + 0.5,
                    );

                    pedra.rotation.y = (aleatorio - 0.5) * 0.07;
                    pedra.receiveShadow = true;

                    this.adicionarObjeto(pedra);
                }
            }
        }
    }

    private criarGeometriaPlaca(largura: number, profundidade: number, altura: number, semente: number): THREE.BufferGeometry {
        const geometria = new THREE.BufferGeometry();
        const vertices: number[] = [];

        const aleatorio = (indice: number): number => {
            const valor = Math.sin(semente + indice * 127.1) * 43758.5453;
            return valor - Math.floor(valor);
        };

        const meioX = largura / 2;
        const meioZ = profundidade / 2;

        // Cantos levemente desgastados, mantendo o formato retangular.
        const canto = Math.min(largura, profundidade) * 0.09;

        const pontos: THREE.Vector3[] = [
            new THREE.Vector3(-meioX + canto * (0.8 + aleatorio(0) * 0.4), altura, -meioZ),
            new THREE.Vector3(meioX - canto * (0.8 + aleatorio(1) * 0.4), altura, -meioZ),

            new THREE.Vector3(meioX, altura, -meioZ + canto * (0.8 + aleatorio(2) * 0.4)),
            new THREE.Vector3(meioX, altura, meioZ - canto * (0.8 + aleatorio(3) * 0.4)),

            new THREE.Vector3(meioX - canto * (0.8 + aleatorio(4) * 0.4), altura, meioZ),
            new THREE.Vector3(-meioX + canto * (0.8 + aleatorio(5) * 0.4), altura, meioZ),

            new THREE.Vector3(-meioX, altura, meioZ - canto * (0.8 + aleatorio(6) * 0.4)),
            new THREE.Vector3(-meioX, altura, -meioZ + canto * (0.8 + aleatorio(7) * 0.4)),
        ];

        const adicionarTriangulo = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3): void => {
            vertices.push(
                a.x, a.y, a.z,
                b.x, b.y, b.z,
                c.x, c.y, c.z
            );
        };

        const centro = new THREE.Vector3(0, altura, 0);

        // Face superior.
        for (let i = 0; i < pontos.length; i++) {
            const atual = pontos[i];
            const proximo = pontos[(i + 1) % pontos.length];

            adicionarTriangulo(centro, proximo, atual);
        }

        // Face inferior.
        const base = pontos.map(
            (ponto) => new THREE.Vector3(ponto.x, 0, ponto.z)
        );

        for (let i = 0; i < base.length; i++) {
            const atual = base[i];
            const proximo = base[(i + 1) % base.length];

            adicionarTriangulo(
                new THREE.Vector3(0, 0, 0),
                atual,
                proximo
            );
        }

        // Laterais da placa.
        for (let i = 0; i < pontos.length; i++) {
            const proximo = (i + 1) % pontos.length;

            adicionarTriangulo(pontos[i], base[i], base[proximo]);
            adicionarTriangulo(pontos[i], base[proximo], pontos[proximo]);
        }

        geometria.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        geometria.computeVertexNormals();

        return geometria;
    }

    private criarGrade(): void {
        const salas = this.mapa.getSalas();

        if (salas.length === 0) return;

        const minX = Math.min(...salas.map((sala) => sala.getX()));
        const minZ = Math.min(...salas.map((sala) => sala.getY()));

        const maxX = Math.max(...salas.map((sala) => sala.getX() + sala.getLargura()));

        const maxZ = Math.max(...salas.map((sala) => sala.getY() + sala.getAltura()));

        const largura = maxX - minX;
        const profundidade = maxZ - minZ;
        const tamanho = Math.max(largura, profundidade);

        const grade = new THREE.GridHelper(
            tamanho,
            Math.ceil(tamanho),
            "#777777",
            "#383838"
        );

        this.registrarGeometria(grade.geometry);

        if (Array.isArray(grade.material)) {
            for (const material of grade.material) {
                this.registrarMaterial(material);
            }
        } else {
            this.registrarMaterial(grade.material);
        }

        grade.position.set(
            minX + largura / 2,
            0.015,
            minZ + profundidade / 2
        );

        this.adicionarObjeto(grade);
    }

    public criarBaseEPisos(): void {
        this.criarBaseMasmorra();

        for (const sala of this.mapa.getSalas()) {
            this.criarPisoSala(sala);
        }

        this.criarGrade();
        this.paredes3D.criar();
        this.criarTetoMasmorra();
    }

    public reconstruir(mapa: Mapa): void {
        this.limparCenario();

        this.mapa = mapa;
        this.paredes3D = new Paredes3D(this.cena, mapa);

        this.criarBaseEPisos();
    }

    private limparCenario(): void {
        this.paredes3D.destruir();

        for (const objeto of this.objetosCriados) {
            this.cena.remove(objeto);
        }

        for (const geometria of this.geometriasCriadas) {
            geometria.dispose();
        }

        for (const material of this.materiaisCriados) {
            material.dispose();
        }

        this.objetosCriados.clear();
        this.geometriasCriadas.clear();
        this.materiaisCriados.clear();
    }

    public destruir(): void {
        this.limparCenario();
    }
}

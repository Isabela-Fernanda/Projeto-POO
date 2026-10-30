import * as THREE from "three";

import { CONFIGURACAO_HUMANO, type ConfiguracaoPersonagem, } from "./ConfiguracaoPersonagem.js";

export class Personagem3D {
    private readonly grupo: THREE.Group;

    private readonly bracoEsquerdo = new THREE.Group();
    private readonly bracoDireito = new THREE.Group();

    private readonly pernaEsquerda = new THREE.Group();
    private readonly pernaDireita = new THREE.Group();

    private tempoAnimacao = 0;

    private tempoInteracao = 0;
    private readonly duracaoInteracao = 0.6;

    private readonly geometriasCriadas = new Set<THREE.BufferGeometry>();
    private readonly materiaisCriados = new Set<THREE.Material>();

    constructor(
        private readonly configuracao: ConfiguracaoPersonagem =
            CONFIGURACAO_HUMANO
    ) {
        this.grupo = new THREE.Group();

        this.criarModelo();

        this.grupo.scale.set(
            this.configuracao.largura,
            this.configuracao.altura,
            this.configuracao.largura
        );

        const limites = new THREE.Box3().setFromObject(this.grupo);

        const alturaPiso = 0.06;
        const margem = 0.005;

        this.grupo.position.set(
            this.configuracao.posicaoX ?? 1,
            alturaPiso - limites.min.y + margem,
            this.configuracao.posicaoZ ?? 23
        );
    }

    private registrarMaterial<T extends THREE.Material>(material: T): T {
        this.materiaisCriados.add(material);
        return material;
    }

    private criarModelo(): void {
        const materialTunica = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: this.configuracao.corRoupa,
                roughness: 0.9,
            })
        );

        const materialCalca = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: this.configuracao.corCalca,
                roughness: 0.95,
            })
        );

        const materialPele = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: this.configuracao.corPele,
                roughness: 0.85,
            })
        );

        const materialCabelo = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: this.configuracao.corCabelo,
                roughness: 0.95,
            })
        );

        const materialBota = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: this.configuracao.corBota,
                roughness: 0.95,
            })
        );

        const adicionarPeca = (geometria: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number,): THREE.Mesh => {
            this.geometriasCriadas.add(geometria);

            const peca = new THREE.Mesh(geometria, material);

            peca.position.set(x, y, z);
            peca.castShadow = true;
            peca.receiveShadow = true;

            this.grupo.add(peca);

            return peca;
        };

        // Tronco: túnica.
        adicionarPeca(
            new THREE.BoxGeometry(0.46, 0.62, 0.30),
            materialTunica,
            0,
            0.08,
            0,
        );

        // Parte superior da túnica: define a linha dos ombros.
        adicionarPeca(
            new THREE.BoxGeometry(0.62, 0.20, 0.32),
            materialTunica,
            0,
            0.25,
            0,
        );

        // Pescoço.
        adicionarPeca(
            new THREE.CylinderGeometry(0.075, 0.09, 0.16, 8),
            materialPele,
            0,
            0.43,
            0,
        );

        // Cabeça.
        adicionarPeca(
            new THREE.SphereGeometry(0.17, 10, 8),
            materialPele,
            0,
            0.53,
            0,
        );

        // Orelhas: pontudas para elfos e goblinoides.
        const racasComOrelhasPontudas = [
            "elfo",
            "goblin",
            "goblin-arqueiro",
            "goblin-xama",
            "hobgoblin",
        ];

        const orelhasPontudas = racasComOrelhasPontudas.includes(
            this.configuracao.raca
        );

        const materialOrelha = materialPele;

        for (const lado of [-1, 1]) {
            const orelha = adicionarPeca(
                orelhasPontudas ? new THREE.ConeGeometry(0.055, 0.18, 5) : new THREE.SphereGeometry(0.045, 6, 4),
                materialOrelha,
                lado * 0.17,
                0.54,
                0
            );

            if (orelhasPontudas) {
                orelha.rotation.z = lado === -1 ? Math.PI / 2 : -Math.PI / 2;

                orelha.scale.set(1, 1, 0.65);
            }
        }

        // Cabelo: volume principal.
        const cabelo = adicionarPeca(
            new THREE.SphereGeometry(0.178, 10, 8),
            materialCabelo,
            0,
            0.60,
            -0.035,
        );

        cabelo.scale.set(1, 0.68, 1);

        // Franja.
        adicionarPeca(
            new THREE.BoxGeometry(0.24, 0.07, 0.12),
            materialCabelo,
            0,
            0.66,
            0.105,
        );

        // Barba volumosa para o anão.
        if (this.configuracao.raca === "anao") {
            adicionarPeca(
                new THREE.ConeGeometry(0.105, 0.25, 7),
                materialCabelo,
                0,
                0.39,
                0.105,
            );
        }

        // Cabelo curto e contrastante para os goblins.
        const racasGoblin = [
            "goblin",
            "goblin-arqueiro",
            "goblin-xama",
            "hobgoblin",
        ];

        if (racasGoblin.includes(this.configuracao.raca)) {
            adicionarPeca(
                new THREE.SphereGeometry(0.14, 8, 6),
                materialCabelo,
                0,
                0.63,
                -0.045,
            );
        }

        // Olhos.
        const materialOlhos = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#292522",
                roughness: 0.8,
            })
        );

        for (const lado of [-1, 1]) {
            adicionarPeca(
                new THREE.SphereGeometry(0.025, 6, 4),
                materialOlhos,
                lado * 0.065,
                0.54,
                0.155,
            );
        }

        // Braços, mãos, pernas e botas.
        for (const lado of [-1, 1]) {
            // Grupo do braço: articulação no ombro.
            const braco = lado === -1 ? this.bracoEsquerdo : this.bracoDireito;

            braco.position.set(lado * 0.29, 0.25, 0);
            this.grupo.add(braco);

            // Manga da túnica.
            this.adicionarPecaAoGrupo(
                braco,
                new THREE.CapsuleGeometry(0.075, 0.42, 4, 6),
                materialTunica,
                0,
                -0.19,
                0,
            );

            // Pulso.
            this.adicionarPecaAoGrupo(
                braco,
                new THREE.CylinderGeometry(0.045, 0.05, 0.08, 8),
                materialPele,
                lado * 0.01,
                -0.43,
                0,
            );

            // Mão.
            this.adicionarPecaAoGrupo(
                braco,
                new THREE.SphereGeometry(0.07, 8, 6),
                materialPele,
                lado * 0.01,
                -0.48,
                0,
            );

            // Grupo da perna: articulação no quadril.
            const perna = lado === -1 ? this.pernaEsquerda : this.pernaDireita;

            perna.position.set(lado * 0.12, -0.22, 0);
            this.grupo.add(perna);

            // Calça.
            this.adicionarPecaAoGrupo(
                perna,
                new THREE.BoxGeometry(0.15, 0.43, 0.18),
                materialCalca,
                0,
                -0.21,
                0,
            );

            // Bota.
            this.adicionarPecaAoGrupo(
                perna,
                new THREE.BoxGeometry(0.18, 0.13, 0.30),
                materialBota,
                0,
                -0.48,
                0.035,
            );
        }

        // Equipamentos exclusivos dos goblins especializados.
        const raca = this.configuracao.raca;

        if (raca === "goblin-arqueiro") {
            const materialArco = this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#79502b",
                    roughness: 0.9,
                })
            );

            // Haste curva estilizada do arco.
            const arco = adicionarPeca(
                new THREE.TorusGeometry(0.16, 0.025, 5, 10, Math.PI),
                materialArco,
                0.38,
                0.10,
                0.08,
            );

            arco.rotation.z = Math.PI / 2;
        }

        if (raca === "goblin-xama") {
            const materialCajado = this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#63452d",
                    roughness: 0.95,
                })
            );

            const materialMagia = this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#9b68d9",
                    emissive: "#6d35a8",
                    emissiveIntensity: 1.5,
                })
            );

            // Haste vertical do cajado.
            adicionarPeca(
                new THREE.CylinderGeometry(0.025, 0.035, 0.85, 6),
                materialCajado,
                0.40,
                -0.12,
                0.08,
            );

            // Cristal mágico no topo.
            adicionarPeca(
                new THREE.OctahedronGeometry(0.09),
                materialMagia,
                0.40,
                0.36,
                0.08,
            );
        }

        // Armadura do hobgoblin.
        if (raca === "hobgoblin") {
            const materialArmadura = this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#77716a",
                    metalness: 0.65,
                    roughness: 0.45,
                })
            );

            const materialDetalhes = this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#a77a3b",
                    metalness: 0.45,
                    roughness: 0.55,
                })
            );

            // Peitoral sobre a túnica.
            adicionarPeca(
                new THREE.BoxGeometry(0.40, 0.38, 0.055),
                materialArmadura,
                0,
                0.10,
                0.165,
            );

            // Ombreiras.
            for (const lado of [-1, 1]) {
                adicionarPeca(
                    new THREE.SphereGeometry(0.12, 7, 5),
                    materialArmadura,
                    lado * 0.31,
                    0.30,
                    0,
                );
            }

            // Emblema central.
            adicionarPeca(
                new THREE.BoxGeometry(0.10, 0.07, 0.025),
                materialDetalhes,
                0,
                0.16,
                0.20,
            );
        }
    }

    private adicionarPecaAoGrupo(grupo: THREE.Group, geometria: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number,): THREE.Mesh {
        this.geometriasCriadas.add(geometria);

        const peca = new THREE.Mesh(geometria, material);

        peca.position.set(x, y, z);
        peca.castShadow = true;
        peca.receiveShadow = true;

        grupo.add(peca);

        return peca;
    }

    public atualizarAnimacao(delta: number, andando: boolean): void {
        if (andando) {
            this.tempoAnimacao += delta * 8;
        }

        // Animação de caminhada.
        const amplitude = andando ? 0.5 : 0;
        const movimento = Math.sin(this.tempoAnimacao) * amplitude;

        // Animação de interação com a porta.
        let movimentoInteracao = 0;

        if (this.tempoInteracao > 0) {
            this.tempoInteracao = Math.max(
                0,
                this.tempoInteracao - delta
            );

            const progresso =
                1 - this.tempoInteracao / this.duracaoInteracao;

            // Estende o braço e depois o recolhe.
            movimentoInteracao =
                Math.sin(progresso * Math.PI) * 1.2;
        }

        // Combina os movimentos sem perder a animação de caminhada.
        this.bracoEsquerdo.rotation.x = movimento;
        this.bracoDireito.rotation.x = -movimento - movimentoInteracao;

        this.pernaEsquerda.rotation.x = -movimento;
        this.pernaDireita.rotation.x = movimento;
    }

    public iniciarAnimacaoInteracao(): void {
        this.tempoInteracao = this.duracaoInteracao;
    }

    public getObjeto3D(): THREE.Group {
        return this.grupo;
    }

    public destruir(): void {
        this.grupo.removeFromParent();

        for (const geometria of this.geometriasCriadas) {
            geometria.dispose();
        }

        for (const material of this.materiaisCriados) {
            material.dispose();
        }

        this.geometriasCriadas.clear();
        this.materiaisCriados.clear();
    }
}

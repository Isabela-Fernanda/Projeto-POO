import * as THREE from "three";

import { Porta, EstadoPorta } from "../mapa/porta.js";
import { TipoSala, LadoSala } from "../mapa/sala.js";
import { Colisoes3D } from "./Colisoes3D.js";

type DimensoesPorta = {
    largura: number;
    altura: number;
};

export class Porta3D {
    private readonly portasVisuais = new Map<Porta, THREE.Group>();
    private readonly fechadurasVisuais = new Map<Porta, THREE.Mesh>();
    private readonly obstaculosPortas = new Map<Porta, THREE.Mesh>();
    private readonly dimensoesPortas = new Map<Porta, DimensoesPorta>();

    private readonly alturaPorta = 3.25;


    private readonly duracaoAnimacao = 0.5;
    private readonly rotacoesIniciais = new Map<Porta, number>();
    private readonly rotacoesAlvo = new Map<Porta, number>();
    private readonly temposAnimacao = new Map<Porta, number>();


    constructor(
        private readonly cena: THREE.Scene,
        private readonly colisoes3D: Colisoes3D
    ) { }

    public criar(porta: Porta): void {
        const altura = this.alturaPorta;
        const profundidade = 0.12;

        const margemAbertura = 0.5;

        const larguraAbertura =
            porta.getLadoA() === LadoSala.NORTE ||
                porta.getLadoA() === LadoSala.SUL
                ? porta.getLargura()
                : porta.getAltura();

        const largura = larguraAbertura + margemAbertura * 2;

        const origem = porta.getOrigem();
        const destino = porta.getDestino();

        const salaCorredor = [origem, destino].find(
            (sala) => sala.getTipoSala() === TipoSala.CORREDOR
        );

        const grupo = new THREE.Group();
        const lado = porta.getLadoA();

        let centroX = porta.getX() + porta.getLargura() / 2;
        let centroZ = porta.getY() + porta.getAltura() / 2;

        if (salaCorredor) {
            if (
                lado === LadoSala.LESTE ||
                lado === LadoSala.OESTE
            ) {
                centroZ =
                    salaCorredor.getY() +
                    salaCorredor.getAltura() / 2;
            } else {
                centroX =
                    salaCorredor.getX() +
                    salaCorredor.getLargura() / 2;
            }
        }

        if (
            lado === LadoSala.LESTE ||
            lado === LadoSala.OESTE
        ) {
            grupo.rotation.y = Math.PI / 2;
        }

        const materialMadeira = new THREE.MeshStandardMaterial({
            color: "#68452f",
            roughness: 0.9,
        });

        const materialTravessa = new THREE.MeshStandardMaterial({
            color: "#493025",
            roughness: 0.85,
        });

        const materialMetal = new THREE.MeshStandardMaterial({
            color: "#393b40",
            metalness: 0.65,
            roughness: 0.45,
        });

        // Tábuas verticais.
        const quantidadeTabuas = 5;
        const larguraTabua = largura / quantidadeTabuas;

        for (let i = 0; i < quantidadeTabuas; i++) {
            const tabua = new THREE.Mesh(
                new THREE.BoxGeometry(
                    larguraTabua - 0.025,
                    altura,
                    profundidade
                ),
                materialMadeira
            );

            tabua.position.set(
                -largura / 2 + larguraTabua * (i + 0.5),
                altura / 2,
                0
            );

            tabua.castShadow = true;
            tabua.receiveShadow = true;

            grupo.add(tabua);
        }

        // Travessas horizontais.
        for (const y of [0.55, 1.85]) {
            const travessa = new THREE.Mesh(
                new THREE.BoxGeometry(
                    largura - 0.08,
                    0.16,
                    profundidade + 0.04
                ),
                materialTravessa
            );

            travessa.position.set(0, y, 0);
            travessa.castShadow = true;

            grupo.add(travessa);
        }

        // Reforços metálicos.
        for (const x of [-0.55, 0.55]) {
            const reforco = new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.07,
                    altura - 0.15,
                    profundidade + 0.06
                ),
                materialMetal
            );

            reforco.position.set(x, altura / 2, 0);
            grupo.add(reforco);
        }

        // Fechadura para portas inicialmente trancadas.
        if (porta.getEstado() === EstadoPorta.TRANCADA) {
            const fechadura = new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.18,
                    0.22,
                    profundidade + 0.1
                ),
                materialMetal
            );

            fechadura.position.set(
                largura * 0.28,
                altura * 0.52,
                0
            );

            grupo.add(fechadura);
            this.fechadurasVisuais.set(porta, fechadura);
        }

        const rotacaoFechada = grupo.rotation.y;

        // Move as peças para que a origem do grupo fique na dobradiça.
        for (const peca of grupo.children) {
            peca.position.x += largura / 2;
        }

        const deslocamentoX =
            Math.cos(rotacaoFechada) * (largura / 2);

        const deslocamentoZ =
            -Math.sin(rotacaoFechada) * (largura / 2);

        grupo.position.set(
            centroX - deslocamentoX,
            0,
            centroZ - deslocamentoZ
        );

        grupo.userData.rotacaoFechada = rotacaoFechada;

        this.cena.add(grupo);
        this.portasVisuais.set(porta, grupo);
        this.dimensoesPortas.set(porta, { largura, altura });

        // Obstáculo invisível que acompanha a folha da porta.
        const obstaculo = new THREE.Mesh(
            new THREE.BoxGeometry(largura, altura, profundidade),
            new THREE.MeshBasicMaterial({ visible: false })
        );

        obstaculo.visible = false;
        obstaculo.castShadow = false;
        obstaculo.receiveShadow = false;

        this.cena.add(obstaculo);

        this.obstaculosPortas.set(porta, obstaculo);
        this.colisoes3D.registrarObstaculo(obstaculo);

        this.atualizarObstaculo(porta);
        this.atualizar(porta);
    }

    public atualizar(porta: Porta): void {
        const grupo = this.portasVisuais.get(porta);

        if (!grupo) return;

        const rotacaoFechada =
            grupo.userData.rotacaoFechada as number;

        const aberta = porta.getEstado() === EstadoPorta.ABERTA;

        this.rotacoesIniciais.set(porta, grupo.rotation.y);
        this.rotacoesAlvo.set(
            porta,
            aberta ? rotacaoFechada + Math.PI / 2 : rotacaoFechada
        );
        this.temposAnimacao.set(porta, 0);

        const fechadura = this.fechadurasVisuais.get(porta);

        if (fechadura) {
            fechadura.visible =
                porta.getEstado() === EstadoPorta.TRANCADA;
        }
    }

    public atualizarAnimacoes(delta: number): void {
        for (const [porta, tempoAtual] of this.temposAnimacao) {
            const grupo = this.portasVisuais.get(porta);
            const rotacaoInicial = this.rotacoesIniciais.get(porta);
            const rotacaoAlvo = this.rotacoesAlvo.get(porta);

            if (
                !grupo ||
                rotacaoInicial === undefined ||
                rotacaoAlvo === undefined
            ) {
                continue;
            }

            const novoTempo = Math.min(
                tempoAtual + delta,
                this.duracaoAnimacao
            );

            const progresso = novoTempo / this.duracaoAnimacao;

            // Suaviza a aceleração e a desaceleração da porta.
            const progressoSuave =
                progresso * progresso * (3 - 2 * progresso);

            grupo.rotation.y =
                rotacaoInicial +
                (rotacaoAlvo - rotacaoInicial) * progressoSuave;

            this.temposAnimacao.set(porta, novoTempo);

            if (novoTempo >= this.duracaoAnimacao) {
                this.temposAnimacao.delete(porta);
            }
        }
    }

    public getGrupo(porta: Porta): THREE.Group | undefined {
        return this.portasVisuais.get(porta);
    }

    public getPortas(): IterableIterator<Porta> {
        return this.portasVisuais.keys();
    }

    private atualizarObstaculo(porta: Porta): void {
        const grupo = this.portasVisuais.get(porta);
        const obstaculo = this.obstaculosPortas.get(porta);
        const dimensoes = this.dimensoesPortas.get(porta);

        if (!grupo || !obstaculo || !dimensoes) return;

        grupo.updateMatrixWorld(true);

        const { largura, altura } = dimensoes;
        const rotacao = grupo.rotation.y;

        const deslocamentoLocal = new THREE.Vector3(
            largura / 2,
            0,
            0
        );

        deslocamentoLocal.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            rotacao
        );

        obstaculo.position
            .copy(grupo.position)
            .add(deslocamentoLocal);

        obstaculo.position.y = altura / 2;
        obstaculo.rotation.copy(grupo.rotation);
        obstaculo.visible = false;

        obstaculo.updateMatrixWorld(true);
    }

    public destruir(): void {
        for (const obstaculo of this.obstaculosPortas.values()) {
            this.colisoes3D.removerObstaculo(obstaculo);
            this.cena.remove(obstaculo);
            obstaculo.geometry.dispose();

            const material = obstaculo.material;

            if (Array.isArray(material)) {
                material.forEach((item) => item.dispose());
            } else {
                material.dispose();
            }
        }

        for (const grupo of this.portasVisuais.values()) {
            this.cena.remove(grupo);

            grupo.traverse((objeto) => {
                if (!(objeto instanceof THREE.Mesh)) return;

                objeto.geometry.dispose();

                const material = objeto.material;

                if (Array.isArray(material)) {
                    material.forEach((item) => item.dispose());
                } else {
                    material.dispose();
                }
            });
        }

        this.portasVisuais.clear();
        this.fechadurasVisuais.clear();
        this.obstaculosPortas.clear();
        this.dimensoesPortas.clear();
    }
}

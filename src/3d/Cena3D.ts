import * as THREE from "three";

import { Mapa } from "../mapa/mapa.js";
import { Jogador } from "../personagens/tiposPersonagem/jogador.js";
import { Porta, EstadoPorta } from "../mapa/porta.js";

import { Controles3D } from "./Controles3D.js";
import { Camera3D } from "./Camera3D.js";
import { Colisoes3D } from "./Colisoes3D.js";

import { CONFIGURACAO_ELFO, CONFIGURACAO_ANAO, CONFIGURACAO_GOBLIN, CONFIGURACAO_GOBLIN_ARQUEIRO, CONFIGURACAO_GOBLIN_XAMA, CONFIGURACAO_HOBGOBLIN, } from "./ConfiguracaoPersonagem.js";
import { Personagem3D } from "./Personagem3D.js";

import { Cenario3D } from "./Cenario3D.js";
import { Iluminacao3D } from "./Iluminacao3D.js";

import { Porta3D } from "./Porta3D.js";

export class Cena3D {
    private mapa: Mapa;
    private readonly jogador: Jogador;

    private controles3D!: Controles3D;

    private readonly camera3D: Camera3D;
    private readonly camera: THREE.PerspectiveCamera;

    private readonly cena: THREE.Scene;
    private readonly renderer: THREE.WebGLRenderer;

    private personagem3D!: Personagem3D;
    private personagem!: THREE.Group;
    private personagensApresentacao: Personagem3D[] = [];

    private readonly velocidade = 4;

    private readonly colisoes3D = new Colisoes3D(0.35, 0.3);

    private readonly relogio = new THREE.Timer();

    private porta3D: Porta3D;

    private cenario3D!: Cenario3D;

    private iluminacao3D: Iluminacao3D;
    private iluminacaoApresentacao: THREE.Light[] = [];

    constructor(container: HTMLElement, mapa: Mapa, jogador: Jogador) {
        this.mapa = mapa;
        this.jogador = jogador;

        this.cena = new THREE.Scene();
        this.cena.background = new THREE.Color("#111318");
        this.cena.fog = new THREE.Fog("#111318", 12, 35);

        this.camera3D = new Camera3D(
            container.clientWidth,
            container.clientHeight
        );

        this.camera = this.camera3D.getCamera();

        this.renderer = new THREE.WebGLRenderer({ antialias: true, });

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.renderer.setSize(container.clientWidth, container.clientHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        container.appendChild(this.renderer.domElement);

        this.iluminacao3D = new Iluminacao3D(this.cena, this.mapa);
        this.porta3D = new Porta3D(this.cena, this.colisoes3D);

        this.criarCenario();

        this.controles3D = new Controles3D(this.renderer.domElement, {
            aoInteragir: () => this.interagirComPorta(),

            aoAlternarCamera: () => this.camera3D.alternarModo(),

            aoIniciarRotacao: (x, y) => {
                this.camera3D.iniciarRotacao(x, y);
            },

            aoRotacionar: (x, y) => {
                this.camera3D.rotacionar(x, y);
            },

            aoFinalizarRotacao: () => {
                this.camera3D.finalizarRotacao();
            },

            aoAjustarZoom: (delta, evento) => {
                this.camera3D.ajustarZoom(delta, evento);
            },
        });

        window.addEventListener("resize", this.redimensionar);

        this.animar();
    }

    private ativarIluminacaoApresentacao(): void {
        const ambiente = new THREE.AmbientLight(0xffffff, 2.0);

        const principal = new THREE.DirectionalLight(0xffffff, 2.5);
        principal.position.set(14, 25, 35);

        const preenchimento = new THREE.DirectionalLight(0xffffff, 1.5);
        preenchimento.position.set(-12, 15, 25);

        this.iluminacaoApresentacao = [
            ambiente,
            principal,
            preenchimento,
        ];

        this.cena.add(...this.iluminacaoApresentacao);
    }

    private criarCenario(): void {
        this.cenario3D = new Cenario3D(this.cena, this.mapa);

        this.cenario3D.criarBaseEPisos();

        for (const conexao of this.mapa.getConexoes()) {
            if (conexao instanceof Porta) {
                this.porta3D.criar(conexao)
            }
        }

        this.criarPersonagemProvisorio();
        this.criarPersonagensApresentacao();

        this.ativarIluminacaoApresentacao();
    }

    private recriarPortas(): void {
        this.porta3D.destruir();

        this.porta3D = new Porta3D(
            this.cena,
            this.colisoes3D,
        );

        for (const conexao of this.mapa.getConexoes()) {
            if (conexao instanceof Porta) {
                this.porta3D.criar(conexao);
            }
        }
    }

    private recriarIluminacao(): void {
        this.iluminacao3D.destruir();

        this.iluminacao3D = new Iluminacao3D(
            this.cena,
            this.mapa,
        );
    }

    private criarPersonagemProvisorio(): void {
        this.personagem3D = new Personagem3D();

        this.personagem = this.personagem3D.getObjeto3D();

        this.cena.add(this.personagem);
    }

    private criarPersonagensApresentacao(): void {
        const configuracoes = [
            CONFIGURACAO_ELFO,
            CONFIGURACAO_ANAO,
            CONFIGURACAO_GOBLIN,
            CONFIGURACAO_GOBLIN_ARQUEIRO,
            CONFIGURACAO_GOBLIN_XAMA,
            CONFIGURACAO_HOBGOBLIN,
        ];

        for (const configuracao of configuracoes) {
            const personagem3D = new Personagem3D(configuracao);

            this.personagensApresentacao.push(personagem3D);

            this.cena.add(personagem3D.getObjeto3D());
        }
    }

    private interagirComPorta(): void {
        const posicao = this.personagem.position;

        let portaMaisProxima: Porta | null = null;
        let menorDistancia = Infinity;

        for (const porta of this.porta3D.getPortas()) {
            const grupo = this.porta3D.getGrupo(porta);

            if (!grupo) continue;

            const distancia = Math.hypot(
                posicao.x - grupo.position.x,
                posicao.z - grupo.position.z
            );

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                portaMaisProxima = porta;
            }
        }

        if (!portaMaisProxima || menorDistancia > 2) {
            console.log("Não há portas por perto.");
            return;
        }

        const interacaoBemSucedida =
            portaMaisProxima.interagir(this.jogador);

        if (interacaoBemSucedida) {
            this.personagem3D.iniciarAnimacaoInteracao();

            this.portasPendentes.push({
                porta: portaMaisProxima,
                tempoRestante: 0.6,
            })

            console.log(
                `Estado atual da porta: ${EstadoPorta[portaMaisProxima.getEstado()]
                }`
            );
        }
    }

    private atualizarPortasPendentes(delta: number): void {
        for (let i = this.portasPendentes.length - 1; i >= 0; i--) {
            const pendente = this.portasPendentes[i];

            pendente.tempoRestante -= delta;

            if (pendente.tempoRestante <= 0) {
                this.porta3D.atualizar(pendente.porta);
                this.portasPendentes.splice(i, 1);
            }
        }
    }

    private moverPersonagem(delta: number): void {
        const movimento = new THREE.Vector3();
        const teclas = this.controles3D.getTeclas();

        if (teclas.has("w")) movimento.z -= 1;
        if (teclas.has("s")) movimento.z += 1;
        if (teclas.has("a")) movimento.x -= 1;
        if (teclas.has("d")) movimento.x += 1;

        if (movimento.lengthSq() === 0) return;

        movimento.normalize();

        // Direção horizontal para a qual a câmera está voltada.
        const rotacaoHorizontal = this.camera3D.getRotacaoHorizontal();

        const frente = new THREE.Vector3(
            -Math.sin(rotacaoHorizontal),
            0,
            -Math.cos(rotacaoHorizontal)
        );

        // Vetor lateral perpendicular à direção da câmera.
        const direita = new THREE.Vector3(-frente.z, 0, frente.x);

        const deslocamento = frente.multiplyScalar(-movimento.z).add(direita.multiplyScalar(movimento.x));

        deslocamento.normalize();

        const distancia = this.velocidade * delta;

        const proximoX = this.personagem.position.x + deslocamento.x * distancia;

        const proximoZ = this.personagem.position.z + deslocamento.z * distancia;

        // Testa o eixo X separadamente para permitir deslizar pelas paredes.
        if (!this.colisoes3D.colideComObstaculo(proximoX, this.personagem.position.z)) {
            this.personagem.position.x = proximoX;
        }

        // Testa o eixo Z usando a posição X já atualizada.
        if (!this.colisoes3D.colideComObstaculo(this.personagem.position.x, proximoZ)) {
            this.personagem.position.z = proximoZ;
        }
        // O personagem acompanha a direção do movimento.
        this.personagem.rotation.y = Math.atan2(deslocamento.x, deslocamento.z);
    }

    private atualizarCamera(): void {
        this.camera3D.atualizar(
            this.personagem,
            (alvo, posicaoDesejada) =>
                this.colisoes3D.calcularPosicaoSeguraCamera(alvo, posicaoDesejada)
        );
    }

    private redimensionar = (): void => {
        const container = this.renderer.domElement.parentElement;

        if (!container) return;

        const largura = container.clientWidth;
        const altura = container.clientHeight;

        if (largura === 0 || altura === 0) return;

        this.camera3D.redimensionar(largura, altura);

        this.renderer.setSize(largura, altura);
    };

    private ultimoFrame = 0;


    private readonly portasPendentes: {
        porta: Porta;
        tempoRestante: number;
    }[] = [];


    private animar = (tempoMs: number = 0): void => {
        this.relogio.update(tempoMs);

        const delta = this.ultimoFrame === 0 ? 0 : Math.min((tempoMs - this.ultimoFrame) / 1000, 0.05);

        this.ultimoFrame = tempoMs;

        const tempo = this.relogio.getElapsed();

        this.iluminacao3D.atualizar(tempo);

        this.moverPersonagem(delta);

        const teclas = this.controles3D.getTeclas();

        const andando =
            teclas.has("w") ||
            teclas.has("a") ||
            teclas.has("s") ||
            teclas.has("d");

        this.personagem3D.atualizarAnimacao(delta, andando);

        this.porta3D.atualizarAnimacoes(delta);

        this.atualizarPortasPendentes(delta);

        this.atualizarCamera();

        this.renderer.render(this.cena, this.camera);
        requestAnimationFrame(this.animar);
    };

    public trocarMapa(novoMapa: Mapa): void {
        // Remove os elementos do mapa anterior.
        this.porta3D.destruir();
        this.cenario3D.destruir();
        this.iluminacao3D.destruir();

        // Atualiza o mapa utilizado pela cena.
        this.mapa = novoMapa;

        // Reconstrói os elementos visuais.
        this.cenario3D = new Cenario3D(this.cena, this.mapa);
        this.cenario3D.criarBaseEPisos();

        this.porta3D = new Porta3D(this.cena, this.colisoes3D);

        for (const conexao of this.mapa.getConexoes()) {
            if (conexao instanceof Porta) {
                this.porta3D.criar(conexao);
            }
        }

        this.iluminacao3D = new Iluminacao3D(this.cena, this.mapa);

        // Reinicia a posição do personagem.
        const posicaoInicial = this.mapa.getPosicaoInicial();
        const rotacaoInicial = this.mapa.getRotacaoInicial();

        this.personagem.position.set(
            posicaoInicial.x + 0.5,
            0,
            posicaoInicial.y + 0.5
        );

        this.personagem.rotation.y = rotacaoInicial;
    }

    public destruir(): void {
        window.removeEventListener("resize", this.redimensionar);

        this.controles3D.destruir();

        this.iluminacao3D.destruir();

        this.porta3D.destruir();

        this.personagem3D.destruir();

        for (const personagem of this.personagensApresentacao) {
            personagem.destruir();
        }

        this.personagensApresentacao = [];

        this.cenario3D.destruir();

        for (const luz of this.iluminacaoApresentacao) {
            this.cena.remove(luz);
        }

        this.iluminacaoApresentacao = [];

        this.renderer.dispose();
        this.renderer.domElement.remove();
    }
}

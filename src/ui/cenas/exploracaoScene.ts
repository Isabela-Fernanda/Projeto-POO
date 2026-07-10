import Phaser from "phaser";

import { Game } from "@ui/game.js";
import { GameController } from "@ui/gameController.js";
import { ControladorExploracao } from "@ui/exploracao/controladorExploracao.js";
import { MapaRenderer } from "@ui/render/mapaRender.js";
import { PainelMensagens } from "@ui/componentes/painelMensagens.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { Mapa } from "@mapa/mapa.js";

export class ExploracaoScene extends Phaser.Scene {
    private mapaRenderer!: MapaRenderer;
    private painelMensagens!: PainelMensagens;
    private controlador!: ControladorExploracao;

    private teclas!: {
        w: Phaser.Input.Keyboard.Key;
        a: Phaser.Input.Keyboard.Key;
        s: Phaser.Input.Keyboard.Key;
        d: Phaser.Input.Keyboard.Key;
        e: Phaser.Input.Keyboard.Key;
    };

    constructor() {
        super("Exploracao");
    }

    private get controller(): GameController {
        return (this.game as Game).controller;
    }

    create() {
        const mapa = this.controller.getMapa();
        const jogador = this.controller.getJogador();

        if (!mapa || !jogador) {
            return;
        }

        this.criarRenderizadores();
        this.configurarTeclado();
        this.configurarMouse();
        this.configurarEntrada(mapa, jogador);
        this.criarInterface();

        this.renderizar();
    }

    private criarRenderizadores() {
        this.mapaRenderer = new MapaRenderer(this);

        this.painelMensagens = new PainelMensagens(this);

        this.painelMensagens.atualizar(
            this.controller.getMensagens()
        );

    }

    private configurarTeclado() {
        const keyboard = this.input.keyboard;

        if (!keyboard) return;

        this.teclas = keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            e: Phaser.Input.Keyboard.KeyCodes.E,
        }) as any;
    }

    private configurarMouse(){
        this.input.on("wheel", (pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[], deltaX: number, deltaY: number) => {
            if (deltaY > 0) {
                this.painelMensagens.descer(this.controller.getMensagens());
            } else {
                this.painelMensagens.subir(this.controller.getMensagens());
            }
            this.painelMensagens.atualizar(this.controller.getMensagens());
        });
    }

    private configurarEntrada(mapa: Mapa, jogador: Jogador) {
        const tutorial = this.controller.getTutorial();

        if (!tutorial) return;

        this.controlador = new ControladorExploracao(mapa, jogador, tutorial, this.controller.getMensagens());
    }

    private criarInterface() {
        this.criarFundo();
        this.criarTitulo();
        this.atualizarHUD();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.teclas.w)) {
            this.controlador.mover(0, -1);
            this.renderizar();
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.s)) {
            this.controlador.mover(0, 1);
            this.renderizar();
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.a)) {
            this.controlador.mover(-1, 0);
            this.renderizar();
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.d)) {
            this.controlador.mover(1, 0);
            this.renderizar();
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.e)) {
            const mudouMapa = this.controlador.interagir();
            this.renderizar();

            this.painelMensagens.atualizar(this.controller.getMensagens());

            if (mudouMapa) {
                // futuramente atualizar HUD
                // tocar fade
                // tocar música
                // mostrar mensagem
            }
        }
    }

    private renderizar() {
        this.mapaRenderer.renderizar(
            this.controller.getMapa()!,
            this.controller.getJogador()!
        );
    }

    private criarFundo() {
        this.cameras.main.setBackgroundColor("#2d5a27");
    }

    private criarTitulo() {
        const { width } = this.scale;

        this.add.text(
            width / 2,
            40,
            "Exploração",
            {
                fontSize: "36px",
                color: "#ffffff"
            }
        ).setOrigin(.5);
    }

    private atualizarHUD() {
        const jogador = this.controller.getJogador();

        if (!jogador) {
            this.add.text(
                20,
                80,
                "Nenhum jogador carregado.",
                {
                    color: "#ffffff",
                    fontSize: "22px"
                }
            );
            return;
        }

        this.add.text(
            20,
            80,
            `Nome: ${jogador.getNome()}`
        );

        this.add.text(
            20,
            110,
            `Classe: ${jogador.getClasse()?.getNome()}`
        );

        this.add.text(
            20,
            140,
            `Nível: ${jogador.getNivel()}`
        );

        this.add.text(
            20,
            170,
            `Vida: ${jogador.getVidaAtual()} / ${jogador.getVidaMaxima()}`
        );

        this.add.text(
            20,
            200,
            `Mana: ${jogador.getManaAtual()} / ${jogador.getManaMaxima()}`
        );
    }
}
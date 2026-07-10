import Phaser from "phaser";
import { Botao } from "@ui/componentes/botao.js";
import { GameController } from "@ui/gameController.js";
import { Game } from "@ui/game.js";

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(
            width / 2,
            height * 0.18,
            "RPG Tormenta",
            {
                fontSize: "48px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        const centroX = width / 2;
        const yInicial = height * 0.4;
        const espacamento = 90;

        const possuiCampanha = this.controller.possuiCampanhaAtiva();
        const textoBotao = possuiCampanha ? "Continuar Jornada" : "Iniciar Jornada";
        new Botao(this, centroX, yInicial, 320, 60, textoBotao, () => this.iniciarOuContinuar()
        );

        new Botao(this, centroX, yInicial + espacamento, 320, 60, "Criar Personagem", () => this.continuar());

        new Botao(this, centroX, yInicial + espacamento * 2, 320, 60, "Personagens", () => this.sair());

        new Botao(this, centroX, yInicial + espacamento * 3, 320, 60, "Histórico", () => this.sair());

        new Botao(this, centroX, yInicial + espacamento * 4, 320, 60, "Sair", () => this.sair());
    }

    private get controller(): GameController {
        return (this.game as Game).controller;
    }

    private async iniciarOuContinuar() {
        const sucesso = this.controller.possuiCampanhaAtiva() ? await this.controller.continuar() : await this.controller.novoJogo();

        if(sucesso){
            this.scene.start("Exploracao");
        }
    }

    private continuar() {
        this.controller.continuar();
    }

    private sair() {
        this.controller.sair();
    }
}
import { Game } from "@ui/game.js";
import Phaser from "phaser";
import { Bootstrap } from "@app/bootstrap.js";

export class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    async create() {
        Bootstrap.iniciar();
        
        const game = this.game as Game;

        await game.controller.inicializar();

        this.scene.start("MainMenu");
    }

    preload() {
        console.log("Carregando assets...");
    }
}
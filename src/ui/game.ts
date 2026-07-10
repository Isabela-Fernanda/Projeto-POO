import Phaser from "phaser";

import { BootScene } from "./cenas/bootScene.js";
import { MainMenuScene } from "./cenas/mainMenuScene.js";
import { ExploracaoScene } from "./cenas/exploracaoScene.js"

import { GameController } from "./gameController.js";
import { SaveManagerFactory } from "@persistencia/saveManagerFactory.js";

export class Game extends Phaser.Game {
    public readonly controller: GameController;

    constructor() {
        super({
            type: Phaser.AUTO,
            width: 1280,
            height: 720,
            backgroundColor: "#202020",
            scene: [
                BootScene,
                MainMenuScene,
                ExploracaoScene
            ]
        });

        this.controller = new GameController(SaveManagerFactory.criar());
    }
}
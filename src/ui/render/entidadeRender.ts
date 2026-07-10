import Phaser from "phaser";

import { Mapa } from "@mapa/mapa.js";

import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { Inimigo } from "@personagens/tiposPersonagem/inimigo.js";
import { PaletaMapa } from "./paletaMapa.js";

export class EntidadeRenderer {
    constructor(
        private graphics: Phaser.GameObjects.Graphics,
        private tamanhoTile: number
    ) {}

    desenhar(mapa: Mapa, tileX: number, tileY: number, pixelX: number, pixelY: number) {
        const entidade = mapa.getEntidadeEm(tileX, tileY);

        if (!entidade) return;

        if (entidade instanceof Jogador)
            this.graphics.fillStyle(PaletaMapa.JOGADOR);
        else if (entidade instanceof Inimigo)
            this.graphics.fillStyle(PaletaMapa.INIMIGO);
        else
            this.graphics.fillStyle(PaletaMapa.NPC);

        this.graphics.fillCircle(pixelX + this.tamanhoTile / 2, pixelY + this.tamanhoTile / 2, 14);
    }
}
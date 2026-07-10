import Phaser from "phaser";

import { Mapa } from "@mapa/mapa.js";
import { TileMapa } from "@mapa/tileMapa.js";
import { PaletaMapa } from "./paletaMapa.js";

export class TileRenderer {
    constructor(
        private graphics: Phaser.GameObjects.Graphics,
        private tamanhoTile: number
    ) {}

    desenhar(mapa: Mapa, tileX: number, tileY: number, pixelX: number, pixelY: number): void {
        const tile = mapa.getTile(tileX, tileY);

        const cor = this.getCor(tile);

        if (cor === undefined)
            return;

        this.graphics.fillStyle(cor);

        this.graphics.fillRect(
            pixelX,
            pixelY,
            this.tamanhoTile,
            this.tamanhoTile
        );
    }

    private getCor(tile: TileMapa): number | undefined {
        switch (tile) {
            case TileMapa.CHAO: return PaletaMapa.CHAO;
            case TileMapa.PAREDE: return PaletaMapa.PAREDE;
            case TileMapa.PASSAGEM: return PaletaMapa.PASSAGEM;
            case TileMapa.PORTA: return PaletaMapa.PORTA;
            default: return undefined;
        }
    }
}
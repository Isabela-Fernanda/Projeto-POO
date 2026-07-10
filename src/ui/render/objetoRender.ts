import Phaser from "phaser";

import { Mapa } from "@mapa/mapa.js";

import { Bau, Mesa, Portal, Estante, Espolio } from "@mapa/catalogoObjetos.js";
import { PaletaMapa } from "./paletaMapa.js";

export class ObjetoRenderer {
    constructor(
        private graphics: Phaser.GameObjects.Graphics,
        private tamanhoTile: number
    ) {}

    desenhar(mapa: Mapa, tileX: number, tileY: number, pixelX: number, pixelY: number) {
        const objeto = mapa.getObjetoEm(tileX, tileY);

        if (!objeto) return;

        let cor = PaletaMapa.OBJETO;
        if (objeto instanceof Bau) cor = PaletaMapa.BAU;
        else if (objeto instanceof Mesa) cor = PaletaMapa.MESA;
        else if (objeto instanceof Estante) cor = PaletaMapa.ESTANTE;
        else if (objeto instanceof Portal) cor = PaletaMapa.PORTAL;
        else if (objeto instanceof Espolio)  cor = PaletaMapa.ESPOLIO;

        this.graphics.fillStyle(cor);

        this.graphics.fillRect(pixelX + 12, pixelY + 12, 24, 24);
    }
}
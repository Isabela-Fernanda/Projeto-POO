import Phaser from "phaser";

import { Mapa } from "@mapa/mapa.js";
import { TileMapa } from "@mapa/tileMapa.js";
import { CalculadoraCamera } from "@mapa/calcularCamera.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { TileRenderer } from "./tileRender.js";
import { EntidadeRenderer } from "./entidadeRender.js";
import { ObjetoRenderer } from "./objetoRender.js";
import { VisibilidadeMapa } from "@mapa/visibilidadeMapa.js";

export class MapaRenderer {
    private readonly tamanhoTile = 48;

    private graphics: Phaser.GameObjects.Graphics;

    private tileRenderer: TileRenderer;
    private objetoRenderer: ObjetoRenderer;
    private entidadeRenderer: EntidadeRenderer;

    constructor(
        private scene: Phaser.Scene
    ) {
        this.graphics = scene.add.graphics();

        this.tileRenderer = new TileRenderer(this.graphics, this.tamanhoTile);

        this.objetoRenderer = new ObjetoRenderer(this.graphics, this.tamanhoTile);

        this.entidadeRenderer = new EntidadeRenderer(this.graphics, this.tamanhoTile);
    }

    renderizar(mapa: Mapa, jogador: Jogador): void {
        this.graphics.clear();

        const camera = CalculadoraCamera.calcular(jogador, 20, 15);

        for (let y = 0; y < camera.getAltura(); y++) {

            for (let x = 0; x < camera.getLargura(); x++) {
                const tileX = camera.getX() + x;
                const tileY = camera.getY() + y;

                const pixelX = x * this.tamanhoTile;
                const pixelY = y * this.tamanhoTile;

                if (!VisibilidadeMapa.podeVer(mapa, jogador, tileX, tileY))
                    continue;

                this.tileRenderer.desenhar(mapa, tileX, tileY, pixelX, pixelY);

                this.objetoRenderer.desenhar(mapa, tileX, tileY, pixelX, pixelY);

                this.entidadeRenderer.desenhar(mapa, tileX, tileY, pixelX, pixelY);
            }
        }
    }
}
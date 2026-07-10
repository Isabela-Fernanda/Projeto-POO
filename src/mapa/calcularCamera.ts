import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { CameraMapa } from "./cameraMapa.js"

export class CalculadoraCamera {
    static calcular(jogador: Jogador, larguraVisivel: number, alturaVisivel: number
    ): CameraMapa {
        let cameraX = 0;
        let cameraY = 0;

        if (jogador) {
            const sala = jogador.getSalaAtual();
            if (sala) {
                const totalQuadrosSalaX = sala.getLargura() + 1;
                const totalQuadrosSalaY = sala.getAltura() + 1;

                if (totalQuadrosSalaX < larguraVisivel) {
                    cameraX = sala.getX() - Math.floor((larguraVisivel - totalQuadrosSalaX) / 2);
                } else {
                    cameraX = jogador.getX() - Math.floor(larguraVisivel / 2);
                    cameraX = Math.max(cameraX, sala.getX());
                    cameraX = Math.min(cameraX, sala.getX() + sala.getLargura() - larguraVisivel + 1);
                }

                if (totalQuadrosSalaY < alturaVisivel) {
                    cameraY = sala.getY() - Math.floor((alturaVisivel - totalQuadrosSalaY) / 2);
                } else {
                    cameraY = jogador.getY() - Math.floor(alturaVisivel / 2);
                    cameraY = Math.max(cameraY, sala.getY());
                    cameraY = Math.min(cameraY, sala.getY() + sala.getAltura() - alturaVisivel + 1);
                }
            } else {
                cameraX = jogador.getX() - Math.floor(larguraVisivel / 2);
                cameraY = Math.floor(larguraVisivel / 2);
            }
        }

        return new CameraMapa(
            cameraX,
            cameraY,
            larguraVisivel,
            alturaVisivel
        );
    }
}
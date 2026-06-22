import { Jogador } from "../personagens/jogador.ts";
import { Inimigo } from "../personagens/inimigo/inimigo.ts";
import { Mapa } from "../mapa/mapa.ts";
import { Personagem } from "../personagens/personagem.ts";

export class SistemaEncontros {
    static verificarEncontro(jogador: Jogador, mapa: Mapa): Personagem[] | null {
        const inimigos = mapa.getEntidades().filter(e => {
            if(e === jogador) {
                return false;
            }

            return mapa.calcularDistancia(jogador.getX(), jogador.getY(), e.getX(), e.getY()) <= 1.5;
        });

        return inimigos.length > 0 ? inimigos : null;
    }
}
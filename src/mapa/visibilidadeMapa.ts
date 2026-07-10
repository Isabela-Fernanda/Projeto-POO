import { Jogador } from "@personagens/tiposPersonagem/jogador.js";

import { Mapa } from "./mapa.js";

export class VisibilidadeMapa {
    static podeVer(mapa: Mapa, jogador: Jogador, x: number, y: number): boolean {
        const sala = mapa.getSalaPorPosicao(x, y);

        if (!sala) return false;

        if (sala === jogador.getSalaAtual()) return true;

        return sala.foiDescoberta();
    }
}
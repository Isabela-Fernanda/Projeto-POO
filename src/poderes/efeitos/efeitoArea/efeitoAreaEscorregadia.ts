import { Personagem } from "../../../personagens/personagem.js";
import { EfeitoArea } from "../../efeitoArea.js";
import { Condicao } from "../../../combate/tipoCondicao.js";
import {EfeitoDesequilibrado } from "../efeitoCondicao.js";
import { EfeitoTerrenoEscorregadio } from "../efeitoTerrenoEscorregadio.js";

export class EfeitoAreaEscorregadia extends EfeitoArea {
    constructor(
        x: number,
        y: number,
        raio: number,
        duracao: number,
        private cd: number
    ) {
        super(x, y, raio, duracao);
    }

    afetar(alvo: Personagem): void {
        if (!alvo.possuiCondicao(Condicao.DESEQUILIBRADO)) {
            alvo.adicionarEfeito(new EfeitoDesequilibrado(1));
        }
        
        const jaTem = alvo.getEfeitos().some(e => e.getNome() === "Terreno Escorregadio");

        if (!jaTem) {
            alvo.adicionarEfeito(new EfeitoTerrenoEscorregadio());
        }
    }
}
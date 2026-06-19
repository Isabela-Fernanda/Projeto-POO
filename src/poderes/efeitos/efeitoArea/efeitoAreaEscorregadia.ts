import { Personagem } from "../../../personagens/personagem.ts";
import { EfeitoArea } from "../../efeitoArea.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";
import { EfeitoCondicao } from "../efeitoCondicao.ts";
import { EfeitoTerrenoEscorregadio } from "../efeitoTerrenoEscorregadio.ts";

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
            alvo.adicionarEfeito(new EfeitoCondicao("Área Escorregadia", 1, Condicao.DESEQUILIBRADO));
        }
        
        const jaTem = alvo.getEfeitos().some(e => e.getNome() === "Terreno Escorregadio");

        if (!jaTem) {
            alvo.adicionarEfeito(new EfeitoTerrenoEscorregadio());
        }
    }
}
import { Condicao } from "../../../combate/tipoCondicao.ts";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.ts";
import { Personagem } from "../../../personagens/personagem.ts";
import { EfeitoArea } from "../../efeitoArea.ts";
import { EfeitoCondicao } from "../efeitoCondicao.ts";
import { EfeitoNevoaCondicao } from "../efeitoNevoaCondicao.ts";

export class EfeitoNevoa extends EfeitoArea {
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
        if (!alvo.possuiCondicao(Condicao.CAMUFLADO)) {
            alvo.adicionarEfeito(new EfeitoCondicao("Névoa", 1, Condicao.CAMUFLADO));
        }
        const jaTem = alvo.getEfeitos().some(e => e.getNome() === "Penalidade de Névoa");

        if (!jaTem) {
            alvo.adicionarEfeito(new EfeitoNevoaCondicao());
        }

    }
}
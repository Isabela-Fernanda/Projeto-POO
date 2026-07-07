import { Condicao } from "../../../combate/tipoCondicao.js";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.js";
import { Personagem } from "../../../personagens/personagem.js";
import { EfeitoArea } from "../../efeitoArea.js";
import { EfeitoCamuflado } from "../efeitoCondicao.js";
import { EfeitoNevoaCondicao } from "../efeitoNevoaCondicao.js";

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
            alvo.adicionarEfeito(new EfeitoCamuflado(1));
        }
        const jaTem = alvo.getEfeitos().some(e => e.getNome() === "Penalidade de Névoa");

        if (!jaTem) {
            alvo.adicionarEfeito(new EfeitoNevoaCondicao());
        }

    }
}
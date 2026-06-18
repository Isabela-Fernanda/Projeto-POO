import { Personagem } from "../../personagens/personagem.ts";
import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class EfeitoCondicao extends Efeito {
    constructor(
        nome: string,
        duracao: number,
        condicao: Condicao,
    ) {
        super(nome, duracao, [condicao]);
    }
}
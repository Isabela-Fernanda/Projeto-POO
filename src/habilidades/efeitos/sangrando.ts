import { Personagem } from "../../personagens/personagem.ts";
import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Sangramento extends Efeito {
    constructor() {
        super("Sangramento", 3, [Condicao.SANGRANDO]);
    }

    processar(personagem: Personagem): void {
        personagem.receberDano(1);
    }
}
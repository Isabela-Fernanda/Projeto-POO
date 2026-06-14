import { Personagem } from "../../personagens/personagem.ts";
import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Envenenado extends Efeito {

    constructor() {
        super("Envenenado", 3, [Condicao.ENVENENADO]);
    }

    override processar(personagem: Personagem): void {
        personagem.receberDano(2);

        console.log(
            `${personagem.getNome()} sofre 2 pontos de dano do veneno.`
        );
    }
}
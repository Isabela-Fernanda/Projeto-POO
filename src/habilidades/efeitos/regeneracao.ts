import { Personagem } from "../../personagens/personagem.ts";
import { Efeito } from "../efeito.ts";

export class Regeneracao extends Efeito {
    constructor() {
        super("Regeneração", 5);
    }

    override processar(personagem: Personagem): void {
        personagem.regenerarVida(2);

        console.log(`${personagem.getNome()} recupera 2 PV.`);
    }
}
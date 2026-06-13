import { ResistenciaMagia } from "./baseResistenciaMagia.ts";
import { TipoAlvo } from "../habilidades.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { Personagem } from "../../personagens/personagem.ts";

import { Amedrontado } from "../efeitos/amedrontado.ts";

export class Amedrontar extends ResistenciaMagia {
    constructor(){
        super("Amedontar", "O alvo fica abalado", 1, TipoDano.MENTAL, TipoAlvo.INIMIGO);
    }

    protected override alvoFalhou(usuario: Personagem, alvo: Personagem): void {
        alvo.adicionarEfeito(new Amedrontado());
    }
}
import { ResistenciaMagia } from "./baseResistenciaMagia.ts";
import { TipoAlvo } from "../habilidades.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { Personagem } from "../../personagens/personagem.ts";

import { Adormecido } from "../efeitos/adormecido.ts";

export class Sono extends ResistenciaMagia {
    constructor(){
        super("Sono", "O alvo adormece", 2, TipoDano.MENTAL, TipoAlvo.INIMIGO);
    }

    protected override alvoFalhou(usuario: Personagem, alvo: Personagem): void {
        console.log(`${alvo.getNome()} recebeu o efeito Adormecido`);
        alvo.adicionarEfeito(new Adormecido());
    }
}
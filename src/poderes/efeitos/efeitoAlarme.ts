import { Efeito } from "../efeito.ts";
import { Personagem } from "../../personagens/personagem.ts";

export class EfeitoAlarme extends Efeito {

    constructor() {
        super("Alarme", 999);
    }

    override processar(personagem: Personagem): void {
        // verificar entrada na área
    }
}
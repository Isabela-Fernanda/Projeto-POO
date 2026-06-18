import { Efeito } from "../efeito.ts";

export class EfeitoAreaEscorregadia extends Efeito {
    constructor(
        duracao: number
    ) {
        super("Área Escorregadia", duracao);
    }

    override getBonusDeslocamento(): number {
        return -3;
    }
}
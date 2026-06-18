import { Efeito } from "../efeito.ts";

export class EfeitoNevoa extends Efeito {
    constructor(
        duracao: number
    ) {
        super("Névoa", duracao);
    }

    getBonusPercepcao(): number {
        return -5;
    }

    possuiCamuflagem(): boolean {
        return true;
    }

    possuiCamuflagemTotal(): boolean {
        return true;
    }
}
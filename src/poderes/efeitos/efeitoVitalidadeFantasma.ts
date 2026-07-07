import { Efeito } from "../efeito.js";

export class EfeitoVitalidadeFantasma extends Efeito {
    constructor(
        private pvTemporarios: number
    ) {
        super("Vitalidade Fantasma", 10);
    }

    getPvTemporarios(): number {
        return this.pvTemporarios;
    }
}
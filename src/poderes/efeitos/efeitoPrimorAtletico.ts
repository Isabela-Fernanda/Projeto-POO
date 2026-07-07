import { Efeito } from "../efeito.js";

export class EfeitoPrimorAtletico extends Efeito {

    constructor() {
        super("Primor Atlético", 10);
    }

    override getBonusDeslocamento(): number {
        return 9;
    }

    override getBonusAtletismo(): number {
        return 10;
    }
}
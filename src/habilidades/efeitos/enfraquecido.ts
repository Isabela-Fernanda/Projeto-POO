import { Efeito } from "../efeito.ts";

export class Enfraquecido extends Efeito {
    constructor() {
        super("Enfraquecido", 3);
    }

    override getBonusAtaque(): number {
        return -2;
    }
}
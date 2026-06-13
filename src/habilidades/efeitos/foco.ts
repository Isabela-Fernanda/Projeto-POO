import { Efeito } from "../efeito.ts";

export class Foco extends Efeito {

    constructor() {
        super("Foco", 2);
    }

    override getBonusAtaque(): number {
        return 2;
    }
}
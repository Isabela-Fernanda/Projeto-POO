import { Efeito } from "../efeito.ts";

export class Bencao extends Efeito {
    constructor() {
        super(
            "Benção",
            3 // duração em rodadas
);
    }

    override getBonusAtaque(): number {
        return 1;
    }

    override getBonusDefesa(): number {
        return 1;
    }
}
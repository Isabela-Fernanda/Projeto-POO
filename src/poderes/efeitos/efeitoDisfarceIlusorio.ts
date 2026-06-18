import { Efeito } from "../efeito.ts";

export class EfeitoDisfarceIlusorio extends Efeito {

    constructor() {
        super("Disfarce Ilusório", 10);
    }

    override getBonusEnganacao(): number {
        return 10;
    }
}
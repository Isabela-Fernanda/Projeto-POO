import { Efeito } from "../efeito.ts";
import { TagEfeito } from "../tags.ts";

export class EfeitoArmaMagica extends Efeito {

    constructor() {
        super("Arma Mágica", 10);
    }

    override getBonusAtaque(): number {
        return 1;
    }

    override getBonusDano(): number {
        return 1;
    }

    override getTags(): TagEfeito[] {
        return [TagEfeito.MAGICO];
    }
}
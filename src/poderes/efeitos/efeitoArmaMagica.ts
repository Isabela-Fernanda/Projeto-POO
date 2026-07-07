import { Efeito } from "../efeito.js";
import { TagEfeito } from "../tags.js";

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
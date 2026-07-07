import { Efeito } from "../efeito.js";
import { TagEfeito } from "../tags.js";

export class EfeitoLuzArcana extends Efeito {
    constructor() {
        super("Luz Arcana", 10); // duração da cena
    }

    override emiteLuz(): boolean {
        return true;
    }

    override getRaioLuz(): number {
        return 6;
    }

    override getTags(): TagEfeito[] {
        return [TagEfeito.LUZ];
    }

    override getTagsAnuladas(): TagEfeito[] {
        return [TagEfeito.ESCURIDAO];
    }
}
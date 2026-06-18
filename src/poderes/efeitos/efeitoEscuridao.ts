import { Efeito } from "../efeito.ts";
import { TagEfeito } from "../tags.ts";

export class EfeitoEscuridaoArcana extends Efeito {
    constructor() {
        super("Escuridão Arcana", 10);
    }

    override emiteEscuridao(): boolean {
        return true;
    }

    override getRaioEscururidao(): number {
        return 6;
    }

    override getTags(): TagEfeito[] {
        return [TagEfeito.ESCURIDAO];
    }

    override getTagsAnuladas(): TagEfeito[] {
        return [TagEfeito.LUZ];
    }
}
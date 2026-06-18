import { Efeito } from "../efeito.ts";

export class EfeitoEnfeiticado extends Efeito {
    constructor() {
        super("Enfeitiçado", 10);
    }

    getBonusDiplomacia(): number {
        return 10;
    }
}
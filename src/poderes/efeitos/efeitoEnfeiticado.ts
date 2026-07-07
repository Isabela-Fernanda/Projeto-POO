import { Efeito } from "../efeito.js";

export class EfeitoEnfeiticado extends Efeito {
    constructor() {
        super("Enfeitiçado", 10);
    }

    getBonusDiplomacia(): number {
        return 10;
    }
}
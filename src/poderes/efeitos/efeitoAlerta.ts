import { Efeito } from "../efeito.js";

export class EfeitoAlerta extends Efeito {
    constructor() {
        super("Alerta", 1);
    }

    override getBonusIniciativa(): number {
        return 5;
    }

    override getBonusPercepcao(): number {
        return 5;
    }
}
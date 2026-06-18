import { Efeito } from "../efeito.ts";

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
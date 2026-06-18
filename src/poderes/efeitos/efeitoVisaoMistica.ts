import { Efeito } from "../efeito.ts";

export class EfeitoVisaoMistica extends Efeito {

    constructor() {
        super("Visão Mística", 10);
    }

    possuiVisaoMistica(): boolean {
        return true;
    }
}
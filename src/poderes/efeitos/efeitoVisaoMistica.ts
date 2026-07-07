import { Efeito } from "../efeito.js";

export class EfeitoVisaoMistica extends Efeito {

    constructor() {
        super("Visão Mística", 10);
    }

    possuiVisaoMistica(): boolean {
        return true;
    }
}
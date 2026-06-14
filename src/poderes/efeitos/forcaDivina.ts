import { Efeito } from "../efeito.ts";

export class ForcaDivina extends Efeito {
    constructor(){
        super("Força Divina", 3);
    }

    override getBonusForca(): number{
        return 2;
    }
}
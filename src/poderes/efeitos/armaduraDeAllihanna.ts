import { Efeito } from "../efeito.ts";

export class EfeitoArmaduraDeAllihanna extends Efeito {
    constructor(){
        super("Armadura de Allihanna", 999)
    }

    override getBonusDefesa(): number {
        return 2;
    }
}
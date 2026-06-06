import { Arma } from "../itens/arma.ts";
import { Armadura } from "../itens/armadura.ts";

export class Equipamento {
    private arma?: Arma;
    private armadura?: Armadura;

    getArma(): Arma | undefined {
        return this.arma;
    }
    getArmadura(): Armadura | undefined {
        return this.armadura;
    }
}
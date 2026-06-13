import { Arma } from "./itens/arma.ts";
import { Armadura, TipoProtecao } from "./itens/armadura.ts";

export class Equipamento {
    private arma?: Arma;
    private armadura?: Armadura;
    private escudo?: Armadura;

    equiparArma(arma: Arma): void {
        this.arma = arma;
    }

    equiparProtecao(protecao: Armadura): void {
        if(protecao.getTipo() === TipoProtecao.ARMADURA) {
            this.armadura = protecao;
        }
        
        if(protecao.getTipo() === TipoProtecao.ESCUDO) {
            this.escudo = protecao;
        }
    }

    getArma(): Arma | undefined {
        return this.arma;
    }
    getArmadura(): Armadura | undefined {
        return this.armadura;
    }
    getEscudo(): Armadura | undefined {
        return this.escudo;
    }
}
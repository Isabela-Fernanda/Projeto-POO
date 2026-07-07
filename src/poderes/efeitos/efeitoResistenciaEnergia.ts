import { Efeito } from "../efeito.js";
import { TipoEnergia } from "../tipoEnergia.js";

export class EfeitoResistenciaEnergia extends Efeito {
    constructor(
        private energia: TipoEnergia
    ) {
        super("Resistência a Energia", 10);
    }

    getEnergia(): TipoEnergia {
        return this.energia;
    }

    getValorResistencia(): number {
        return 10;
    }
}
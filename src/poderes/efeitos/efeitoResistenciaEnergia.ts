import { Efeito } from "../efeito.ts";
import { TipoEnergia } from "../tipoEnergia.ts";

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
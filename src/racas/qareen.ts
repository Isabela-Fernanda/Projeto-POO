import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Qareen extends Raca {
    constructor() {
        super(
            "Qareen"
        );
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return 2;
    }
    getBonusSabedoria(): number {
        return -2;
    }
    getBonusCarisma(): number {
        return 4;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
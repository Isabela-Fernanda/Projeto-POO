import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class SereiaTritao extends Raca {
    constructor() {
        super(
            "SereiaTritao"
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
        return 0;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
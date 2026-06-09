import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Kliren extends Raca {
    constructor() {
        super(
            "Kliren"
        );
    }

    getBonusForca(): number {
        return -2;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return 4;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 2;
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
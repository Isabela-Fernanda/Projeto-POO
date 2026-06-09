import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Minotauro extends Raca {
    constructor() {
        super(
            "Minotauro"
        );
    }

    getBonusForca(): number {
        return 4;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 2;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return -2;
    }
    getBonusCarisma(): number {
        return 0;
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
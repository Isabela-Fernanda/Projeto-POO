import { Raca } from "./raca.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { Versatil } from "../poderes/habilidadesRaca/habilidadesHumano.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Humano extends Raca {
    constructor() {
        super(
            "Humano"
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
        return [
            new Versatil()
        ];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
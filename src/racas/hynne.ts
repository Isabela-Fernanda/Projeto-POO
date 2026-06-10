import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { Arremessador, PequenoERechonchudo, SorteSalvadora } from "../habilidades/habilidadesRaca/habilidadesHynne.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Hynne extends Raca {
    constructor() {
        super(
            "Hynne"
        );
    }

    getBonusForca(): number {
        return -2;
    }
    getBonusDestreza(): number {
        return 4;
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
        return 2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new Arremessador(),
            new PequenoERechonchudo(),
            new SorteSalvadora()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
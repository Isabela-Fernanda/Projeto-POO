import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { Engenhoso, Espelunqueiro, PesteEsguia, RatoDasRuas } from "../habilidades/habilidadesRaca/habilidadesGoblin.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Goblin extends Raca {
    constructor() {
        super(
            "Goblin"
        );
    }

    getBonusForca(): number {
        return 0;
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
        return 2;
    }
    getBonusCarisma(): number {
        return -2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new Engenhoso(),
            new Espelunqueiro(),
            new PesteEsguia(),
            new RatoDasRuas()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
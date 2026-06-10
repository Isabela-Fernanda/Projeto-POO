import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { CriaDeMegalokk, NaturezaVenenosa, OlharAtordoante } from "../habilidades/habilidadesRaca/habilidadesMedusa.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Medusa extends Raca {
    constructor() {
        super(
            "Medusa"
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
        return 0;
    }
    getBonusCarisma(): number {
        return 2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new CriaDeMegalokk(),
            new NaturezaVenenosa(),
            new OlharAtordoante()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
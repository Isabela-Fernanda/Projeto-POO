import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { HerancaDivina, LuzSagrada } from "../habilidades/habilidadesRaca/habilidadesAggelus.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Aggelus extends Raca {
    constructor() {
        super(
            "Aggelus"
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
        return 4;
    }
    getBonusCarisma(): number {
        return 2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new HerancaDivina(),
            new LuzSagrada()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
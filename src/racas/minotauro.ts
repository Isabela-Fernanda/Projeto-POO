import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { Chifres, CouroRigido, Faro, MedoDeAltura } from "../habilidades/habilidadesRaca/habilidadesMinotauro.ts";
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
        return [
            new Chifres(),
            new CouroRigido(),
            new Faro(),
            new MedoDeAltura()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
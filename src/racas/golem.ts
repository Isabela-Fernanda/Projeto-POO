import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { CanalizarReparos, Chassi, CriaturaArtificial, EspiritoElemental,SemOrigem } from "../habilidades/habilidadesRaca/habilidadesGolem.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Golem extends Raca {
    constructor() {
        super(
            "Golem"
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
        return 0;
    }
    getBonusCarisma(): number {
        return -2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new CanalizarReparos(),
            new Chassi(),
            new CriaturaArtificial(),
            new EspiritoElemental(),
            new SemOrigem()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
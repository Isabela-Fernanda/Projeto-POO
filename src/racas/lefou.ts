import { Raca } from "./raca.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { CriaDaTormenta, Deformidade } from "../poderes/habilidadesRaca/habilidadesLefou.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Lefou extends Raca {
    constructor() {
        super(
            "Lefou"
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
        return -2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new CriaDaTormenta(),
            new Deformidade()
        ];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [TipoAtributo.CARISMA];
    }
}
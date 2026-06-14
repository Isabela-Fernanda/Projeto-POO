import { Raca } from "./raca.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { GracaDeGlorienn, HerancaFeerica, SentidosElficos } from "../poderes/habilidadesRaca/habilidadesElfo.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Elfo extends Raca {
    constructor() {
        super(
            "Elfo"
        );
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 2;
    }
    getBonusConstituicao(): number {
        return -2;
    }
    getBonusInteligencia(): number {
        return 4;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new GracaDeGlorienn(),
            new HerancaFeerica(),
            new SentidosElficos()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
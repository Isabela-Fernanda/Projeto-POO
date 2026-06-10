import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { ArmaduraOssea, MemoriaPostuma, NaturezaEsqueletica, PrecoDaNaoVida } from "../habilidades/habilidadesRaca/habilidadesOsteon.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Osteon extends Raca {
    constructor() {
        super(
            "Osteon"
        );
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return -2;
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
            new ArmaduraOssea(),
            new MemoriaPostuma(),
            new NaturezaEsqueletica(),
            new PrecoDaNaoVida()
        ];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [TipoAtributo.CONSTITUICAO];
    }
}
import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { HerancaDivina, SombrasProfanas } from "../habilidades/habilidadesRaca/habilidadesSulfure.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Sulfure extends Raca {
    constructor(){
        super(
            "Sulfure"
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
        return 2;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new HerancaDivina(),
            new SombrasProfanas()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
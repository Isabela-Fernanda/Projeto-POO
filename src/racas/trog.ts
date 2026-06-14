import { Raca } from "./raca.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { MauCheiro, Mordida, Reptiliano, SangueFrio } from "../poderes/habilidadesRaca/habilidadesTrog.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Trog extends Raca {
    constructor() {
        super(
            "Trog"
        );
    }

    getBonusForca(): number {
        return 2;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 4;
    }
    getBonusInteligencia(): number {
        return -2;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new MauCheiro(),
            new Mordida(),
            new Reptiliano(),
            new SangueFrio()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
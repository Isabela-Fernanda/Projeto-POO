import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { GracaDeGlorienn, HerancaFeerica, SentidosElficos } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";

export class Elfo extends Raca {
    constructor() {
        super("Elfo");
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

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new GracaDeGlorienn(),
            new HerancaFeerica(),
            new SentidosElficos()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
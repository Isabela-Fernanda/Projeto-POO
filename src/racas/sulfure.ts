import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { SombrasProfanas } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";
import { HerancaDivina } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";

export class Sulfure extends Raca {
    constructor(){
        super("Sulfure");
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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new SombrasProfanas()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new HerancaDivina()
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
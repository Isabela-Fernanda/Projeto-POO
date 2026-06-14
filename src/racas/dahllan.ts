import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { AmigaDasPlantas } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";
import { EmpatiaSelvagem } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";
import { ArmaduraDeAllihanna } from "./habilidadesRaca/catalogoHabilidadesRaciais.ts";

export class Dahllan extends Raca {
    constructor() {
        super("Dahllan");
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 2;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return -2;
    }
    getBonusSabedoria(): number {
        return 4;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new AmigaDasPlantas()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new EmpatiaSelvagem()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new ArmaduraDeAllihanna()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
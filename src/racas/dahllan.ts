import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { AmigaDasPlantas } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";
import { EmpatiaSelvagem } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";
import { ArmaduraDeAllihanna } from "./poderesRaciais/catalogoHabilidadesRaciais.ts";

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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new AmigaDasPlantas()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
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
import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";

import { HerancaDivina } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";
import { LuzSagrada } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";


export class Aggelus extends Raca {
    constructor() {
        super("Aggelus");
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
        return 4;
    }
    getBonusCarisma(): number {
        return 2;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new LuzSagrada()
        ]
    }
    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new HerancaDivina()
        ]
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
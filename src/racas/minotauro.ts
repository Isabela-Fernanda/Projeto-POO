import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { Faro, MedoDeAltura } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";
import { Chifres, CouroRigido } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";

export class Minotauro extends Raca {
    constructor() {
        super("Minotauro");
    }

    getBonusForca(): number {
        return 4;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 2;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return -2;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new Faro(),
            new MedoDeAltura()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new Chifres(),
            new CouroRigido(),
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
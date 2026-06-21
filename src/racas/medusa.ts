import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { CriaDeMegalokk, ResistenciaVenenosa } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";
import { NaturezaVenenosa, OlharAtordoante } from "./poderesRaciais/catalogoHabilidadesRaciais.ts";

export class Medusa extends Raca {
    constructor() {
        super("Medusa");
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
        return 0;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 2;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new CriaDeMegalokk(),
            new ResistenciaVenenosa()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new NaturezaVenenosa(),
            new OlharAtordoante()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
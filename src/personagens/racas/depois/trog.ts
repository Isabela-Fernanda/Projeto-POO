import { Raca } from "../raca.ts";

import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { Reptiliano, SangueFrio } from "../poderesRaciais/catalogoBeneficiosRaciais.ts";
import { Mordida } from "../poderesRaciais/catalogoCaracteristicasRaciais.ts";
import { MauCheiro } from "../poderesRaciais/catalogoHabilidadesRaciais.ts";

export class Trog extends Raca {
    constructor() {
        super("Trog");
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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new Reptiliano(),
            new SangueFrio()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new Mordida()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new MauCheiro(),
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
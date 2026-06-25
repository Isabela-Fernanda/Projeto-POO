import { Raca } from "../raca.ts";

import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { CancaoDosMares, MestreDoTridente, TransformacaoAnfibia } from "../poderesRaciais/catalogoBeneficiosRaciais.ts";

export class SereiaTritao extends Raca {
    constructor() {
        super("SereiaTritão");
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
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new CancaoDosMares(),
            new MestreDoTridente(),
            new TransformacaoAnfibia()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
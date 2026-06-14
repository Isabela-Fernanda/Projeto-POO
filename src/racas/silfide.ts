import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { MagiaDasFadas } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";
import { AsasDeBorboleta, EspiritoDaNatureza } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";
import { Voo } from "./habilidadesRaca/catalogoHabilidadesRaciais.ts";

export class Silfide extends Raca {
    constructor() {
        super("Silfide");
    }

    getBonusForca(): number {
        return -4;
    }
    getBonusDestreza(): number {
        return 2;
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
        return 4;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new MagiaDasFadas()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new AsasDeBorboleta(),
            new EspiritoDaNatureza()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new Voo()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
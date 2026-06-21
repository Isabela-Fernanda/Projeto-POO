import { Classe } from "./classe.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";

export class Paladino extends Classe {
    constructor() {
        super("Paladino");
        this.proficiencias.push(FacilidadeUso.MARCIAIS, FacilidadeUso.ARMADURA_PESADA, FacilidadeUso.ESCUDO);
    }
    getVidaInicial(): number {
        return 20;
    }

    getPVPorNivel(): number {
        return 5;
    }

    getManaInicial(): number {
        return 3;
    }

    getPericiasTreinadas(): number {
        return 2;
    }

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getAtributoMagia(): null {
        return null;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.LUTA,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CURA,
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.GUERRA,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.NOBREZA,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.RELIGIAO
        ]
    }

}
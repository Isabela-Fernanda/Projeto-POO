import { Classe } from "./classe.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";

export class Bardo extends Classe {
    constructor() {
        super("Bardo");
        this.proficiencias.push(FacilidadeUso.MARCIAIS);
    }
    getVidaInicial(): number {
        return 12;
    }

    getPVPorNivel(): number {
        return 3;
    }

    getManaInicial(): number {
        return 4;
    }

    getPericiasTreinadas(): number {
        return 6;
    }

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getAtributoMagia(): TipoAtributo {
        return TipoAtributo.CARISMA;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.ATUACAO,
            CatalogoPericias.REFLEXOS
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ACROBACIA,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.ENGANACAO,
            CatalogoPericias.FURTIVIDADE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.INVESTIGACAO,
            CatalogoPericias.JOGATINA,
            CatalogoPericias.LADINAGEM,
            CatalogoPericias.LUTA,
            CatalogoPericias.MISTICISMO,
            CatalogoPericias.NOBREZA,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.RELIGIAO,
            CatalogoPericias.VONTADE
        ]
    }

}
import { Classe } from "./classe.ts";
import { Habilidade} from '../../habilidades/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";


export class Nobre extends Classe {
    constructor(){
        super("Nobre");
    }
    getVidaInicial(): number {
        return 16;
    }

    getManaInicial(): number {
        return 4;
    }

    getPericiasTreinadas(): number {
        return 4;
    }

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return[
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATUACAO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.ENGANACAO,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.GUERRA,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.INVESTIGACAO,
            CatalogoPericias.JOGATINA,
            CatalogoPericias.LUTA,
            CatalogoPericias.NOBREZA,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.PONTARIA
        ]
    }

}
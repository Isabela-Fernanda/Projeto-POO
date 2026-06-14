import { Classe } from "./classe.ts";
import { Habilidade} from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";


export class Druida extends Classe {
    constructor(){
        super("Druida");
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
            CatalogoPericias.SOBREVIVENCIA,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return[
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.CURA,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.LUTA,
            CatalogoPericias.MISTICISMO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.RELIGIAO
        ]
    }

}
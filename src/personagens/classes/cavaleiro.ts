import { Classe } from "./classe.ts";
import { Habilidade} from '../../habilidades/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";


export class Cavaleiro extends Classe {
    constructor(){
        super("Cavaleiro");
    }
    getVidaInicial(): number {
        return 20;
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

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.LUTA
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return[
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.GUERRA,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.NOBREZA,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.VONTADE
        ]
    }

}
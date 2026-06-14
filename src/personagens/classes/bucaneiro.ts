import { Classe } from "./classe.ts";
import { Habilidade} from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";


export class Bucaneiro extends Classe {
    constructor(){
        super("Bucaneiro");
    }
    getVidaInicial(): number {
        return 16;
    }

    getManaInicial(): number {
        return 3;
    }

    getPericiasTreinadas(): number {
        return 4;
    }

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.LUTA,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.REFLEXOS
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return[
            CatalogoPericias.ACROBACIA,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.ATUACAO,
            CatalogoPericias.ENGANACAO,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.FURTIVIDADE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.JOGATINA,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.PILOTAGEM,
        ]
    }

}
import { Classe } from "./classe.ts";
import { Habilidade} from '../../habilidades/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";


export class Cacador extends Classe {
    constructor(){
        super("Caçador");
    }
    getVidaInicial(): number {
        return 16;
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

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.LUTA,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.SOBREVIVENCIA
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return[
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CURA,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.FURTIVIDADE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INVESTIGACAO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.REFLEXOS
        ]
    }

}
import { Classe } from "./classe.ts";
import { Beneficio } from "../../../poderes/beneficio.ts";
import { Caracteristica } from "../../../poderes/caracteristica.ts";
import { Habilidade } from '../../../poderes/habilidades.ts';
import { Pericia } from "../../../pericias/pericia.ts";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../../atributos/atributos.ts";

export class Lutador extends Classe {
    constructor() {
        super("Lutador");
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
        return 4;
    }

    getBeneficios(): Beneficio[] {
        return [];
    }

    getCaracteristicas(): Caracteristica[] {
        return [];
    }
    
    getHabilidades(): Habilidade[] {
        return [];
    }

    getAtributoMagia(): null {
        return null;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.LUTA
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ACROBACIA,
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.ENGANACAO,
            CatalogoPericias.FURTIVIDADE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.REFLEXOS
        ]
    }

}
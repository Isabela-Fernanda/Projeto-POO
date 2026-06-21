import { Classe } from "./classe.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";


export class Arcanista extends Classe {
    constructor() {
        super("Arcanista");
    }
    getVidaInicial(): number {
        return 8;
    }

    getPVPorNivel(): number {
        return 2;
    }

    getManaInicial(): number {
        return 6;
    }

    getPericiasTreinadas(): number {
        return 1;
    }

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getAtributoMagia(): TipoAtributo {
        return TipoAtributo.INTELIGENCIA;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.MISTICISMO,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO
        ]
    }

}
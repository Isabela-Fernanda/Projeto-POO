import { Classe } from "./classe.ts";
import { Beneficio } from "../../../poderes/beneficio.ts";
import { Caracteristica } from "../../../poderes/caracteristica.ts";
import { Habilidade } from '../../../poderes/habilidades.ts';
import { Pericia } from "../../../pericias/pericia.ts";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../../atributos/atributos.ts";
import { FacilidadeUso } from "../../../inventario/equipamento.ts";

export class Clerigo extends Classe {
    constructor() {
        super("Clérigo");
        this.proficiencias.push(FacilidadeUso.ESCUDO);
    }
    getVidaInicial(): number {
        return 16;
    }

    getPVPorNivel(): number {
        return 4;
    }

    getManaInicial(): number {
        return 5;
    }

    getPericiasTreinadas(): number {
        return 2;
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

    getAtributoMagia(): TipoAtributo {
        return TipoAtributo.SABEDORIA;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.RELIGIAO,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.CURA,
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.LUTA,
            CatalogoPericias.MISTICISMO,
            CatalogoPericias.NOBREZA,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO
        ]
    }

}
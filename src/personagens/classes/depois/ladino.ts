import { Classe } from "./classe.ts";
import { Beneficio } from "../../../poderes/beneficio.ts";
import { Caracteristica } from "../../../poderes/caracteristica.ts";
import { Habilidade } from '../../../poderes/habilidades.ts';
import { Pericia } from "../../../pericias/pericia.ts";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../../atributos/atributos.ts";
import { FacilidadeUso } from "../../../inventario/equipamento.ts";

export class Ladino extends Classe {
    constructor() {
        super("Ladino");
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
        return 8;
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
            CatalogoPericias.LADINAGEM,
            CatalogoPericias.REFLEXOS
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ACROBACIA,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.ATUACAO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.ENGANACAO,
            CatalogoPericias.FURTIVIDADE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.INVESTIGACAO,
            CatalogoPericias.JOGATINA,
            CatalogoPericias.LUTA,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.PILOTAGEM,
            CatalogoPericias.PONTARIA
        ]
    }

}
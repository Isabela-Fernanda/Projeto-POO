import { Classe } from "./classe.ts";
import { Beneficio } from "../../../poderes/beneficio.ts";
import { Caracteristica } from "../../../poderes/caracteristica.ts";
import { Habilidade } from '../../../poderes/habilidades.ts';
import { Pericia } from "../../../pericias/pericia.ts";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../../atributos/atributos.ts";
import { FacilidadeUso } from "../../../inventario/equipamento.ts";

export class Bucaneiro extends Classe {
    constructor() {
        super("Bucaneiro");
        this.proficiencias.push(FacilidadeUso.MARCIAIS);
    }
    getVidaInicial(): number {
        return 16;
    }

    getPVPorNivel(): number {
        return 4;
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
            CatalogoPericias.LUTA,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.REFLEXOS
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
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
import { Classe } from "./classe.ts";
import { Beneficio } from "../../../poderes/beneficio.ts";
import { Caracteristica } from "../../../poderes/caracteristica.ts";
import { Habilidade } from '../../../poderes/habilidades.ts';
import { Pericia } from "../../../pericias/pericia.ts";
import { CatalogoPericias } from "../../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../../atributos/atributos.ts";
import { FacilidadeUso } from "../../../inventario/equipamento.ts";

export class Nobre extends Classe {
    constructor() {
        super("Nobre");
        this.proficiencias.push(FacilidadeUso.MARCIAIS, FacilidadeUso.ARMADURA_PESADA, FacilidadeUso.ESCUDO);
    }
    getVidaInicial(): number {
        return 16;
    }

    getPVPorNivel(): number {
        return 4;
    }

    getManaInicial(): number {
        return 4;
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
            CatalogoPericias.DIPLOMACIA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
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
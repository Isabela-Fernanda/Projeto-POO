import { Classe } from "./classe.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";

export class Inventor extends Classe {
    constructor() {
        super("Inventor");
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
        return 4;
    }

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getAtributoMagia(): null {
        return null;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.OFICIO,
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
            CatalogoPericias.INVESTIGACAO,
            CatalogoPericias.LUTA,
            CatalogoPericias.MISTICISMO,
            CatalogoPericias.PILOTAGEM,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.PERCEPCAO
        ]
    }

}
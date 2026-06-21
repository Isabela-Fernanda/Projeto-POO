import { Classe } from "./classe.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";

export class Druida extends Classe {
    constructor() {
        super("Druida");
        this.proficiencias.push(FacilidadeUso.ESCUDO);
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

    getHabilidadesClasse(): Habilidade[] {
        return [];
    }

    getAtributoMagia(): TipoAtributo {
        return TipoAtributo.SABEDORIA;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.SOBREVIVENCIA,
            CatalogoPericias.VONTADE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CONHECIMENTO,
            CatalogoPericias.CURA,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTUICAO,
            CatalogoPericias.LUTA,
            CatalogoPericias.MISTICISMO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.RELIGIAO
        ]
    }

}
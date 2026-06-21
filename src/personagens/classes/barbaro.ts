import { Classe } from "./classe.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";

export class Barbaro extends Classe {
    constructor() {
        super("Bárbaro");
        this.proficiencias.push(FacilidadeUso.MARCIAIS, FacilidadeUso.ESCUDO);
    }
    getVidaInicial(): number {
        return 24;
    }

    getPVPorNivel(): number {
        return 6;
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
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.SOBREVIVENCIA,
            CatalogoPericias.VONTADE
        ]
    }

}
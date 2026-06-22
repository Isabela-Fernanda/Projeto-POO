import { Classe } from "./classe.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Habilidade } from '../../poderes/habilidades.ts';
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";

export class Guerreiro extends Classe {
    constructor() {
        super("Guerreiro");
        this.proficiencias.push(FacilidadeUso.MARCIAIS, FacilidadeUso.ARMADURA_PESADA, FacilidadeUso.ESCUDO);
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

    getAtributoMagia(): null {
        return null;
    }

    getPericiasClasse(): Pericia[] {
        return [
            CatalogoPericias.LUTA,
            CatalogoPericias.PONTARIA,
            CatalogoPericias.FORTITUDE
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.GUERRA,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INTIMIDACAO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.REFLEXOS
        ]
    }

}
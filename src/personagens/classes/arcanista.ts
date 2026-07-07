import { Classe } from "./classe.js";
import { Habilidade } from "@poderes/habilidades.js";
import { Pericia } from "@pericias/pericia.js";
import { CatalogoPericias } from "@pericias/catalogoPericias.js";
import { TipoAtributo } from "../atributos/atributos.js";
import { Beneficio } from "@poderes/beneficio.js";
import { Caracteristica } from "@poderes/caracteristica.js";

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

    getResumo(): string {
        return `Conjurador arcano especializado em magia.\n\nPV Inicial: 8\nPM Inicial: 6\n\nAtributo Principal:\n• Inteligência\n\nPerícias:\n• Escolhe 2 perícias\n\nHabilidades Iniciais:\n• Magias Arcanas\n\nEstilo:\n• Controle\n• Dano mágico\n• Utilidade`;
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
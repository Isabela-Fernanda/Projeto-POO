import { Classe } from "./classe.js";
import { Beneficio } from "@poderes/beneficio.js";
import { Caracteristica } from "@poderes/caracteristica.js";
import { Habilidade } from '@poderes/habilidades.js';
import { Pericia } from "@pericias/pericia.js";
import { CatalogoPericias } from "@pericias/catalogoPericias.js";
import { FacilidadeUso } from "@inventario/equipamento.js";

export class Cacador extends Classe {
    constructor() {
        super("Caçador");
        this.proficiencias.push(FacilidadeUso.MARCIAIS, FacilidadeUso.ESCUDO);
    }
    getVidaInicial(): number { return 16; }

    getPVPorNivel(): number { return 4; }

    getManaInicial(): number { return 4; }

    getPericiasTreinadas(): number { return 6; }

    getResumo(): string {
        return `Especialista em rastreamento e combate à distância.\n\nPV Inicial: 16\nPM Inicial: 4\n\nAtributo Principal:\n• Destreza\n\nPerícias:\n• Escolhe 4 perícias\n\nHabilidades Iniciais:\n• Marca da Presa\n• Rastreador\n\nEstilo:\n• Ataques à distância\n• Sobrevivência`;
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
            CatalogoPericias.SOBREVIVENCIA
        ]
    }

    getPericiasDisponiveis(): Pericia[] {
        return [
            CatalogoPericias.ADESTRAMENTO,
            CatalogoPericias.ATLETISMO,
            CatalogoPericias.CAVALGAR,
            CatalogoPericias.CURA,
            CatalogoPericias.FORTITUDE,
            CatalogoPericias.FURTIVIDADE,
            CatalogoPericias.INICIATIVA,
            CatalogoPericias.INVESTIGACAO,
            CatalogoPericias.OFICIO,
            CatalogoPericias.PERCEPCAO,
            CatalogoPericias.REFLEXOS
        ]
    }

}
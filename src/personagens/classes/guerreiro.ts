import { Classe } from "./classe.js";
import { Beneficio } from "@poderes/beneficio.js";
import { Caracteristica } from "@poderes/caracteristica.js";
import { Habilidade } from '@poderes/habilidades.js';
import { Pericia } from "@pericias/pericia.js";
import { CatalogoPericias } from "@pericias/catalogoPericias.js";
import { FacilidadeUso } from "@inventario/equipamento.js";

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

    getResumo(): string {
        return `Combatente especializado em armas e armaduras.\n\nPV Inicial: 20\nPM Inicial: 3\n\nAtributo Principal:\n• Força ou Destreza\n\nPerícias:\n• Escolhe 2 perícias\n\nHabilidades Iniciais:\n• Ataque Especial\n\nEstilo:\n• Combate corpo a corpo\n• Alta resistência`;
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
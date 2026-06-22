import { Personagem } from "../personagem.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { Pericia } from "../../pericias/pericia.ts";
import { FacilidadeUso } from "../../inventario/equipamento.ts";
import { TipoAtributo } from "../atributos/atributos.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Caracteristica } from "../../poderes/caracteristica.ts";

enum Deus {
    ALLIHANNA,
    ARSENAL,
    KALLYADRANOCH,
}

enum CaminhoArcano {
    MAGO,
    BRUXO,
    FEITICEIRO
}

export abstract class Classe {
    constructor(
        protected nome: string,
        protected proficiencias: FacilidadeUso[] = [FacilidadeUso.SIMPLES, FacilidadeUso.ARMADURA_LEVE],
    ) { }

    getNome(): string {
        return this.nome;
    }

    abstract getVidaInicial(): number;
    abstract getPVPorNivel(): number;
    abstract getManaInicial(): number;

    abstract getPericiasTreinadas(): number;

    abstract getBeneficios(): Beneficio[];
    abstract getCaracteristicas(): Caracteristica[];
    abstract getHabilidades(): Habilidade[];

    abstract getPericiasClasse(): Pericia[];
    abstract getPericiasDisponiveis(): Pericia[];

    abstract getAtributoMagia(): TipoAtributo | null;

    possuiMagia(): boolean {
        return this.getAtributoMagia() !== null;
    }

    getCirculoMaximo(nivel: number): number {
        if (!this.possuiMagia()) {
            return 0;
        }

        if (nivel < 5) return 1;
        if (nivel < 9) return 2;
        if (nivel < 13) return 3;
        if (nivel < 17) return 4;

        return 5;
    }

    possuiProficiencia(facilidade: FacilidadeUso): boolean {
        return this.proficiencias.includes(facilidade);
    }
}
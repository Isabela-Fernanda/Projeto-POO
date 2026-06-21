import { Habilidade } from "../../poderes/habilidades.ts";
import { Pericia } from "../../pericias/pericia.ts";
import { FacilidadeUso } from "../../inventario/itens/arma.ts";

export abstract class Classe {
    constructor(
        protected nome: string,
        protected proficiencias: FacilidadeUso[] = [],
    ) { }

    getNome(): string {
        return this.nome;
    }

    abstract getVidaInicial(): number;
    abstract getManaInicial(): number;
    abstract getPericiasTreinadas(): number;
    abstract getHabilidadesClasse(): Habilidade[];
    abstract getPericiasClasse(): Pericia[];
    abstract getPericiasDisponiveis(): Pericia[];

    possuiProficiencia(facilidade: FacilidadeUso): boolean {
        return this.proficiencias.includes(facilidade);
    }
}
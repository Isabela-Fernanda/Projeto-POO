import { Habilidade } from "../../habilidades/habilidades.ts";
import { Pericia } from "../../pericias/pericia.ts";

export abstract class Classe {

    constructor(
        protected nome: string
    ) {}

    getNome(): string {
        return this.nome;
    }

    abstract getVidaInicial(): number;
    abstract getManaInicial(): number;
    abstract getPericiasTreinadas(): number;
    abstract getHabilidadesClasse(): Habilidade[];
    abstract getPericiasClasse(): Pericia [];
    abstract getPericiasDisponiveis(): Pericia[];
}
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export enum GrauTreinamento {
    DESTREINADO = 0,
    TREINADO = 2,
    VETERANO = 4,
    EXPERT = 6,
    MESTRE = 8
}

export class Pericia {
    constructor(
        private nome: string,
        private atributoBase: TipoAtributo,
        private treinamentoObrigatorio: boolean = false
    ) {}

    getNome(): string {
        return this.nome;
    }

    getAtributoBase(): TipoAtributo {
        return this.atributoBase;
    }

    exigeTreinamento(): boolean {
        return this.treinamentoObrigatorio;
    }

}
import { TipoAtributo } from "../personagens/atributos/atributos";

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
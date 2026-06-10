import { Personagem } from "../personagens/personagem.ts";

export abstract class Habilidade {
    constructor(
        protected nome: string,
        protected descricao: string,
        protected custoMana: number
    ){}

    getNome(): string {
        return this.nome;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getCustoMana(): number {
        return this.custoMana;
    }

    abstract usar(usuario: Personagem, alvo?: Personagem): void;

    aplicarCriacao(personagem: Personagem): void {}

    ehHabilidadeCriacao(): boolean {
        return false;
    }
}

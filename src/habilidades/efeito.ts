import { Personagem } from "../personagens/personagem.ts";
import { Condicao } from "../combate/tipoCondicao.ts";

export abstract class Efeito {
    constructor(
        protected nome: string,
        protected duracao: number,
        protected condicoes: Condicao[] = []
    ) { }

    getNome(): string {
        return this.nome;
    }

    getDuracao(): number {
        return this.duracao;
    }

    getCondicoes(): Condicao[] {
        return this.condicoes;
    }

    possuiCondicao(condicao: Condicao): boolean {
        return this.condicoes.includes(condicao);
    }

    podeAgir(): boolean {
        return true;
    }

    reduzirDuracao(): void {
        this.duracao--;
    }

    expirou(): boolean {
        return this.duracao <= 0;
    }

    processar(personagem: Personagem): void { }

    getBonusAtaque(): number {
        return 0;
    }

    getBonusDano(): number {
        return 0;
    }

    getBonusDefesa(): number {
        return 0;
    }

    getBonusForca(): number {
        return 0;
    }

    getBonusPericia(): number {
        return 0;
    }

    getBonusResistencia(): number {
        return 0;
    }

    getBonusDeslocamento(): number {
        return 0;
    }
}
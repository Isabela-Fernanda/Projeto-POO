import { Personagem } from "../personagens/personagem.ts";

export enum TipoAcao {
    LIVRE,
    MOVIMENTO,
    PADRAO,
    COMPLETA,
    REACAO
}

export enum TipoAlvo {
    INIMIGO,
    ALIADO,
    PROPRIO,
    QUALQUER
}

export abstract class Habilidade {
    constructor(
        protected nome: string,
        protected descricao: string,
        protected custoMana: number,
        protected tipoAcao: TipoAcao,
        protected tipoAlvo: TipoAlvo,
        protected precisaAlvo: boolean = true,
    ) { }

    getNome(): string {
        return this.nome;
    }

    getPrecisaAlvo(): boolean {
        return this.precisaAlvo;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getCustoMana(): number {
        return this.custoMana;
    }

    getTipoAcao(): TipoAcao {
        return this.tipoAcao;
    }

    getTipoAlvo(): TipoAlvo {
        return this.tipoAlvo;
    }

    abstract usar(usuario: Personagem, alvo?: Personagem): void;

    executar(usuario: Personagem, alvo?: Personagem): boolean {
        if (!usuario.gastarMana(this.custoMana)) {
            console.log(`${usuario.getNome()} não possui PM suficientes.`);
            return false;
        }

        console.log(`${usuario.getNome()} usa ${this.nome}!`);

        this.usar(usuario, alvo);

        return true;
    }

    aplicarCriacao(personagem: Personagem): void { }
    ehHabilidadeCriacao(): boolean {
        return false;
    }
}

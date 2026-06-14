import { Item, Modificacoes } from "./item.ts"
import { TipoDano } from "../../combate/tipoDano.ts";

export enum TipoAtaque {
    CORPO_A_CORPO,
    ARREMESSO,
    DISTANCIA
}

export enum Categoria {
    LEVE,
    UMA_MAO,
    DUAS_MAOS,
    DISPARO
}

export enum Municao {
    FLECHA,
    VIROTE,
    BALA
}

export enum FacilidadeUso {
    SIMPLES,
    MARCIAIS,
    EXOTICAS,
    DE_FOGO
}

export enum PropriedadeArma {
    AGIL,
    ADAPTAVEL,
    ENREDA,
    PRECISA,
    DERRUBAR,
    DESARMAR,
    DESBALANCEADA,
    DUPLA,
    ALONGADA,
    BRUTAL,
    DISCRETA,
    MONTADA
}

export class Arma extends Item {
    constructor(
        nome: string,
        preco: number,
        peso: number,
        descricao: string = "",

        private quantidadeDados: number,
        private facesDado: number,

        private margemCritico: number,
        private multiplicadorCritico: number,

        private tipoAtaque: TipoAtaque[],
        private tipoDano: TipoDano,

        private categoria: Categoria,
        private facilidade: FacilidadeUso,

        private propriedades: PropriedadeArma[] = [],
        modificacoes: Modificacoes[] = [],

        private municao?: Municao,
        private alcance?: number,

        private bonusAtaque: number = 0,
        private bonusDano: number = 0,
    ) {
        super(nome, preco, peso, descricao, modificacoes);
    }

    getQuantidadeDados(): number {
        return this.quantidadeDados;
    }

    getFacesDado(): number {
        return this.facesDado;
    }

    getTipo(): TipoAtaque[] {
        return this.tipoAtaque;
    }

    podeAtacarCorpoACorpo(): boolean {
        return this.tipoAtaque.includes(TipoAtaque.CORPO_A_CORPO);
    }

    podeAtacarDistancia(): boolean {
        return this.tipoAtaque.includes(TipoAtaque.DISTANCIA);
    }

    ehAgil(): boolean {
        return this.propriedades.includes(PropriedadeArma.AGIL);
    }

    ehDupla(): boolean {
        return this.propriedades.includes(PropriedadeArma.DUPLA);
    }

    ehAdaptavel(): boolean {
        return this.propriedades.includes(PropriedadeArma.ADAPTAVEL);
    }

    ehAlongada(): boolean {
        return this.propriedades.includes(PropriedadeArma.ALONGADA);
    }

    ehDesbalanceada(): boolean {
        return this.propriedades.includes(PropriedadeArma.DESBALANCEADA);
    }

    getMargemCritico(): number {
        return this.margemCritico;
    }

    getMultiplicadorCritico(): number {
        return this.multiplicadorCritico;
    }

    getCategoria(): Categoria {
        return this.categoria;
    }

    getFacilidade(): FacilidadeUso {
        return this.facilidade;
    }

    getTipoDano(): TipoDano {
        return this.tipoDano;
    }

    usaDestrezaNoAtaque(): boolean {
        return (this.tipoAtaque.includes(TipoAtaque.DISTANCIA) || this.propriedades.includes(PropriedadeArma.AGIL)
        );
    }

    getMunicao(): Municao | undefined {
        return this.municao;
    }

    getAlcance(): number | undefined {
        return this.alcance;
    }

    getBonusAtaque(): number {
        return this.bonusAtaque;
    }

    getBonusDano(): number {
        return this.bonusDano;
    }

    getPropriedades(): PropriedadeArma[] {
        return this.propriedades;
    }
}
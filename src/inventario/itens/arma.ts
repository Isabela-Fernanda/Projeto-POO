import { Item, Modificacoes } from "./item.ts"
import { TipoDano } from "../../combate/tipoDano.ts";
import { FacilidadeUso } from "../equipamento.ts";

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

export enum GrupoArma {
    ADAGA,
    ARCO,
    BESTA,
    CLAVA,
    ESPADA,
    FERRAMENTA_AGRICOLA,
    LANCA,
    MACA,
    MACHADO,
    MARRETA,
    MARTELO,
    PICARETA,


    NENHUM,
}

export class Arma extends Item {
    constructor(
        nome: string,
        preco: number,
        peso: number,

        private grupo: GrupoArma,
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

        private alcance: number,
        private municao?: Municao,
        private alcanceArremeco?: number,

        private bonusAtaque: number = 0,
        private bonusDano: number = 0,
    ) {
        super(nome, preco, peso, descricao, modificacoes);
    }

    getGrupo(): GrupoArma {
        return this.grupo;
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

    getAlcance(): number {
        let alcance = this.alcance;
        if (this.ehAlongada()) {
            alcance += 1;
        }
        return alcance;
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

    ehTradicionalAna(): boolean {
        return [
            GrupoArma.MACHADO,
            GrupoArma.MARTELO,
            GrupoArma.MARRETA,
            GrupoArma.PICARETA
        ].includes(this.grupo);
    }

    podeArremessar(): boolean {
        return this.tipoAtaque.includes(TipoAtaque.ARREMESSO);
    }

    usaForcaNoArremesso(): boolean {
        return this.podeArremessar();
    }

    getAlcanceArremesso(): number {
        return this.alcanceArremeco ?? 0;
    }

    armaNoAlcance(distancia: number): boolean {
        if (this.podeAtacarCorpoACorpo() && distancia <= this.getAlcance()) {
            return true;
        }

        if (this.podeAtacarDistancia() && distancia <= this.getAlcance()) {
            return true;
        }

        if (this.podeArremessar() && distancia <= this.getAlcanceArremesso()) {
            return true;
        }

        return false;
    }

    obterMaiorAlcance(): number {
        return Math.max(this.getAlcance(), this.getAlcanceArremesso());
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
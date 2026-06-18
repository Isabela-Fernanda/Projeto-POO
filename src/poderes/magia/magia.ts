import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";

export enum EscolaMagia {
    ABJURACAO,
    ADIVINHACAO,
    CONVOCACAO,
    ENCANTAMENTO,
    EVOCACAO,
    ILUSAO,
    NECROMANCIA,
    TRANSMUTACAO
}

export enum TipoMagia {
    ARCANA,
    DIVINA
}

export enum CirculoMagia {
    PRIMEIRO = 1,
    SEGUNDO = 2,
    TERCEIRO = 3,
    QUARTO = 4,
    QUINTO = 5
}

export enum AlcanceMagia {
    PESSOAL,
    TOQUE,
    CURTO,
    MEDIO,
    LONGO,
    ILIMITADO
}

export enum DuracaoMagia {
    INSTANTANEA,
    CENA,
    SUSTENTADA,
    PERMANENTE
}

export abstract class Magia extends Habilidade {
    constructor(
        nome: string,
        descricao: string,
        custoMana: number,

        private descricaoCurta: string,
        private circulo: CirculoMagia,
        private tipoMagia: TipoMagia,
        private escola: EscolaMagia,

        tipoAcao: TipoAcao,
        tipoAlvo: TipoAlvo,

        private alcance: AlcanceMagia,
        private duracao: DuracaoMagia
    ) {
        super(nome, descricao, custoMana, tipoAcao, tipoAlvo);
    }

    getCirculo(): CirculoMagia {
        return this.circulo;
    }

    getTipoMagia(): TipoMagia {
        return this.tipoMagia;
    }

    getEscola(): EscolaMagia {
        return this.escola;
    }

    getAlcance(): AlcanceMagia {
        return this.alcance;
    }

    getDuracao(): DuracaoMagia {
        return this.duracao;
    }
}

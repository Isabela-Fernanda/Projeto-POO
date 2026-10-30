export enum LadoSala {
    NORTE,
    SUL,
    LESTE,
    OESTE
}

export enum TipoAmbiente {
    NORMAL,
    SUBTERRANEO,
    FLORESTA,
    URBANO,
    DESERTO,
}

export enum Luminosidade {
    ILUMINADO,
    PENUMBRA,
    ESCURO,
}

export enum TipoSala {
    NORMAL,
    CORREDOR,
    SALA_DE_CHEFE,
    SALA_DE_TESOURO,
}

export interface AreaSala {
    x: number;
    y: number;
    largura: number;
    altura: number;
}

export interface ConfiguracaoArquitetonica {
    alturaTeto: number;
    quantidadePilares: number;
    iluminacaoCentral: boolean;
}

export class Sala {
    constructor(
        private nome: string,
        private ambiente: TipoAmbiente,
        private iluminacao: Luminosidade,
        private x: number,
        private y: number,
        private largura: number,
        private altura: number,
        private tipo: TipoSala = TipoSala.NORMAL,
        private descoberta: boolean = false,
        private configuracaoArquitetonica: ConfiguracaoArquitetonica = {
            alturaTeto: 3.5,
            quantidadePilares: 0,
            iluminacaoCentral: false,
        },
        private planta?: AreaSala[],
    ) { }

    getNome(): string { return this.nome; }

    getTipoAmbiente(): TipoAmbiente { return this.ambiente; }

    ehSubterraneo(): boolean {
        return this.ambiente === TipoAmbiente.SUBTERRANEO;
    }

    getIluminacaoAmbiente(): Luminosidade { return this.iluminacao; }

    getTipoSala(): TipoSala { return this.tipo; }

    getX(): number { return this.x; }

    getY(): number { return this.y; }

    getLargura(): number { return this.largura; }

    getAltura(): number { return this.altura; }

    foiDescoberta(): boolean { return this.descoberta; }

    descobrir(): void { this.descoberta = true; }

    getConfiguracaoArquitetonica(): ConfiguracaoArquitetonica {
        return this.configuracaoArquitetonica;
    }

    getPlanta(): AreaSala[] {
        return this.planta ? this.planta.map((area) => ({ ...area })) : [
            {
                x: 0,
                y: 0,
                largura: this.largura,
                altura: this.altura,
            },
        ];
    }

    contem(x: number, y: number): boolean {
        return (x >= this.x && x < this.x + this.largura && y >= this.y && y < this.y + this.altura);
    }
}
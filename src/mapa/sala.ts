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

export class Sala {
    constructor(
        private nome: string,
        private ambiente: TipoAmbiente,
        private iluminacao: Luminosidade,
        private x: number,
        private y: number,
        private largura: number,
        private altura: number,
        private descoberta: boolean = false
    ) { }

    getNome(): string { return this.nome; }

    getTipoAmbiente(): TipoAmbiente { return this.ambiente; }

    ehSubterraneo(): boolean {
        return this.ambiente === TipoAmbiente.SUBTERRANEO;
    }

    getIluminacaoAmbiente(): Luminosidade { return this.iluminacao; }

    getX(): number { return this.x; }

    getY(): number { return this.y; }

    getLargura(): number { return this.largura; }

    getAltura(): number { return this.altura; }

    foiDescoberta(): boolean { return this.descoberta; }

    descobrir(): void { this.descoberta = true; }

    contem(x: number, y: number): boolean {
        return (x >= this.x && x < this.x + this.largura && y >= this.y && y < this.y + this.altura);
    }
}
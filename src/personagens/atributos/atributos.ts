export enum TipoAtributo {
    FORCA,
    DESTREZA,
    CONSTITUICAO,
    INTELIGENCIA,
    SABEDORIA,
    CARISMA
}

export class Atributos {
    private atributos = new Map<TipoAtributo, number>();

    constructor(
        private forca: number,
        private destreza: number,
        private constituicao: number,
        private inteligencia: number,
        private sabedoria: number,
        private carisma: number
    ) {
        this.atributos.set(TipoAtributo.FORCA, forca);
        this.atributos.set(TipoAtributo.DESTREZA, destreza);
        this.atributos.set(TipoAtributo.CONSTITUICAO, constituicao);
        this.atributos.set(TipoAtributo.INTELIGENCIA, inteligencia);
        this.atributos.set(TipoAtributo.SABEDORIA, sabedoria);
        this.atributos.set(TipoAtributo.CARISMA, carisma);
    }

    getAtributo(atributo: TipoAtributo): number {
        return this.atributos.get(atributo) ?? 0;
    }

    adicionarBonus(atributo: TipoAtributo, valor: number): void {
        const atual = this.getAtributo(atributo);
        this.atributos.set(atributo, atual + valor);
    }

    static calcularModificador(valor: number): number {
        if (valor <= 1) return -5;
        if (valor <= 3) return -4;
        if (valor <= 5) return -3;
        if (valor <= 7) return -2;
        if (valor <= 9) return -1;
        if (valor <= 11) return 0;
        if (valor <= 13) return 1;
        if (valor <= 15) return 2;
        if (valor <= 17) return 3;
        if (valor <= 19) return 4;
        if (valor <= 21) return 5;
        if (valor <= 23) return 6;
        if (valor <= 25) return 7;

        return 7 + Math.floor((valor - 25) / 2);
    }

    mostrar(): string {
        return (
            `Força: ${this.getAtributo(TipoAtributo.FORCA)}\n` +
            `Destreza: ${this.getAtributo(TipoAtributo.DESTREZA)}\n` +
            `Constituição: ${this.getAtributo(TipoAtributo.CONSTITUICAO)}\n` +
            `Inteligência: ${this.getAtributo(TipoAtributo.INTELIGENCIA)}\n` +
            `Sabedoria: ${this.getAtributo(TipoAtributo.SABEDORIA)}\n` +
            `Carisma: ${this.getAtributo(TipoAtributo.CARISMA)}`
        );
    }
}
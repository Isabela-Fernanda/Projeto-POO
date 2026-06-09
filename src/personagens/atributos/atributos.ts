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

    mostrar(): string {
        return (
            `Força: ${this.forca}\n` +
            `Destreza: ${this.destreza}\n` +
            `Constituição: ${this.constituicao}\n` +
            `Inteligência: ${this.inteligencia}\n` +
            `Sabedoria: ${this.sabedoria}\n` +
            `Carisma: ${this.carisma}`
        );
    }
}
export class Sala {
    constructor(
        private nome: string,
        private xInicial: number,
        private yInicial: number,
        private largura: number,
        private altura: number
    ) { }

    getNome(): string {
        return this.nome;
    }

    getXInicial(): number {
        return this.xInicial;
    }

    getYInicial(): number {
        return this.yInicial;
    }

    getLargura(): number {
        return this.largura;
    }

    getAltura(): number {
        return this.altura;
    }

    contem(x: number, y: number): boolean {
        return (
            x >= this.xInicial &&
            x <= this.xInicial + this.largura &&
            y >= this.yInicial &&
            y <= this.yInicial + this.altura
        );
    }
}
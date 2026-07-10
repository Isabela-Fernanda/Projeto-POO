export class CameraMapa {
    constructor(
        private x: number,
        private y: number,
        private largura: number,
        private altura: number
    ) { }

    getX(): number { return this.x; }

    getY(): number { return this.y; }

    getLargura(): number { return this.largura; }

    getAltura(): number { return this.altura; }

    getFimX(): number {
        return this.x + this.largura;
    }

    getFimY(): number {
        return this.y + this.altura;
    }

    contem(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x < this.x + this.largura &&
            y >= this.y &&
            y < this.y + this.altura
        );
    }
}
export class Posicao {
    constructor(
        private x: number,
        private y: number
    ) {}

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    distanciaA(outra: Posicao): number {
        const dx = this.x - outra.x;
        const dy = this.y - outra.y;

        return Math.sqrt(dx * dx + dy * dy);
    }
}

export class PosicaoAlvo {
    constructor(
        public x: number,
        public y: number
    ){}
}

export interface AlvoArea{
    x: number;
    y: number;
}
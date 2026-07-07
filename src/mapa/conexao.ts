import { Personagem } from "../personagens/personagem.js";
import { TileMapa } from "./tileMapa.js"
import { Sala, LadoSala } from "./sala.js";

export abstract class Conexao {
    constructor(
        private origem: Sala,
        private destino: Sala,
        private ladoA: LadoSala,
        private x: number,
        private y: number,
        private largura: number = 2,
        private altura: number = 2,
    ) {
        if (this.ladoA === LadoSala.NORTE || this.ladoA === LadoSala.SUL) {
            this.largura = 1;
            this.altura = 2;
        }
        if (this.ladoA === LadoSala.LESTE || this.ladoA === LadoSala.OESTE) {
            this.largura = 2;
            this.altura = 1;
        }
    }

    abstract podeAtravessar(personagem: Personagem): boolean;
    abstract getSimbolo(): string;
    abstract getTipo(): TileMapa;

    getOrigem(): Sala { return this.origem; }

    getDestino(): Sala { return this.destino; }

    getX(): number { return this.x; }

    getY(): number { return this.y; }

    getLargura(): number { return this.largura; }

    getAltura(): number { return this.altura; }

    deveDesenhar(x: number, y: number): boolean {
        return x === this.x && y === this.y;
    }

    contem(x: number, y: number): boolean {
        return (x >= this.x && x < this.x + this.largura && y >= this.y && y < this.y + this.altura);
    }
}

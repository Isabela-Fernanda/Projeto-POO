export class ResultadoAtaque {
    constructor(
        public readonly rolagem: number,
        public readonly totalAtaque: number,
        public readonly acertou: boolean,
        public readonly critico: boolean,
        public readonly dano: number
    ) {}
}

export interface ResultadoAtaques {
    ataques: ResultadoAtaque[];
}
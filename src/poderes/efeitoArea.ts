import { Personagem } from "../personagens/personagem.js";

export abstract class EfeitoArea {
    constructor(
        protected x: number,
        protected y: number,
        protected raio: number,
        protected duracao: number
    ) { }

    abstract afetar(alvo: Personagem): void;

    reduzirDuracao(): void {
        this.duracao--;
    }

    expirou(): boolean {
        return this.duracao <= 0;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getRaio(): number {
        return this.raio;
    }

    estaDentro(alvo: Personagem): boolean {
        const dx = alvo.getX() - this.x;
        const dy = alvo.getY() - this.y;

        return Math.sqrt(dx * dx + dy * dy) <= this.raio;
    }
}
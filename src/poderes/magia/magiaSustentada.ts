import { Magia } from "./magia.js";

export abstract class MagiaSustentada extends Magia {
    private ativa = true;

    estaAtiva(): boolean {
        return this.ativa;
    }

    encerrar(): void {
        this.ativa = false;
    }

    processarRodada(): void { }
}
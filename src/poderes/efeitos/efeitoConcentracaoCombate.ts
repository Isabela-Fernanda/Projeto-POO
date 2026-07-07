import { Efeito } from "../efeito.js";

export class EfeitoConcentracaoCombate extends Efeito {
    constructor() {
        super("Concentração de Combate", 1);
    }

    private consumido = false;

    usarVantagem(): boolean {

        if (this.consumido)
            return false;

        this.consumido = true;

        return true;
    }

    override expirou(): boolean {
        return this.consumido;
    }
}
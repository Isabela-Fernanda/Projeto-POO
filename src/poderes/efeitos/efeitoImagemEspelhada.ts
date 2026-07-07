import { Efeito } from "../efeito.js";

export class EfeitoImagemEspelhada extends Efeito {
    private imagens = 3;

    constructor() {
        super("Imagem Espelhada", 10);
    }

    override getBonusDefesa(): number {
        return this.imagens * 2;
    }

    destruirImagem(): void {

        if (this.imagens > 0)
            this.imagens--;
    }

    override expirou(): boolean {
        return this.imagens <= 0;
    }
}
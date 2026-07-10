import { TipoMensagem } from "./gerenciadorMensagem.js";

export class Mensagem {
    constructor(
        public readonly texto: string,
        public readonly tipo: TipoMensagem = TipoMensagem.NORMAL,
        public readonly tempo: number = 4000
    ) {}

}
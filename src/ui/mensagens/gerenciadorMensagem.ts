import { Mensagem } from "./mensagem.js";

export enum TipoMensagem {
    NORMAL,
    SUCESSO,
    ALERTA,
    COMBATE,
    LOOT,
    SISTEMA
}

export class GerenciadorMensagens {
    private mensagens: Mensagem[] = [];

    adicionar(texto: string, tipo: TipoMensagem = TipoMensagem.NORMAL): void {
        this.mensagens.push(new Mensagem(texto, tipo));
    }

    adicionarLista(mensagens: string[], tipo: TipoMensagem = TipoMensagem.NORMAL): void {
        for (const texto of mensagens) {
            this.adicionar(texto, tipo);
        }
    }

    getMensagens(): readonly Mensagem[] {
        return this.mensagens;
    }

    limpar(): void {
        this.mensagens = [];
    }
}
import { GerenciadorMensagens, TipoMensagem } from "@ui/mensagens/gerenciadorMensagem.js";

export class PainelMensagens {
    private fundo: Phaser.GameObjects.Rectangle;
    private textos: Phaser.GameObjects.Text[] = [];
    private primeiraMensagem = 0;
    private readonly linhasVisiveis = 5;
    private seguindoFinal = true;

    constructor(private scene: Phaser.Scene) {
        const { width, height } = scene.scale;

        this.fundo = scene.add.rectangle(width / 2, height - 70, width, 140, 0x111111, .85);

        this.fundo.setOrigin(.5);

        for (let i = 0; i < this.linhasVisiveis; i++) {
            this.textos.push(scene.add.text(20, height - 125 + i * 22, "",
                {
                    fontSize: "18px"
                }));
        }
    }

    atualizar(gerenciador: GerenciadorMensagens): void {
        const mensagens = gerenciador.getMensagens();

        if (this.seguindoFinal) {
            this.primeiraMensagem = Math.max(0, mensagens.length - this.linhasVisiveis);
        }

        for (let i = 0; i < this.linhasVisiveis; i++) {
            const mensagem = mensagens[this.primeiraMensagem + i];

            if (!mensagem) {
                this.textos[i].setText("");
                continue;
            }

            this.textos[i].setText(mensagem.texto).setColor(this.getCor(mensagem.tipo));
        }
    }

    subir(gerenciador: GerenciadorMensagens): void {
        this.seguindoFinal = false;

        this.primeiraMensagem = Math.max(0, this.primeiraMensagem - 1);

        this.atualizar(gerenciador);
    }

    descer(gerenciador: GerenciadorMensagens): void {
        const maximo = Math.max(0, gerenciador.getMensagens().length - this.linhasVisiveis);

        this.primeiraMensagem = Math.min(maximo, this.primeiraMensagem + 1);

        this.seguindoFinal = this.primeiraMensagem == maximo;

        this.atualizar(gerenciador);
    }

    seguirFinal(): void {
        this.seguindoFinal = true;
    }

    private getCor(tipo: TipoMensagem): string {
        switch (tipo) {
            case TipoMensagem.SUCESSO: return "#6CFF6C";
            case TipoMensagem.ALERTA: return "#FFD54F";
            case TipoMensagem.COMBATE: return "#FF6B6B";
            case TipoMensagem.LOOT: return "#6EC6FF";
            case TipoMensagem.SISTEMA: return "#D291FF";
            default: return "#FFFFFF";
        }
    }
}
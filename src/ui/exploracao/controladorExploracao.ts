import { ResultadoInteracao } from "@mapa/catalogoObjetos.js";
import { Mapa } from "@mapa/mapa.js";
import { GerenciadorTutorial } from "@mapa/salas/gerenciadorTutorial.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { GerenciadorMensagens } from "@ui/mensagens/gerenciadorMensagem.js";

export class ControladorExploracao {

    constructor(
        private mapa: Mapa,
        private jogador: Jogador,
        private tutorial: GerenciadorTutorial,
        private mensagens: GerenciadorMensagens,
    ) { }

    mover(dx: number, dy: number): boolean {
        return this.mapa.moverEntidade(
            this.jogador,
            this.jogador.getX() + dx,
            this.jogador.getY() + dy
        );

    }

    interagir(): boolean {
        const objetos = this.mapa.getObjetos().filter(obj => {
            const distancia = this.mapa.calcularDistancia(this.jogador.getX(), this.jogador.getY(), obj.getX(), obj.getY());
            return distancia <= 1.5;
        });

        if (objetos.length === 0) {
            this.mensagens.adicionar("Não há nada para interagir.");
            return false;
        }

        const objeto = objetos[0];

        const resultado = objeto.interagir(this.jogador);

        for (const mensagem of resultado.mensagens){
            this.mensagens.adicionar(mensagem)
        }

        return this.processarResultado(resultado.resultado);
    }

    private processarResultado(resultado: ResultadoInteracao): boolean {
        switch (resultado) {
            case ResultadoInteracao.ENTRAR_MASMORRA:
                this.tutorial.processarInteracao(resultado);
                return true;
            case ResultadoInteracao.FIM_DE_JOGO:
            case ResultadoInteracao.NENHUM:
            default: return false;
        }
    }
}

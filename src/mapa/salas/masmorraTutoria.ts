import { GeradorEncontros } from "../../criacao/geradorEncontros.js";
import { Jogador } from "../../personagens/tiposPersonagem/jogador.js";
import { Mapa } from "../mapa.js";
import { Luminosidade, Sala, TipoAmbiente, LadoSala, TipoSala } from "../sala.js";
import { Porta, EstadoPorta, Passagem } from "../porta.js";
import { Bau, Portal, ResultadoInteracao } from "../catalogoObjetos.js";

export class MasmorraTutorial {
    construir(mapa: Mapa, jogador?: Jogador): void {
        mapa.limparObjetos();
        mapa.limparSalas();

        const entrada = new Sala("Entrada da Masmorra", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 0, 0, 16, 14);

        const corredor1 = new Sala("Corredor Leste", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 16, 5, 8, 4, TipoSala.CORREDOR);

        const sala1 = new Sala("Sala dos Goblins", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 24, 0, 22, 16);

        const corredor2 = new Sala("Corredor Sul", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 36, 16, 4, 6, TipoSala.CORREDOR);

        const sala2 = new Sala("Depósito Abandonado", TipoAmbiente.SUBTERRANEO, Luminosidade.ESCURO, 36, 22, 24, 20);

        const corredor3 = new Sala("Corredor Oeste", TipoAmbiente.SUBTERRANEO, Luminosidade.ESCURO, 28, 30, 8, 4, TipoSala.CORREDOR);

        const sala3 = new Sala("Covil do Hobgoblin", TipoAmbiente.SUBTERRANEO, Luminosidade.ILUMINADO, 0, 22, 28, 26, TipoSala.SALA_DE_CHEFE);

        const tesouro = new Sala("Tesouro", TipoAmbiente.SUBTERRANEO, Luminosidade.ILUMINADO, 28, 38, 12, 10, TipoSala.SALA_DE_TESOURO, false, { alturaTeto: 5, quantidadePilares: 4, iluminacaoCentral: true }, [{ x: 0, y: 0, largura: 8, altura: 4 }, { x: 0, y: 4, largura: 12, altura: 6 },]);

        mapa.adicionarSala(entrada);
        mapa.adicionarSala(corredor1);
        mapa.adicionarSala(sala1);
        mapa.adicionarSala(corredor2);
        mapa.adicionarSala(sala2);
        mapa.adicionarSala(corredor3);
        mapa.adicionarSala(sala3);
        mapa.adicionarSala(tesouro);

        mapa.adicionarConexao(new Porta(entrada, corredor1, LadoSala.LESTE, 15, 6, EstadoPorta.FECHADA, ""));

        mapa.adicionarConexao(new Passagem(corredor1, sala1, LadoSala.LESTE, 23, 6));

        mapa.adicionarConexao(new Porta(sala1, corredor2, LadoSala.SUL, 37, 15, EstadoPorta.FECHADA, ""));

        mapa.adicionarConexao(new Passagem(corredor2, sala2, LadoSala.SUL, 37, 21));

        mapa.adicionarConexao(new Porta(corredor3, sala2, LadoSala.LESTE, 35, 31, EstadoPorta.FECHADA, ""));

        mapa.adicionarConexao(new Passagem(sala3, corredor3, LadoSala.LESTE, 27, 31));

        mapa.adicionarConexao(new Porta(sala3, tesouro, LadoSala.LESTE, 27, 42, EstadoPorta.TRANCADA, "Tesouro do Chefe"));

        mapa.definirPosicaoInicial(3, 4);
        mapa.definirRotacaoInicial(0);

        if (jogador) {
            jogador.setSalaAtual(entrada);
            mapa.posicionarEntidade(jogador, 3, 4);
        }

        entrada.descobrir();

        GeradorEncontros.criarEntrada(mapa);
        GeradorEncontros.criarSalaGoblins(mapa);
        GeradorEncontros.criarDeposito(mapa);
        GeradorEncontros.criarChefe(mapa);

        mapa.adicionarObjeto(new Bau(18, 26, []));
        mapa.adicionarObjeto(new Portal("Portal Arcano", 20, 27, ResultadoInteracao.FIM_DE_JOGO));
    }
}
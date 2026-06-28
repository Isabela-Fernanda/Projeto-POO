import { GeradorEncontros } from "../../criacao/geradorEncontros.ts";
import { Jogador } from "../../personagens/jogador.ts";
import { Mapa } from "../mapa.ts";
import { Luminosidade, Sala, TipoAmbiente, LadoSala } from "../sala.ts";
import { Porta, EstadoPorta, Passagem } from "../porta.ts";
import { Bau, Portal, ResultadoInteracao } from "../catalogoObjetos.ts";

export class MasmorraTutorial {
    construir(mapa: Mapa, jogador: Jogador): void {
        mapa.limparObjetos();
        mapa.limparSalas();

        const entrada = new Sala("Entrada da Masmorra", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 0, 0, 15, 10);
        const corredor1 = new Sala("Corredor Leste", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 15, 4, 6, 3);
        const sala1 = new Sala("Sala dos Goblins", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 21, 0, 14, 10);
        const corredor2 = new Sala("Corredor Sul", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 26, 10, 3, 6);
        const sala2 = new Sala("Depósito Abandonado", TipoAmbiente.SUBTERRANEO, Luminosidade.ESCURO, 21, 16, 14, 10);
        const corredor3 = new Sala("Corredor Oeste", TipoAmbiente.SUBTERRANEO, Luminosidade.ESCURO, 15, 20, 6, 3);
        const sala3 = new Sala("Covil do Hobgoblin", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 0, 14, 15, 15);
        const tesouro = new Sala("Tesouro", TipoAmbiente.SUBTERRANEO, Luminosidade.ILUMINADO, 15, 23, 8, 7)

        mapa.adicionarSala(entrada);
        mapa.adicionarSala(corredor1);
        mapa.adicionarSala(sala1);
        mapa.adicionarSala(corredor2);
        mapa.adicionarSala(sala2);
        mapa.adicionarSala(corredor3);
        mapa.adicionarSala(sala3);
        mapa.adicionarSala(tesouro);

        mapa.adicionarConexao(new Porta(entrada, corredor1, LadoSala.LESTE, 14, 5, EstadoPorta.FECHADA, ""));
        mapa.adicionarConexao(new Passagem(corredor1, sala1, LadoSala.LESTE, 20, 5));
        mapa.adicionarConexao(new Porta(sala1, corredor2, LadoSala.SUL, 27, 9, EstadoPorta.FECHADA, ""));
        mapa.adicionarConexao(new Passagem(corredor2, sala2, LadoSala.SUL, 27, 15));
        mapa.adicionarConexao(new Porta(corredor3, sala2, LadoSala.LESTE, 20, 21, EstadoPorta.FECHADA, ""));
        mapa.adicionarConexao(new Passagem(sala3, corredor3, LadoSala.LESTE, 14, 21));
        mapa.adicionarConexao(new Porta(sala3, tesouro, LadoSala.LESTE, 14, 24, EstadoPorta.TRANCADA, "Tesouro do Chefe"));

        jogador.setPosicao(3, 4);
        jogador.setSalaAtual(entrada);
        entrada.descobrir();

        mapa.adicionarEntidade(jogador);

        GeradorEncontros.criarEntrada(mapa);
        GeradorEncontros.criarSalaGoblins(mapa);
        GeradorEncontros.criarDeposito(mapa);
        GeradorEncontros.criarChefe(mapa);

        mapa.adicionarObjeto(new Bau(18, 26, []));
        mapa.adicionarObjeto(new Portal("Portal Arcano", 20, 27, ResultadoInteracao.FIM_DE_JOGO));
    }
}
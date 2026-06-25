import { GeradorEncontros } from "../../criacao/geradorEncontros.ts";
import { Jogador } from "../../personagens/jogador.ts";
import { Mapa } from "../mapa.ts";
import { Luminosidade, Porta, Sala, TipoAmbiente, EstadoPorta } from "../sala.ts";

export class MasmorraTutorial {
    construir(mapa: Mapa, jogador: Jogador): void {
        mapa.limparObjetos();
        mapa.limparSalas();

        // 1. Definição das Salas (Caminho sinuoso em formato de Z)

        // Entrada (Canto Superior Esquerdo)
        const entrada = new Sala("Entrada da Masmorra", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 0, 0, 15, 10);

        // Corredor 1 (Estende-se horizontalmente para a direita)
        const corridor1 = new Sala("Corredor Leste", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 15, 4, 6, 3);

        // Sala 1 (Canto Superior Direito)
        const sala1 = new Sala("Sala dos Goblins", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 21, 0, 14, 10);

        // Corredor 2 (Desce verticalmente para o sul)
        const corridor2 = new Sala("Corredor Sul", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 26, 10, 3, 6);

        // Sala 2 (Canto Inferior Direito)
        const sala2 = new Sala("Depósito Abandonado", TipoAmbiente.SUBTERRANEO, Luminosidade.ESCURO, 21, 16, 14, 10);

        // Corredor 3 (Estende-se horizontalmente de volta para a esquerda)
        const corridor3 = new Sala("Corredor Oeste", TipoAmbiente.SUBTERRANEO, Luminosidade.ESCURO, 15, 20, 6, 3);

        // Sala 3 (Canto Inferior Esquerdo - Sala do Chefe Final)
        const sala3 = new Sala("Covil do Hobgoblin", TipoAmbiente.SUBTERRANEO, Luminosidade.PENUMBRA, 0, 14, 15, 15);

        // Registar as salas no mapa
        mapa.adicionarSala(entrada);
        mapa.adicionarSala(corridor1);
        mapa.adicionarSala(sala1);
        mapa.adicionarSala(corridor2);
        mapa.adicionarSala(sala2);
        mapa.adicionarSala(corridor3);
        mapa.adicionarSala(sala3);

        // 2. Criação das Conexões (Uso de 'as any' para contornar a assinatura estrutural rígida)

        // Entrada <-> Corredor 1 (Portas normais de madeira, começam fechadas)
        entrada.adicionarConexao(new Porta(entrada, corridor1, 14, 5) as any);
        corridor1.adicionarConexao(new Porta(corridor1, entrada, 15, 5) as any);

        // Corredor 1 <-> Sala 1 (Portas configuradas como Passagens Livres, sem símbolo de bloqueio)
        corridor1.adicionarConexao(new Porta(corridor1, sala1, 20, 5, true) as any);
        sala1.adicionarConexao(new Porta(sala1, corridor1, 21, 5, true) as any);

        // Sala 1 <-> Corredor 2 (Portas Normais)
        sala1.adicionarConexao(new Porta(sala1, corridor2, 27, 9) as any);
        corridor2.adicionarConexao(new Porta(corridor2, sala1, 27, 10) as any);

        // Corredor 2 <-> Sala 2 (Passagens Livres)
        corridor2.adicionarConexao(new Porta(corridor2, sala2, 27, 15, true) as any);
        sala2.adicionarConexao(new Porta(sala2, corridor2, 27, 16, true) as any);

        // Sala 2 <-> Corredor 3 (Porta de Ferro Trancada - Exige chave mecânica do motor de jogo)
        const portaTrancadaSaida = new Porta(sala2, corridor3, 21, 21);
        portaTrancadaSaida.estado = EstadoPorta.TRANCADA;
        sala2.adicionarConexao(portaTrancadaSaida as any);

        const portaTrancadaEntrada = new Porta(corridor3, sala2, 20, 21);
        portaTrancadaEntrada.estado = EstadoPorta.TRANCADA;
        corridor3.adicionarConexao(portaTrancadaEntrada as any);

        // Corredor 3 <-> Sala 3 (Portas Normais)
        corridor3.adicionarConexao(new Porta(corridor3, sala3, 15, 21) as any);
        sala3.adicionarConexao(new Porta(sala3, corridor3, 14, 21) as any);

        // 3. Posicionamento Inicial do Jogador (Dentro da Sala de Entrada)
        jogador.setPosicao(3, 4);
        mapa.adicionarEntidade(jogador);

        GeradorEncontros.criarEntrada(mapa);
        GeradorEncontros.criarSalaGoblins(mapa);
        GeradorEncontros.criarDeposito(mapa);
        GeradorEncontros.criarChefe(mapa);
    }
}
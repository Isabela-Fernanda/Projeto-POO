import { Personagem } from "../../personagens/personagem.ts";
import { AcaoItem, Item } from "../item.ts";
import { Municao } from "../municao.ts";

export class Diverso extends Item {
    constructor(
        nome: string,
        preco: number,
        peso: number,
        descricao: string,
    ) {
        super(nome, preco, peso, descricao);
    }

    getAcoes(personagem: Personagem): AcaoItem[] {
        return []
    }
}

export class CatalogoItensDiversos {
    /* --------------------------------------------------------------- */
    /* ----------------------------- Diverso ---------------------------- */
    /* --------------------------------------------------------------- */
    static readonly AGUA_BENTA = new Diverso("Água Benta", 10, 0.5, "Criada por clérigos e vendida em pequenos frascos, é um poderoso recurso na luta contra o mal. Para usar a água benta, você gasta uma ação padrão e escolhe um morto-vivo, demônio ou diabo em alcance curto (a água benta é inofensiva contra outras criaturas). O alvo sofre 2d10 pontos de dano de luz (Reflexos CD Des reduz à metade).");

    static readonly ALGEMAS = new Diverso("Algemas", 15, 1, "Um par de algemas para criaturas Médias. Escapar exige uma ação completa e um teste de Acrobacia (CD 30) ou Força (CD 26).");

    static readonly ALGIBEIRA = new Diverso("Algibeira", 1, 0.25, "Bolsa de couro presa ao cinto. Útil para guardar itens pequenos, especialmente moedas.");

    static readonly BARRACA = new Diverso("Barrca", 10, 10, "Uma barraca de lona, útil para aventureiros desbravando os ermos. Uma barraca conta como um saco de dormir para duas pessoas e fornece +2 em testes de Sobrevivência para acampar.");

    static readonly CORDA_10M = new Diverso("Corda (10m)", 1, 5, "Um rolo com 10 metros de corda de cânhamo, o mesmo tipo usado em navios. Dar um nó firme exige um teste de Destreza (CD 10). Dar um nó especial (capaz de deslizar, soltar-se lentamente, se desfazer com um puxão etc.) exige um teste de Destreza (CD 12). Arrebentar a corda exige um teste de Força (CD 23).");

    static readonly ESPELHO_DE_METAL = new Diverso("Espelho de Metal", 10, 0.25, "Este espelho de metal polido possui diversas utilidades. Além de garantir que você esteja apresentável, pode ser usado para observar cantos, fazer sinais de luz, colocar disfarces...");

    static readonly INSTRUMENTO_MUSICAL = new Diverso("Instrumento Musical", 50, 1.5, "Um instrumento típico, como um alaúde, flauta ou lira. Muito usado por bardos.");

    static readonly KIT_DE_OFICIO = new Diverso("Kit de <oficio>", 30, 4, "Existe um kit para cada tipo de Ofício. Por exemplo, martelo, pregos e serrote para Ofício (carpintaria) ou lente de aumento e balança para testes de Ofício (joalheria). Um personagem sem as ferramentas necessárias para seu Ofício sofre penalidade de –5 nos testes.");

    static readonly KIT_DE_DISFARCES = new Diverso("Kit de Disfarces", 50, 4, "Estojo contendo cosméticos, tinta para cabelo e alguns apêndices físicos simples (como narizes falsos). Um personagem sem este kit sofre penalidade de –5 em testes de Enganação para fazer um disfarce.");

    static readonly KIT_DE_LADRAO = new Diverso("Kit de Ladrão", 30, 0.5, "Usado para abrir portas e desarmar armadilhas, este kit é composto de gazuas, arames e outras pequenas ferramentas guardadas em um estojo de couro. Um personagem sem este kit sofre penalidade de –5 em testes de Ladinagem para abrir fechaduras e sabotar.");

    static readonly KIT_DE_MEDICAMENTOS = new Diverso("Kit de Medicamentos", 50, 2, "Pequena caixa com ervas, unguentos, bandagens e outros materiais úteis. Um personagem sem este kit sofre penalidade de –5 em testes de Cura.");

    static readonly LAMPIAO = new Diverso("Lampião", 7, 1, "Um cilindro com uma alça e duas portinholas. Uma chama alimentada por óleo é acesa dentro do cilindro e uma das portinholas aberta deixa a luz sair. A luz do lampião atinge 9m. Uma carga de óleo dura 6 horas e custa T$ 0,1.");

    static readonly MOCHILA = new Diverso("Mochila", 2, 1, "Esta bolsa reforçada de couro tem bolsos e tiras para ser carregada nas costas e prender equipamentos diversos.");

    static readonly ODRE = new Diverso("Odre", 1, 2, "Bolsa de couro para guardar bebida (geralmente água ou vinho). Existe em vários tamanhos, mas o odre mais comum comporta 1 litro.");

    static readonly PE_DE_CABRA = new Diverso("Pé de Cabra", 2, 2.5, "Barra de ferro para forçar portas e baús fechados. Abrir uma porta ou baú usando um pé de cabra oferece +5 no teste de Força. Um pé de cabra pode ser usado em combate, com as mesmas estatísticas de uma clava.");

    static readonly PEDERNEIRA = new Diverso("Pederneira", 1, 0.01, "Uma pedra de faísca e uma placa rugosa de metal, para acender fogo. Produz faíscas quando a pedra bate no metal. Acender uma tocha ou lanterna com uma pederneira é uma ação completa.");

    static readonly PENA = new Diverso("Pena", 0.1, 0.01, "Feita a partir da pena de aves, para escrever.");

    static readonly PERGAMINHO_FOLHA = new Diverso("Pergaminho (folha)", 0.1, 0.01, "Um pedaço de pele de cabra ou ovelha, preparado para escrita.");

    static readonly RACAO_DE_VIAGEM_POR_DIA = new Diverso("Ração de Viagem (por dia)", 0.5, 0.5, "Própria para viagens, uma porção desta ração alimenta uma pessoa por um dia. É feita de alimentos conservados, como carne defumada, frutas secas, pão, queijo e biscoitos. Se mantida seca dura bastante, mas quando molhada se estraga em 24 horas.");

    static readonly SACO_DE_DORMIR = new Diverso("Saco de Dormir", 1, 2.5, "Composto por um colchão e uma coberta fina o bastante para ser enrolada e amarrada, é especialmente útil para aventureiros, que nunca sabem onde vão passar a noite. Dormir ao relento sem um saco de dormir diminui sua recuperação de PV e PM.");

    static readonly SACO_DE_LONA = new Diverso("Saco de Lona", 0.1, 0.25, "Feito de tecido resistente, pode ser fechado por uma corda trespassada na abertura. Comporta até 20 kg.");

    static readonly TINTA_FRASCO = new Diverso("Tinta", 8, 0.2, "Um frasco de 30 ml de tinta preta. Outras cores custam o dobro do preço.");

    static readonly TOCHA = new Diverso("Tocha", 0.1, 0.5, "Um bastão de madeira com algum combustível na ponta (geralmente trapos embebidos em parafina). Depois de acesa, queima por uma hora, iluminando até 6m. Pode ser usada como uma arma simples leve (dano 1d4 mais 1 por fogo, crítico x2).");

    static readonly VARA_DE_MADEIRA_3M = new Diverso("Vara de Madeira", 0.2, 4, "Uma haste com 3m de comprimento, geralmente usada para alcançar pontos distantes. Tem muitas utilidades, mas é frágil demais para servir como arma.");

    /* --------------------------------------------------------------- */
    /* -------------------------- ALQUIMIA --------------------------- */
    /* --------------------------------------------------------------- */
    static readonly ACIDO = new Diverso("Ácido", 10, 0.5, "Frasco de vidro contendo um ácido alquímico altamente corrosivo. Para usar o ácido, você gasta uma ação padrão e escolhe uma criatura em alcance curto. Essa criatura sofre 2d4 pontos de dano de ácido (Reflexos CD Des reduz à metade). CD 15.");

    static readonly BALSAMO_RESTAURADOR = new Diverso("Bálsamo Restaurador", 10, 0.5, "Uma pasta verde e fedorenta, feita de ervas medicinais. Esfregar essa pasta em um ferimento é uma ação completa e recupera 2d4 pontos de vida. CD 15.");

    static readonly BOMBA = new Diverso("Bomba", 50, 0.5, "Uma granada rudimentar, popular entre goblins e usuários de pólvora. Para usar a bomba, você precisa empunhá-la, gastar uma ação de movimento para acender seu pavio e então uma ação padrão para arremessá-la em um ponto em alcance curto. Criaturas a até 3m desse ponto sofrem 6d6 pontos de dano de impacto. Um teste de Reflexos (CD Des) reduz o dano à metade. CD 20.");

    static readonly ESSENCIA_DE_MANA = new Diverso("Essência de Mana", 50, 0.1, "Esta poção feita de ervas raras e compostos alquímicos recupera energia pessoal. Beber a essência de mana é uma ação padrão e recupera 1d4 pontos de mana. CD 20.");

    static readonly FOGO_ALQUIMICO = new Diverso("Fogo Alquímico", 10, 0.5, "Frasco de cerâmica contendo uma substância grossa e pegajosa, que entra em combustão em contato com o ar. Para usar o fogo alquímico, você gasta uma ação padrão e escolhe uma criatura em alcance curto. Essa criatura sofre 1d6 pontos de dano de fogo e fica em chamas. Um teste de Reflexos (CD Des) reduz o dano à metade e evita as chamas. CD 15.");

    /* --------------------------------------------------------------- */
    /* ------------------------- ALIMENTAÇÃO ------------------------- */
    /* --------------------------------------------------------------- */
    static readonly BATATA_VALKARIANA = new Diverso("Batata Valkariana", 2, 0.5, "Batatas cortadas em tiras e mergulhadas em óleo fervente. Gordurentas e pouco nutritivas, são o tipo de prato que só é servido numa metrópole como Valkaria. Apesar disso, o prato é quase unânime. Gostoso, deixa qualquer um empolgado para realizar façanhas. Você recebe +1d6 num único teste a sua escolha realizado nesse dia. Para não esquecer, deixe um d6 em cima da sua ficha. De preferência, amarelo. CD 15.");

    static readonly BEBIDA_COMUM = new Diverso("Bebida Comum", 0.1, 0.5, "Uma caneca cheia da bebida mais comum no local, geralmente cerveja.");

    static readonly GORAD_QUENTE = new Diverso("Gorad Quente", 18, 0.5, "Gorad e leite, servidos quentes. Não tem erro. O gorad ativa o cérebro, fornecendo +2 PM temporários. CD 20.");

    static readonly MACARRAO_DE_YUVALIN = new Diverso("Macarrão de Yuvalin", 6, 0.5, "Yuvalin é uma cidade mineradora em Zakharov, na fronteira com as Montanhas Uivantes. Seus habitantes criaram este prato reforçado (macarrão, bacon e creme de leite!) para encarar suas árduas jornadas de trabalho nas minas. Delicioso, o prato se espalhou por outras cidades e reinos. Você recebe +5 PV temporários. CD 15.");

    static readonly PRATO_DO_AVENTUREIRO = new Diverso("Prato do Aventureiro", 1, 0.5, "Um cozido de galinha com legumes, esta é uma refeição simples, mas nutritiva. Em sua próxima noite de sono, você aumenta a sua recuperação de pontos de vida em +1 por nível. CD 10.");

    static readonly REFEICAO_COMUM = new Diverso("Refeição Comum", 0.3, 0.5, "Uma refeição típica inclui pão, queijo, cozido de carne ou galinha com legumes e uma caneca de bebida.");

    static readonly SOPA_DE_PEIXE = new Diverso("Sopa de Peixe", 1, 0.5, "Um cozido de peixe com verduras. É um prato humilde, mas garante um descanso relaxante. Em sua próxima noite de sono, você aumenta a sua recuperação de pontos de mana em +1 por nível. CD 10.");

    /* --------------------------------------------------------------- */
    /* --------------------------- ANIMAIS --------------------------- */
    /* --------------------------------------------------------------- */
    static readonly CAO_DE_GUARDA = new Diverso("Cão de Guarda", 50, 0, "Este cachorro valente e leal pode ser usado como montaria por uma criatura Pequena ou Minúscula (ou como um aliado de outro tipo por personagens com o poder Parceiro).");

    static readonly CAVALO = new Diverso("Cavalo", 75, 0, "A montaria mais comum no Reinado. Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste.");

    static readonly CAVALO_DE_GUERRA = new Diverso("Cavalo de Guerra", 400, 0, "A montaria mais comum no Reinado. Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste.");

    static readonly ESTABULO = new Diverso("Estábulo", 0.1, 0, "Inclui alimentação para o animal.");

    static readonly PONEI = new Diverso("Pônei", 5, 0, "A montaria mais comum entre raças Pequenas. Pôneis sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Pôneis de guerra dispensam esse teste.");

    static readonly PODEI_DE_GUERRA = new Diverso("Pônei de Guerra", 30, 0, "A montaria mais comum entre raças Pequenas. Pôneis sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Pôneis de guerra dispensam esse teste.");

    static readonly SELA = new Diverso("Sela", 20, 0, "Uma peça de couro e pelego, posicionada sobre o lombo da montaria para o cavaleiro sentar. Inclui arreios, freios e alforjes (sacos de couro para levar mantimentos de viagem).");

    static readonly TROBO = new Diverso("Trobo", 10, 0, "Estas enormes aves, também chamadas de pássaros-touros, são parecidas com avestruzes com chifres, couro e cascos de búfalo. Não têm asas. Possuem poucas penas, que servem apenas como ornamentação. Muito dóceis, trobos são usados em áreas rurais como animais de carga e tração.");

    /* --------------------------------------------------------------- */
    /* -------------------------- VEÍCULOS --------------------------- */
    /* --------------------------------------------------------------- */
    static readonly BALAO_GOBLIN = new Diverso("Balão Goblin", 200, 0, "Feito de imensas bolsas de couro e outros tecidos remendados, com uma gôndola parecida com um grande cesto, o balão goblin é um engenho tecnológico sem igual em Arton.\nUm balão goblin tem tamanho Enorme, deslocamento 12m, Defesa 8 (+ mod. Des do baloeiro) e 80 PV. Conduzi-lo exige um teste de Pilotagem por dia, com CD 15 (céu tranquilo), 20 (ventania ou chuva) ou 25 (tempestade). Uma falha significa que o balão não avança ou avança na direção errada; uma falha por 5 ou mais significa que o balão cai.\nAo contrário do que possa parecer, quedas de balões raramente são fatais. Quando o balão perde mais da metade de seus PV, começa a perder ar e flutua lentamente na direção do solo. Cada ocupante sofre 2d6 pontos de dano de impacto (Ref CD 15 reduz à metade). Um balão só cai de forma perigosa caso perca todos os seus PV. Neste caso, os ocupantes sofrem dano normal pela queda, de acordo com a altura.");

    static readonly CARROCA = new Diverso("Carroça", 30, 0, "Veículo de duas ou quatro rodas, aberto, normalmente usado para transportar cargas pesadas. É puxada por dois cavalos ou um trobo. Inclui os arreios necessários para controlar os animais.");

    static readonly CARRUAGEM = new Diverso("Carruagem", 100, 0, "Veículo de quatro rodas, capaz de transportar até quatro pessoas em uma cabine fechada, mais dois condutores do lado de fora. É puxada por dois cavalos ou um trobo. Inclui os arreios necessários para controlar os animais.");

    static readonly CANOA = new Diverso("Canoa", 50, 0, "Construída a partir de um único tronco de árvore, é a mais simples das embarcações.");

    static readonly VELEIRO = new Diverso("Veleiro", 10000, 0, "Com três mastros, é o típico navio de viagem, muito popular entre mercadores.");

    /* --------------------------------------------------------------- */
    /* -------------------------- VESTUÁRIO -------------------------- */
    /* --------------------------------------------------------------- */
    static readonly TRAJE_CAMUFLADO = new Diverso("Traje Camuflado", 20, 2, "Um traje camuflado é feito para um tipo de terreno específico (veja a habilidade Explorador, do caçador, para os tipos de terrenos existentes). Por exemplo, um traje camuflado para floresta pode ser verde e marrom e coberto de folhas, enquanto um traje urbano pode ser cinza ou negro. Usar um traje camuflado no terreno correto fornece +2 em testes de Furtividade. CD 20.");

    static readonly TRAJE_DA_CORTE = new Diverso("Traje da Corte", 50, 2, "Roupas de luxo, feitas sob medida e adequadas à nobreza e realeza. Em certos ambientes (um baile, um salão do palácio), um personagem que não esteja vestindo um traje da corte sofre –5 em testes de erícias baseadas em Carisma. CD 20.");

    static readonly TRAJE_DE_PLEBEU = new Diverso("Traje de Plebeu", 0.5, 1, "Roupas típicas de aldeão, incluem uma camisa larga e calças soltas, ou saia e vestido. Não inclui calçados — os mais pobres andam descalços. CD 10.");

    static readonly TRAJE_DE_VIAJANTE = new Diverso("Traje de Viajante", 5, 2, "Inclui botas resistentes, calças ou saias, cinto, camisa de linho e capa com capuz. São as roupas padrão de aventureiros. CD 15.");
}
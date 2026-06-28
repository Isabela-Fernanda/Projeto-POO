import { Arma, TipoAtaque, Categoria, GrupoArma, PropriedadeArma } from "./arma.ts";
import { FacilidadeUso } from "../inventario/equipamento.ts";
import { Municao } from "./municao.ts";
import { CatalogoMunicao } from "./catalogoMunicao.ts";
import { TipoDano } from "../combate/tipoDano.ts";

export class CatalogoArmas {
    // Especial
    static readonly CHIFRE = new Arma("Chifre", 0, 0, GrupoArma.NENHUM, "Arma natural.", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1);
    static readonly MORDIDA = new Arma("Mordida", 0, 0, GrupoArma.NENHUM, "Arma natural.", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1);
    static readonly GARRA = new Arma("Garra", 0, 0, GrupoArma.NENHUM, "Arma natural.", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1.5);

    // Armas Simples
    // Armas Simples - Leves
    static readonly ADAGA = new Arma("Adaga", 2, 0.5,GrupoArma.ADAGA, "Esta faca afiada é usada por muitos habitantes adultos do Reinado, embora seja favorita de ladrões e assassinos, por ser facilmente escondida (fornece +2 em testes de Ladinagem para ocultá-la). Quando ataca com uma adaga, você pode usar seu modificador de Destreza em vez de Força nos testes de ataque. Uma adaga pode ser arremessada.", 1, 4, 19, 2, [TipoAtaque.CORPO_A_CORPO, TipoAtaque.ARREMESSO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES, [PropriedadeArma.AGIL], [], 1.5, undefined, 9);

    static readonly DESARMADO = new Arma("Desarmado", 0, 0, GrupoArma.NENHUM, "Você pode atacar com um soco, chute ou qualquer outro golpe que use seu próprio corpo como se fosse uma arma corpo a corpo. Um ataque desarmado causa dano não letal.", 1, 3, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1.5);

    static readonly ESPADA_CURTA = new Arma("Espada curta", 10, 1, GrupoArma.ESPADA, "O tipo mais comum de espada, usada por guardas ou como arma secundária de guerreiros mais capazes. Mede entre 40 e 50cm.", 1, 6, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1.5);

    static readonly FOICE = new Arma("Foice", 4, 1,GrupoArma.FERRAMENTA_AGRICOLA, "Originalmente um instrumento agrícola, consiste de uma lâmina curva presa a um cabo de madeira. Uma arma tradicional de druidas.", 1, 6, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1.5);

    static readonly MANOPLA = new Arma("Manopla", 5, 0, GrupoArma.NENHUM, "Luva metálica que permite socos mais perigosos — o dano de seus ataques desarmados torna-se letal. Manoplas superiores e mágicas aplicam os efeitos de suas modificações e encantos em ataques desarmados. Uma manopla não pode ser desarmada", 0, 0, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.LEVE, FacilidadeUso.SIMPLES, [], [], 1.5);

    // Armas Simples - Uma Mão
    static readonly CLAVA = new Arma("Clava", 0, 1.5, GrupoArma.CLAVA, "Um pedaço de madeira empunhado como arma, geralmente usado por bárbaros ou criaturas brutais — ou como arma improvisada, como um galho de árvore ou pedaço de mobília. Sendo fácil de conseguir, seu preço é zero", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.SIMPLES, [], [], 1.5);

    static readonly LANCA = new Arma("Lança", 2, 1.5, GrupoArma.LANCA, "Qualquer arma feita com uma haste de madeira e uma ponta afiada, natural ou metálica. Por sua facilidade de fabricação, é muito comum entre orcs, kobolds, trogloditas e outras raças menos civilizadas. Uma lança pode ser arremessada.", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO, TipoAtaque.ARREMESSO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.SIMPLES, [], [], 1.5, undefined, 9);

    static readonly MACA = new Arma("Maça", 12, 6, GrupoArma.MACA, "Bastão com um peso cheio de protuberâncias na ponta, a maça é usada por clérigos que fazem votos de não derramar sangue. De fato, um golpe de maça nem sempre derrama sangue, mas esmaga ossos.", 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.SIMPLES, [], [], 1.5);

    // Armas Simples - Duas Mãos
    static readonly BORDAO = new Arma("Bordão", 0, 2, GrupoArma.NENHUM, "Um cajado apreciado por viajantes e camponeses por sua praticidade e fácil acesso (seu preço é zero). O bordão é uma arma dupla.", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.DUAS_MAOS, FacilidadeUso.SIMPLES, [PropriedadeArma.DUPLA], [], 1.5);

    static readonly PIQUE = new Arma("Pique", 2, 5, GrupoArma.NENHUM, "Essencialmente uma lança muito longa. O pique é uma arma alongada.", 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.DUAS_MAOS, FacilidadeUso.SIMPLES, [PropriedadeArma.ALONGADA], [], 3);

    static readonly TACAPE = new Arma("Tacape", GrupoArma.NENHUM, 0, 4, "Versão maior e/ou com pregos de uma clava. Não é uma arma elegante, mas faz o serviço.", 1, 10, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.DUAS_MAOS, FacilidadeUso.SIMPLES, [], [], 1.5);

    // Armas Simples - Ataque à Distância
    static readonly ARCO_CURTO = new Arma("Arco curto", 30, 1, GrupoArma.ARCO, "Uma arma antiga e comum, este arco é usado primariamente como ferramenta de caça, embora seja usado como arma de guerra por milícias, bandidos e exércitos menos equipados. Exige as duas mãos, mas pode ser usado montado.", 1, 6, 20, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [PropriedadeArma.MONTADA], [], 30, CatalogoMunicao.FLECHA);

    static readonly BESTA_LEVE = new Arma("Besta leve", 35, 3, GrupoArma.BESTA, "Um arco montado sobre uma coronha de madeira com um gatilho, a besta leve é uma arma que dispara virotes com grande potência. Recarregar uma besta leve é uma ação de movimento. Exige as duas mãos.", 1, 8, 19, 2, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], [], 30, CatalogoMunicao.VIROTES);

    static readonly AZAGAIA = new Arma("Azagaia", 1, 1, GrupoArma.ATIRAR, "Uma lança leve e flexível, própria para arremesso. Pode ser usada como arma corpo a corpo, mas você sofre uma penalidade de –5 no teste de ataque.", 1, 6, 20, 2, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], [], 30, CatalogoMunicao.BALAS);

    static readonly FUNDA = new Arma("Funda", 0, 0.25, GrupoArma.ATIRAR, "Uma simples tira de couro usada para arremessar balas de metal. Na falta de munição adequada, pode disparar pedras comuns, mas o dano é reduzido em um passo. Recarregar uma funda é uma ação de movimento. Ao contrário de outras armas de disparo, você aplica seu modificador de Força a rolagens de dano com uma funda.", 1, 4, 20, 2, [TipoAtaque.DISTANCIA], TipoDano.IMPACTO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], [], 30, CatalogoMunicao.BALAS);

    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */

    // Armas Marciais
    // Armas Marciais - Leves
    static readonly ESCUDO_LEVE = new Arma("Escudo leve", 5, 3, GrupoArma.NENHUM, "Você pode usar um escudo como uma arma marcial, mas perde seu bônus na Defesa até o próximo turno.", 1, 4, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.LEVE, FacilidadeUso.ESCUDO, [], [], 1.5);

    static readonly MACHADINHA = new Arma("Machadinha", 6, 2, GrupoArma.MACHADO, "Ferramenta útil para cortar madeira e também inimigos. Uma machadinha pode ser arremessada.", 1, 6, 20, 3, [TipoAtaque.CORPO_A_CORPO, TipoAtaque.ARREMESSO], TipoDano.CORTE, Categoria.LEVE, FacilidadeUso.MARCIAIS, [], [], 1.5, undefined, 9);

    // Armas Marciais - Uma Mão
    static readonly CIMITARRA = new Arma("Cimitarra", 15, 2, GrupoArma.ESPADA, "Espada com a lâmina curva e muito afiada. A cimitarra é uma arma ágil.", 1, 6, 18, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [PropriedadeArma.AGIL], [], 1.5);

    static readonly ESCUDO_PESADO = new Arma("Escudo pesado", 15, 7, GrupoArma.NENHUM, "Você pode usar um escudo como uma arma marcial, mas perde seu bônus na Defesa até o próximo turno.", 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.ESCUDO, [], [], 1.5);

    static readonly ESPADA_LONGA = new Arma("Espada longa", 15, 2, GrupoArma.ESPADA, "Arma típica de soldados e guerreiros, esta espada de dois gumes tem lâmina reta medindo entre 80cm e 1m.", 1, 8, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly FLORETE = new Arma("Florete", 20, 1, GrupoArma.ESPADA, "A lâmina leve e fina desta espada torna a arma muito precisa. O florete é uma arma ágil.", 1, 6, 18, 1, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [PropriedadeArma.AGIL], [], 1.5);

    static readonly MACHADO_DE_BATALHA = new Arma("Machado de batalha", 10, 3, GrupoArma.MACHADO, "Adaptado do machado de lenhador, este não é um instrumento para corte de árvores, mas sim uma arma capaz de causar ferimentos terríveis.", 1, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly MANGUAL = new Arma("Mangual", 8, 2.5, GrupoArma.NENHUM, "Uma haste metálica ligada a uma corrente com uma esfera de aço na ponta, que pode se enroscar na arma do adversário. O mangual é uma arma versátil, fornecendo +2 em testes para desarmar.", 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [PropriedadeArma.DESARMAR], [], 1.5);

    static readonly MARTELO_DE_GUERRA = new Arma("Martelo de guerra", 12, 2.5, GrupoArma.MARTELO, "Outra ferramenta adaptada para combate, esta é a arma favorita de quase todos os anões que não usam machados.", 1, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly PICARETA = new Arma("Picareta", 8, 3, GrupoArma.PICARETA, "Usada por mineradores, esta ferramenta quebra pedras com facilidade. Imagine o que pode fazer com carne e osso!", 1, 6, 20, 4, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly TRIDENTE = new Arma("Tridente", 15, 2, GrupoArma.NENHUM, "Uma lança com três pontas, favorita de povos marinhos e gladiadores e própria para prender as pernas do oponente. O tridente é uma arma versátil, fornecendo +2 em testes para derrubar.", 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS, [PropriedadeArma.DERRUBAR], [], 1.5);

    // Armas Marciais - Duas Mãos
    static readonly ALABARDA = new Arma("Alabarda", 10, 6, GrupoArma.NENHUM, "Uma haste de madeira com 2m de comprimento e uma lâmina de machado na ponta. A alabarda é uma arma alongada.", 1, 10, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS, [PropriedadeArma.ALONGADA], [], 3);

    static readonly ALFANGE = new Arma("Alfange", 75, 4, GrupoArma.ESPADA, "Uma versão maior da cimitarra, esta espada de lâmina larga e curva é bastante usada por guerreiros do Deserto da Perdição.", 2, 4, 18, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly GADANHO = new Arma("Gadanho", 18, 5, GrupoArma.FERRAMENTA_AGRICOLA, "Outra ferramenta agrícola, o gadanho é uma versão maior da foice, para uso com as duas mãos. Foi criada para ceifar cereais, mas também pode ceifar vidas.", 2, 4, 20, 4, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly LANCA_MONTADA = new Arma("Lança montada", 10, 5, GrupoArma.LANCA, "A lança montada é uma arma alongada. Se você estiver montado, pode usá-la com apenas uma mão. Além disso, quando usada numa investida montada, causa +2d8 pontos de dano (não multiplicados em caso de acerto crítico).", 1, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS, [PropriedadeArma.ALONGADA, PropriedadeArma.MONTADA], [], 3);

    static readonly MACHADO_DE_GUERRA = new Arma("Machado de guerra", 20, 6, GrupoArma.MACHADO, "Este imenso machado com lâmina dupla é uma das armas mais perigosas que existem.", 1, 12, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS, [], [], 1.5);

    static readonly MONTANTE = new Arma("Montante", 50, 4, GrupoArma.ESPADA, "Enorme e pesada, esta espada de 1,5m de comprimento é uma arma poderosa.", 2, 6, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS, [], [], 1.5);

    // Armas Marciais - Ataque à Distância
    static readonly ARCO_LONGO = new Arma("Arco longo", 100, 1.5, GrupoArma.ARCO, "Este arco reforçado tem a altura de uma pessoa. Ao contrário da versão curta, é primariamente uma arma de guerra. Por ter uma puxada pesada, permite que você aplique seu modificador de Força às rolagens de dano. Exige as duas mãos e não pode ser usado se você estiver montado.", 1, 8, 20, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.MARCIAIS, [], [], 30, CatalogoMunicao.FLECHA);

    static readonly BESTA_PESADA = new Arma("Besta pesada", 50, 4, GrupoArma.BESTA, "Versão maior e mais potente da besta leve. Recarregar uma besta pesada é uma ação padrão. Exige as duas mãos.", 1, 12, 19, 2, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.MARCIAIS, [], [], 30, CatalogoMunicao.VIROTES);

    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */

    // Armas Exóticas
    // Armas Exóticas - Leves

    // Armas Exóticas - Uma Mão
    static readonly CHICOTE = new Arma("Chicote", 2, 1, GrupoArma.NENHUM, "Esta arma pode ser usada para atacar inimigos a até 4,5m e pode se enroscar nas mãos, pernas ou armas de seus adversários. O chicote é uma arma ágil e versátil, fornecendo +2 em testes para derrubar ou desarmar.", 1, 3, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS, [PropriedadeArma.AGIL], [], 4.5);

    static readonly ESPADA_BASTARDA = new Arma("Espada bastarda", 35, 3, GrupoArma.ESPADA, "Maior e mais pesada que a espada longa, esta arma é tradicionalmente usada pelos cavaleiros de Bielefeld. A espada bastarda é uma arma adaptável. É muito grande para ser usada com uma só mão sem treinamento especial; por isso é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos.", 1, 10, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS, [PropriedadeArma.ADAPTAVEL], [], 1.5);

    static readonly KATANA = new Arma("Katana", 100, 2.5, GrupoArma.ESPADA, "A espada tradicional do samurai tem lâmina levemente curva e apenas um gume. A katana é uma arma adaptável e ágil. É muito grande para ser empunhada com uma só mão sem treinamento especial; por isso, é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos.", 1, 8, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS, [PropriedadeArma.AGIL, PropriedadeArma.ADAPTAVEL], [], 1.5);

    static readonly MACHADO_ANAO = new Arma("Machado anão", 30, 4, GrupoArma.MACHADO, "A arma preferida por onze entre dez guerreiros anões. Um machado anão é muito grande para ser usado com uma só mão sem treinamento especial; por isso é uma arma exótica. Ele pode ser usado como uma arma marcial de duas mãos.", 1, 10, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS, [], [], 1.5);

    // Armas Exóticas - Duas Mãos
    static readonly CORRENTE_DE_ESPINHOS = new Arma("Corrente de espinhos", 25, 5, GrupoArma.NENHUM, "Esta arma pode ser usada para atacar inimigos a até 4,5m e pode se enroscar nas mãos, pernas ou armas de seus adversários. A corrente de espinhos é uma arma ágil, dupla e versátil, fornecendo +2 em testes para derrubar ou desarmar.", 2, 4, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.EXOTICAS, [PropriedadeArma.AGIL, PropriedadeArma.DUPLA], [], 4.5);

    static readonly MACHADO_TAURICO = new Arma("Machado táurico", 50, 12, GrupoArma.MACHADO, " Uma haste comprida com uma lâmina extremamente grossa na ponta, esta é uma arma ancestral dos minotauros. Um machado táurico é muito grande para ser usado sem treinamento especial; por isso, é uma arma exótica. Além disso, por ser pesado e desbalanceado, impõe –2 em testes de ataque.", 2, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.EXOTICAS, [PropriedadeArma.DESBALANCEADA], [], 1.5);

    // Armas Exóticas - Ataque à Distância
    static readonly REDE = new Arma("Rede", 20, 3, GrupoArma.NENHUM, "A rede tem pequenos dentes em sua trama e uma corda para controlar os inimigos presos. Se você acertar um ataque com a rede, não causa dano. Em vez disso, a vítima fica enredada (deslocamento reduzido à metade, não pode correr nem fazer investidas e sofre –2 em Defesa e testes de ataque).\nEnquanto você estiver segurando a corda, sempre que a vítima se mover você pode fazer um teste de Força oposto contra ela como uma reação. Se você vencer, a vítima só pode se mover até o limite da corda (alcance curto).\nA vítima pode se soltar com uma ação completa e um teste de Acrobacia (CD 20). A rede tem 5 pontos de vida e, se rasgar, qualquer criatura enredada se solta automaticamente. A rede só pode ser usada contra criaturas no máximo uma categoria de tamanho maior que você.", 0, 0, 20, 2, [TipoAtaque.ARREMESSO], TipoDano.IMPACTO, Categoria.DISPARO, FacilidadeUso.EXOTICAS, [PropriedadeArma.ENREDA], [], 0, undefined, 9);

    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */

    // Armas de Fogo
    static readonly MOSQUETE = new Arma("Mosquete", 500, 4, GrupoArma.DE_FOGO, "Uma arma de fogo de uso difícil, mas com poder devastador. Recarregar um mosquete é uma ação padrão. Exige as duas mãos.", 2, 8, 19, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.DE_FOGO, [], [], 30, CatalogoMunicao.MUNICAO);

    static readonly PISTOLA = new Arma("Pistola", 250, 1, GrupoArma.DE_FOGO, "A arma de fogo mais comum. Uma pistola conta como uma arma leve para propósitos do poder Estilo de Duas Armas e similares. Recarregar uma pistola é uma ação padrão.", 2, 8, 19, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.DE_FOGO, [], [], 9, CatalogoMunicao.MUNICAO);
}
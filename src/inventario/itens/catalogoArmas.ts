import { Arma, TipoAtaque, Categoria, FacilidadeUso, Municao } from "./arma.ts";
import { TipoDano } from "../../combate/tipoDano.ts";

export class CatalogoArmas {
    // Especial
    static readonly CHIFRE = new Arma("Chifre", 0, 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES);
    static readonly MORDIDA = new Arma("Mordida", 0, 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES);

    // Armas Simples
    // Armas Simples - Leves
    static readonly ADAGA = new Arma("Adaga", 0.5, 1, 4, 19, 2, [TipoAtaque.CORPO_A_CORPO, TipoAtaque.ARREMESSO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES, [], undefined, 9);
    static readonly DESARMADO = new Arma("", 0, 1, 3, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.LEVE, FacilidadeUso.SIMPLES);
    static readonly ESPADA_CURTA = new Arma("Espada curta", 1, 1, 6, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.LEVE, FacilidadeUso.SIMPLES);
    static readonly FOICE = new Arma("Foice", 1, 1, 6, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.LEVE, FacilidadeUso.SIMPLES);
    static readonly MANOPLA = new Arma("Manopla", 0, 0, 0, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.LEVE, FacilidadeUso.SIMPLES);

    // Armas Simples - Uma Mão
    static readonly CLAVA = new Arma("Clava", 1.5, 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.SIMPLES);
    static readonly LANCA = new Arma("Lança", 1.5, 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO, TipoAtaque.ARREMESSO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.SIMPLES, [], undefined, 9);
    static readonly MACA = new Arma("Maça", 6, 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.SIMPLES);

    // Armas Simples - Duas Mãos
    static readonly BORDAO = new Arma("Bordão", 2, 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.DUAS_MAOS, FacilidadeUso.SIMPLES);
    static readonly PIQUE = new Arma("Pique", 5, 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.DUAS_MAOS, FacilidadeUso.SIMPLES);
    static readonly TACAPE = new Arma("Tacape", 4, 1, 10, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.DUAS_MAOS, FacilidadeUso.SIMPLES);

    // Armas Simples - Ataque à Distância
    static readonly ARCO_CURTO = new Arma("Arco curto", 1, 1, 6, 20, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], Municao.FLECHA, 30);
    static readonly BESTA_LEVE = new Arma("Besta leve", 3, 1, 8, 19, 2, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], Municao.VIROTE, 30);
    static readonly AZAGAIA = new Arma("Azagaia", 1, 1, 6, 20, 2, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], Municao.BALA, 30);
    static readonly FUNDA = new Arma("Funda", 0.25, 1, 4, 20, 2, [TipoAtaque.DISTANCIA], TipoDano.IMPACTO, Categoria.DISPARO, FacilidadeUso.SIMPLES, [], Municao.BALA, 30);

    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */

    // Armas Marciais
    // Armas Marciais - Leves
    static readonly ESCUDO_LEVE = new Arma("Escudo leve", 3, 1, 4, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.LEVE, FacilidadeUso.MARCIAIS);
    static readonly MACHADINHA = new Arma("Machadinha", 2, 1, 6, 20, 3, [TipoAtaque.CORPO_A_CORPO, TipoAtaque.ARREMESSO], TipoDano.CORTE, Categoria.LEVE, FacilidadeUso.MARCIAIS, [], undefined, 9);

    // Armas Marciais - Uma Mão
    static readonly CIMITARRA = new Arma("Cimitarra", 2, 1, 6, 18, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly ESCUDO_PESADO = new Arma("Escudo pesado", 7, 1, 6, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly ESPADA_LONGA = new Arma("Espada longa", 2, 1, 8, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly FLORETE = new Arma("Florete", 1, 1, 6, 18, 1, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly MACHADO_DE_BATALHA = new Arma("Machado de batalha", 3, 1, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly MANGUAL = new Arma("Mangual", 2.5, 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly MARTELO_DE_GUERRA = new Arma("Martelo de guerra", 2.5, 1, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.IMPACTO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly PICARETA = new Arma("Picareta", 3, 1, 6, 20, 4, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);
    static readonly TRIDENTE = new Arma("Tridente", 2, 1, 8, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.UMA_MAO, FacilidadeUso.MARCIAIS);

    // Armas Marciais - Duas Mãos
    static readonly ALABARDA = new Arma("Alabarda", 6, 1, 10, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS);
    static readonly ALFANGE = new Arma("Alfange", 4, 2, 4, 18, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS);
    static readonly GADANHO = new Arma("Gadanho", 5, 2, 4, 20, 4, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS);
    static readonly LANCA_MONTADA = new Arma("Lança montada", 5, 1, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.PERFURACAO, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS);
    static readonly MACHADO_DE_GUERRA = new Arma("Machado de guerra", 6, 1, 12, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS);
    static readonly MONTANTE = new Arma("Montante", 4, 2, 6, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.MARCIAIS);

    // Armas Marciais - Ataque à Distância
    static readonly ARCO_LONGO = new Arma("Arco longo", 1.5, 1, 8, 20, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.MARCIAIS, [], Municao.FLECHA, 30);
    static readonly BESTA_PESADA = new Arma("Besta pesada", 4, 1, 12, 19, 2, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.MARCIAIS, [], Municao.VIROTE, 30);

    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */

    // Armas Exóticas
    // Armas Exóticas - Leves

    // Armas Exóticas - Uma Mão
    static readonly CHICOTE = new Arma("Chicote", 1, 1, 3, 20, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS);
    static readonly ESPADA_BASTARDA = new Arma("Espada bastarda", 3, 1, 10, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS);
    static readonly KATANA = new Arma("Katana", 2.5, 1, 8, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS);
    static readonly MACHADO_ANAO = new Arma("Machado anão", 4, 1, 10, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.UMA_MAO, FacilidadeUso.EXOTICAS);

    // Armas Exóticas - Duas Mãos
    static readonly CORRENTE_DE_ESPINHOS = new Arma("Corrente de espinhos", 5, 2, 4, 19, 2, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.EXOTICAS);
    static readonly MACHADO_TAURICO = new Arma("Machado táurico", 12, 2, 8, 20, 3, [TipoAtaque.CORPO_A_CORPO], TipoDano.CORTE, Categoria.DUAS_MAOS, FacilidadeUso.EXOTICAS);

    // Armas Exóticas - Ataque à Distância
    static readonly REDE = new Arma("Rede", 3, 0, 0, 20, 2, [TipoAtaque.ARREMESSO], TipoDano.IMPACTO, Categoria.DISPARO, FacilidadeUso.EXOTICAS, [], undefined, 9);

    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */
    /* ------------------------------------------------------------ */

    // Armas de Fogo
    static readonly MOSQUETE = new Arma("Mosquete", 4, 2, 8, 19, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.DE_FOGO, [], Municao.BALA, 30);
    static readonly PISTOLA = new Arma("Pistola", 1, 2, 8, 19, 3, [TipoAtaque.DISTANCIA], TipoDano.PERFURACAO, Categoria.DISPARO, FacilidadeUso.DE_FOGO, [], Municao.BALA, 9);
}
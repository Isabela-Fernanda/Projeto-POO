import { Armadura, CategoriaArmadura, TipoProtecao } from "./armadura.ts";

export class CatalogoArmaduras {
    // Armaduras Leves
    static readonly ARMADURA_ACOLCHOADA = new Armadura("Armadura Acolchoada", 5, 1, CategoriaArmadura.LEVE, TipoProtecao.ARMADURA, 0);
    static readonly ARMADURA_DE_COURO = new Armadura("Armadura de Couro", 7, 2, CategoriaArmadura.LEVE, TipoProtecao.ARMADURA, 0);
    static readonly COURO_BATIDO = new Armadura("Couro Batido", 10, 3, CategoriaArmadura.LEVE, TipoProtecao.ARMADURA, -1);
    static readonly GIBAO_DE_PELES = new Armadura("Gibão de Peles", 12, 4, CategoriaArmadura.LEVE, TipoProtecao.ARMADURA, -3);
    static readonly COURACA = new Armadura("Couraça", 15, 5, CategoriaArmadura.LEVE, TipoProtecao.ARMADURA, -4);

    // Armaduras Pesadas
    static readonly BRUNEA = new Armadura("Brunea", 15, 5, CategoriaArmadura.PESADA, TipoProtecao.ARMADURA, -2);
    static readonly COTA_DE_MALHA = new Armadura("Cota de Malha", 20, 6, CategoriaArmadura.PESADA, TipoProtecao.ARMADURA, -2);
    static readonly LORIGA_SEGMENTADA = new Armadura("Loriga Segmentada", 17, 7, CategoriaArmadura.PESADA, TipoProtecao.ARMADURA, -3);
    static readonly MEIA_ARMADURA = new Armadura("Meia Armadura", 22, 8, CategoriaArmadura.PESADA, TipoProtecao.ARMADURA, -4);
    static readonly ARMADURA_COMPLETA = new Armadura("Armadura Completa", 25, 10, CategoriaArmadura.PESADA, TipoProtecao.ARMADURA, -5);

    // Escudos
    static readonly ESCUDO_LEVE = new Armadura("Escudo Leve", 3, 1, CategoriaArmadura.LEVE, TipoProtecao.ESCUDO, -1);
    static readonly ESCUDO_PESADO = new Armadura("Escudo Pesado", 7, 2, CategoriaArmadura.PESADA, TipoProtecao.ESCUDO, -2);
}
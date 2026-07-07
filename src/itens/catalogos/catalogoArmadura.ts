import { FacilidadeUso } from "../../inventario/equipamento.js";
import { Armadura, CategoriaArmadura, TipoProtecao } from "../armadura.js";

export class CatalogoArmaduras {
    // Armaduras Leves
    static readonly ARMADURA_ACOLCHOADA = new Armadura("Armadura Acolchoada", 5, 5, "Uma túnica almofadada feita em linho ou lã. É a armadura mais leve, mas protege todo o corpo, fornecendo +2 em testes de Fortitude.", 1, CategoriaArmadura.LEVE, FacilidadeUso.ARMADURA_LEVE, TipoProtecao.ARMADURA, 0);

    static readonly ARMADURA_DE_COURO = new Armadura("Armadura de Couro", 20, 7, "O peitoral desta armadura é feito de couro curtido em óleo fervente, para ficar mais rígido, enquanto as demais partes são feitas de couro flexível.", 2, CategoriaArmadura.LEVE, FacilidadeUso.ARMADURA_LEVE, TipoProtecao.ARMADURA, 0);

    static readonly COURO_BATIDO = new Armadura("Couro Batido", 35, 10, "Versão mais pesada da armadura de couro, reforçada com rebites de metal.", 3, CategoriaArmadura.LEVE, FacilidadeUso.ARMADURA_LEVE, TipoProtecao.ARMADURA, -1);

    static readonly GIBAO_DE_PELES = new Armadura("Gibão de Peles", 25, 12, "Usada principalmente por bárbaros e selvagens, esta armadura é formada por várias camadas de peles e couro de animais.", 4, CategoriaArmadura.LEVE, FacilidadeUso.ARMADURA_LEVE, TipoProtecao.ARMADURA, -3);

    static readonly COURACA = new Armadura("Couraça", 500, 15, "A mais robusta das armaduras leves, formada por uma placa metálica que protege o peito e as costas, presa sobre um casaco de couro.", 5, CategoriaArmadura.LEVE, FacilidadeUso.ARMADURA_LEVE, TipoProtecao.ARMADURA, -4);

    // Armaduras Pesadas
    static readonly BRUNEA = new Armadura("Brunea", 50, 15, "Colete de couro coberto com plaquetas de metal sobrepostas, como escamas de um peixe. Por ser barata de produzir, é a armadura mais utilizada no Reinado por soldados de infantaria e guardas de castelo.", 5, CategoriaArmadura.PESADA, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ARMADURA, -2);

    static readonly COTA_DE_MALHA = new Armadura("Cota de Malha", 150, 20, "Longa veste de anéis metálicos interligados, formando uma malha flexível e resistente, que vai até os joelhos.", 6, CategoriaArmadura.PESADA, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ARMADURA, -2);

    static readonly LORIGA_SEGMENTADA = new Armadura("Loriga Segmentada", 250, 17, "Composta por tiras horizontais de metal, esta armadura pesada é muito utilizada por legionários do Império de Tauron.", 7, CategoriaArmadura.PESADA, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ARMADURA, -3);

    static readonly MEIA_ARMADURA = new Armadura("Meia Armadura", 600, 22, "Uma cota de malha reforçada com placas de metal.", 8, CategoriaArmadura.PESADA, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ARMADURA, -4);

    static readonly ARMADURA_COMPLETA = new Armadura("Armadura Completa", 3000, 25, "A mais forte e pesada das armaduras, formada por placas de metal forjadas e encaixadas de modo a cobrir o corpo inteiro. Inclui manoplas e grevas (luvas e botas metálicas, respectivamente), um elmo com viseira e uma túnica acolchoada para ser usada sob as placas. Correias e fivelas distribuem o peso da armadura pelo corpo inteiro.\nEsta armadura precisa ser feita sob medida para cada usuário; um ferreiro cobra T$ 200 para adaptar uma armadura completa a um novo usuário.", 10, CategoriaArmadura.PESADA, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ARMADURA, -5);

    // Escudos
    static readonly ESCUDO_LEVE = new Armadura("Escudo Leve", 5, 3, "Tipicamente feito de madeira, este escudo é amarrado no antebraço, deixando a mão livre. O usuário pode carregar um objeto na mão do escudo, mas não manusear uma arma.", 1, CategoriaArmadura.LEVE, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ESCUDO, -1);

    static readonly ESCUDO_PESADO = new Armadura("Escudo Pesado", 15, 7, "Normalmente feito de aço, este escudo é preso ao antebraço e também deve ser empunhado com firmeza, impedindo o usuário de usar aquela mão.", 2, CategoriaArmadura.PESADA, FacilidadeUso.ARMADURA_PESADA, TipoProtecao.ESCUDO, -2);
}
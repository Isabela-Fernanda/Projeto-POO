import { GrupoArma } from "./arma.ts";
import { Municao } from "./municao.ts";

export class CatalogoMunicao {
    static readonly FLECHA= new Municao("Flechas", 1/20, 15/200, "Hastes de madeira com ponta metálica e penas para estabilizar o voo, flechas são vendidas em aljavas com 20 unidades. Recarregar um arco com uma flecha é uma ação livre.", GrupoArma.ARCO, []);

    static readonly VIROTES = new Municao("Virotes", 2, 1, "Pequenas setas de madeira que servem como munição para bestas. Uma caixa com 20 virotes custa T$ 2.", GrupoArma.BESTA);

    static readonly BALAS = new Municao("Balas", 0.5, 2, "Fundas atiram pequenas balas esféricas de metal, que são vendidas em sacos de couro contendo 20 balas por 1 tibar de cobre. Recar regar uma funda com uma bala é uma ação de movimento.", GrupoArma.NENHUM);

    static readonly MUNICAO = new Municao("Munição", 20, 2, "Inclui uma bolsa com 20 balas (pequenas esferas de chumbo) e pólvora para 20 tiros de mosquete ou pistola.", GrupoArma.DE_FOGO);
}
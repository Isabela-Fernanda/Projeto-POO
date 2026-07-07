import { Personagem } from "../../../personagens/personagem.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.js";

import { Inventario } from "../../../inventario/inventario.js";
import { EfeitoEscuridaoArcana } from "../../efeitos/efeitoEscuridao.js";
import { MenuInventario } from "@inventario/menuInventario.js";

export class MagiaEscuridaoArcana extends Magia {
    constructor() {
        super("Escuridão Arcana", "O alvo emana sombras em uma área com 6m de raio. Criaturas dentro da área recebem camuflagem por escuridão. As sombras não podem ser iluminadas por nenhuma fonte de luz natural. O objeto pode ser guardado (em um bolso, por exemplo) para interromper a escuridão, que voltará a funcionar caso o objeto seja revelado. Se lançar a magia num objeto de uma criatura involuntária, ela tem direito a um teste de Vontade para anulá-la. Escuridão anula Luz.", 1, "Cria uma área de sombras mágicas", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.OBJETO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        while (true) {
            console.log("1 - Lançar magia em um objeto do inventario.");
            console.log("2 - Lançar magia em uma criatura.");
            const escolha = prompt("Escolha:");

            if (escolha === "1") {
                const objeto = MenuInventario.escolherObjetoInventario(usuario);;

                objeto.item.adicionarEfeito(new EfeitoEscuridaoArcana());

                console.log(`${objeto.item.getNome()} passa a emitir luz em um raio de 6m.`);
                break;
            }

            if (escolha === "2") {
                //Implementar depois
                break;
            }

            console.log("Escolha invalida! Tente novamente.");

        }
    }
}

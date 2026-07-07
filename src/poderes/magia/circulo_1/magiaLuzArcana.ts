import { Personagem } from "../../../personagens/personagem.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.js";

import { EfeitoLuzArcana } from "../../efeitos/efeitoLuzArcana.js";
import { Inventario } from "../../../inventario/inventario.js";
import { MenuInventario } from "@inventario/menuInventario.js";

export class MagiaLuzArcana extends Magia {
    constructor() {
        super("Luz", "O alvo emite luz (mas não produz calor) em uma área com 6m de raio. O objeto pode ser guardado (em um bolso, por exemplo) para interromper a luz, que voltará a funcionar caso o objeto seja revelado. Se lançar a magia num objeto de uma criatura involuntária, ela tem direito a um teste de Vontade para anulá-la. Luz anula Escuridão.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.EVOCACAO, TipoAcao.PADRAO, TipoAlvo.OBJETO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        while (true) {
            console.log("1 - Lançar magia em um objeto do inventario.");
            console.log("2 - Lançar magia em uma criatura.");
            const escolha = prompt("Escolha:");

            if (escolha === "1") {
                const objeto = MenuInventario.escolherObjetoInventario(usuario);

                objeto.item.adicionarEfeito(new EfeitoLuzArcana());

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
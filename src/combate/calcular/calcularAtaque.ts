import { Dado } from "../dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { TipoAtaque } from "../../inventario/itens/arma.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

export class CalcularAtaque {
    static calcular(atacante: Personagem): {
        rolagem: number;
        total: number;
    } {
        const arma = atacante.getEquipamento().getArma();

        const rolagem = Dado.d20();

        let modificador = 0;

        if (arma?.usaDestrezaNoAtaque()) {
            modificador = atacante.getModificadorAtributo(TipoAtributo.DESTREZA);
        }
        else {
            modificador = atacante.getModificadorAtributo(TipoAtributo.FORCA);
        }

        const bonusAtaqueArma = (arma?.getBonusAtaque() ?? 0);

        const bonusEfeito = atacante.somarBonusEfeitos(e => e.getBonusAtaque())

        const total = rolagem + modificador + bonusAtaqueArma + bonusEfeito;

        return {
            rolagem,
            total
        }
    }
}
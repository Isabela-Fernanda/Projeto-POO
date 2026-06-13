import { Dado } from "../dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";
import { TipoAtaque } from "../../inventario/itens/arma.ts";

export class CalcularDano {
    static calcularDano(atacante: Personagem, critico: boolean = false): number {
        let dano = 0;
        const bonusEfeito = atacante.somarBonusEfeitos(e => e.getBonusDano());

        const arma = atacante.getEquipamento().getArma();

        if(!arma){
            return Math.max(1, 1 + atacante.getModificadorAtributo(TipoAtributo.FORCA)) + bonusEfeito;
        }

        dano = Dado.rolarVarios(arma.getQuantidadeDados(), arma.getFacesDado());

        if(critico) {
            dano *= arma.getMultiplicadorCritico();
        }

        if(arma.usaDestrezaNoAtaque()){
            dano += arma.getBonusDano();
        } else {
            dano += arma.getBonusDano() + atacante.getModificadorAtributo(TipoAtributo.FORCA);
        }

        dano += bonusEfeito;

        return Math.max(1, dano);
    }
}
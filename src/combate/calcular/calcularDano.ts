import { Dado } from "../dado.js";
import { Personagem } from "../../personagens/personagem.js";
import { TipoAtributo } from "../../personagens/atributos/atributos.js";
import { Arma } from "../../itens/arma.js";
import { ModoAtaque } from "../testes/testeAtaque.js";

export class CalcularDano {
    static calcularDano(atacante: Personagem, arma: Arma, modoAtaque: ModoAtaque, critico: boolean = false): number {
        let dano = 0;
        let bonusEfeito = 0;

        for (const efeito of atacante.getEfeitos()) {
            bonusEfeito += efeito.getBonusDano();
        }

        let bonusAtributo = 0;

        switch (modoAtaque) {
            case ModoAtaque.CORPO_A_CORPO:
                bonusAtributo = atacante.getModificadorAtributo(TipoAtributo.FORCA);
                break;
            case ModoAtaque.ARREMESSO:
                bonusAtributo = atacante.getModificadorAtributo(TipoAtributo.FORCA);
                break;
            case ModoAtaque.DISTANCIA:
                bonusAtributo = 0;
                break;
        }

        dano = Dado.rolarVarios(arma.getQuantidadeDados(), arma.getFacesDado());

        if (critico) {
            dano *= arma.getMultiplicadorCritico();
        }

        dano += arma.getBonusDano() + bonusAtributo + bonusEfeito;

        dano += atacante.getBonusDanoHabilidades();

        return Math.max(1, dano);
    }
}
import { Dado } from "../dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Arma, TipoAtaque } from "../../inventario/itens/arma.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";
import { ModoAtaque } from "../testes/testeAtaque.ts";

export class CalcularAtaque {
    static calcular(atacante: Personagem, arma: Arma, modoAtaque: ModoAtaque): {
        rolagem: number;
        total: number;
    } {
        const rolagem = Dado.d20();

        let penalidadeProficiencia = 0;

        if (!atacante.possuiProficiencia(arma.getFacilidade())) {
            penalidadeProficiencia = -5;
        }

        let modificador = 0;

        switch (modoAtaque) {
            case ModoAtaque.CORPO_A_CORPO:
                modificador = arma.ehAgil() ? atacante.getModificadorAtributo(TipoAtributo.DESTREZA) : atacante.getModificadorAtributo(TipoAtributo.FORCA);
                break;
            case ModoAtaque.ARREMESSO:
                modificador = atacante.getModificadorAtributo(TipoAtributo.FORCA);
                break;
            case ModoAtaque.DISTANCIA:
                modificador = atacante.getModificadorAtributo(TipoAtributo.DESTREZA);
                break;
        }

        let bonusEfeito = 0
        for (const efeito of atacante.getEfeitos()) {
            bonusEfeito += efeito.getBonusAtaque();
        }

        const total = rolagem + modificador + arma.getBonusAtaque() + bonusEfeito + penalidadeProficiencia;

        return {
            rolagem,
            total
        }
    }
}
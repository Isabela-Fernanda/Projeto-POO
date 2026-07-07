import { Dado } from "../dado.js";
import { Personagem } from "../../personagens/personagem.js";
import { Arma, Categoria } from "../../itens/arma.js";
import { TipoAtributo } from "../../personagens/atributos/atributos.js";
import { ModoAtaque } from "../testes/testeAtaque.js";
import { Tags } from "../../poderes/tags.js";

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
                modificador = arma.ehAgil() || (arma.getCategoria() === Categoria.LEVE && atacante.possuiHabilidade("Acuidade com Arma") && atacante.getAtributo(TipoAtributo.DESTREZA) >= 13) ? atacante.getModificadorAtributo(TipoAtributo.DESTREZA) : atacante.getModificadorAtributo(TipoAtributo.FORCA);
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

        if (atacante.possuiTag(Tags.TRADICAO_HEREDRIMM) && arma.ehTradicionalAna()) {
            bonusEfeito += 2;
        }

        const total = rolagem + modificador + arma.getBonusAtaque() + bonusEfeito + atacante.getBonusAtaqueHabilidades() + atacante.getBonusAtaqueArma(arma) + penalidadeProficiencia;

        return {
            rolagem,
            total
        }
    }
}
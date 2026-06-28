import { Dado } from "../dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Arma, Categoria } from "../../itens/arma.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";
import { ModoAtaque } from "../testes/testeAtaque.ts";
import { Tags } from "../../poderes/tags.ts";

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
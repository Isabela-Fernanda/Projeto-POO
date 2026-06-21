import { Dado } from "../dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";
import { Arma } from "../../inventario/itens/arma.ts";
import { ModoAtaque } from "../testes/testeAtaque.ts";

import { EspecializacaoEmArma } from "../../poderes/habilidadesGerais/especializacaoEmArma.ts";

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

        const especializacao = atacante.getHabilidades().find(h => h instanceof EspecializacaoEmArma) as EspecializacaoEmArma | undefined;

        if (especializacao && especializacao.getArmaEscolhida() === arma.getNome()) {
            dano += 2;
        }

        return Math.max(1, dano);
    }
}
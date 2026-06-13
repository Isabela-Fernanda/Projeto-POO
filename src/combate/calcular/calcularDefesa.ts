import { TipoAtributo } from "../../personagens/atributos/atributos.ts";
import { Personagem } from "../../personagens/personagem.ts";

export class CalculadoraDefesa {
    static calcular(personagem: Personagem): number {
        const bonusEfeito = personagem.somarBonusEfeitos(e => e.getBonusDefesa());
        
        let defesa = 10 + personagem.getModificadorAtributo(TipoAtributo.DESTREZA) + bonusEfeito;

        const equipamento = personagem.getEquipamento();

        const armadura = equipamento.getArmadura();

        const escudo = equipamento.getEscudo();

        if (armadura) {
            defesa += armadura.getBonusDefesa();
        }

        if(escudo) {
            defesa += escudo.getBonusDefesa();
        }

        return defesa;

    }

}
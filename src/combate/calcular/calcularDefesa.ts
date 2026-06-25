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
            
            if(!personagem.possuiProficiencia(armadura.getFacilidade())){
                defesa -= 5;
            }

            if(personagem.possuiHabilidade("Estilo de Arma e Escudo") && personagem.getEquipamento().getEscudo()){
                defesa += 2;
            }
        }

        if(escudo) {
            defesa += escudo.getBonusDefesa();
        }

        defesa += personagem.getBonusDefesa() + personagem.getBonusDefesaHabilidades();

        return defesa;

    }

}
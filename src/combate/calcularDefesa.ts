import { Personagem } from "../personagens/personagem.ts";

export class CalculadoraDefesa {

    static calcular(
        personagem: Personagem
    ): number {

        let defesa = 10 + personagem.getDestreza();

        const armadura = personagem.getEquipamento().getArmadura();

        if (armadura) {
            defesa += armadura.getBonusDefesa();
        }

        return defesa;

    }

}
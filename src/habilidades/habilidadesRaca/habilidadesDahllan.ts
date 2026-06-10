import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class AmigaDasPlantas extends Habilidade{
    constructor(){
        super("Amiga das Plantas", "Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Amiga das Plantas é uma habilidade passiva.");
    }
}

export class ArmaduraDeAllihanna extends Habilidade {
    constructor(){
        super("Armadura de Allihanna", "Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.", 1);
    }

    usar(usuario: Personagem): void {
        if(!usuario.gastarMana(this.getCustoMana())) {
            console.log("Mana insuficiente.");
            return;
        }

        usuario.receberBonusDefesaTemporario(2);

        console.log(`${usuario.getNome()} ativa Armadura de Allihanna.`)
    }
}

export class EmpatiaSelvagem extends Habilidade {
    constructor(){
        super("Empatia Selvagem", "Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e pedir favores de animais. Caso receba esta habilidade novamente, recebe +2 em Adestramento.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Empatia Selvagem é uma habilidade passiva.");
    }
}

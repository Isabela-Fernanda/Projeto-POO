import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class CancaoDosMares extends Habilidade{
    constructor(){
        super("Canção dos Mares", "Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Canção dos Mares é uma habilidade passiva.");
    }
}

export class MestreDoTridente extends Habilidade {
    constructor(){
        super("Mestre do Tridente", "Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Mestre do Tridente é uma habilidade passiva.");
    }
}

export class TransformacaoAnfibia extends Habilidade {
    constructor(){
        super("Transformação Anfíbia", "Você pode respirar debaixo d’água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora d’água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Transformação Anfíbia é uma habilidade passiva.");
    }
}

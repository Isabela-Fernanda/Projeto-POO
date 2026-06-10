import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class ArmaduraOssea extends Habilidade{
    constructor(){
        super("Armadura Óssea", " Você recebe resistência a corte, frio e perfuração 5.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Você atacou com Armadura Óssea.");
    }
}

export class MemoriaPostuma extends Habilidade {
    constructor(){
        super("Memória Póstuma", "Você se torna treinado em uma perícia (não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Memória Póstuma é uma habilidade passiva.");
    }
}

export class NaturezaEsqueletica extends Habilidade {
    constructor(){
        super("Natureza Esquelética", "Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a doenças, fadiga, sangramento, sono e venenos. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, habilidades mágicas de cura causam dano a você e você não se beneficia de itens ingeríveis (comidas, poções etc.), mas dano de trevas recupera seus PV.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Natureza Esquelética é uma habilidade passiva.");
    }
}

export class PrecoDaNaoVida extends Habilidade {
    constructor(){
        super("Preço da Não Vida", "Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais (osteon não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Preço da Não Vida é uma habilidade passiva.");
    }
}

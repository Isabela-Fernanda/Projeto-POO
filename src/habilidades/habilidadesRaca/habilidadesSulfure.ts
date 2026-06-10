import { Personagem } from "../../personagens/personagem";
import { Habilidade } from "../habilidades";

export class HerancaDivina extends Habilidade {
    constructor(){
        super("Herança Divina", "Você é uma criatura do tipo espírito e recebe visão no escuro.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Herança Divina é uma habilidade passiva.")
    }
}

export class SombrasProfanas extends Habilidade {
    constructor(){
        super("Sombras Profanas", "Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo chave Inteligência). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Sombras Profanas é uma habilidade passiva.");
    }
}
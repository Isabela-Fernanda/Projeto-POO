import { Habilidade } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";

export class MauCheiro extends Habilidade{
    constructor(){
        super("Mau Cheiro", "Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.", 2);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Você atacou com Mau Cheiro.");
    }
}

export class Mordida extends Habilidade {
    constructor(){
        super("Mordida", "Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Quando usa a ação atacar, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.", 1);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Mordida é uma habilidade passiva.");
    }
}

export class Reptiliano extends Habilidade {
    constructor(){
        super("Reptiliano", "Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Reptiliano é uma habilidade passiva.");
    }
}

export class SangueFrio extends Habilidade {
    constructor(){
        super("Sangue Frio", "Você sofre 1 ponto de dano adicional por dado de dano de frio.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Sangue Frio é uma habilidade passiva.");
    }
}

import { Habilidade } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";

export class Chifres extends Habilidade{
    constructor(){
        super("Chifres", "Você possui uma arma natural de chifres (dano 1d6, crítico x2, perfuração). Quando usa a ação atacar, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.", 1);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Você atacou com Chifres.");
    }
}

export class CouroRigido extends Habilidade {
    constructor(){
        super("Couro Rígido", "Sua pele é dura como a de um touro. Você recebe +1 na Defesa.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Couro Rígido é uma habilidade passiva.");
    }
}

export class Faro extends Habilidade {
    constructor(){
        super("Faro", "Você tem olfato apurado. Você não fica desprevenido e sofre apenas camuflagem (em vez de camuflagem total) contra inimigos em alcance curto que não possa ver.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Faro é uma habilidade passiva.");
    }
}

export class MedoDeAltura extends Habilidade {
    constructor(){
        super("Medo de Altura", "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), você fica abalado.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Medo de Altura é uma habilidade passiva.");
    }
}

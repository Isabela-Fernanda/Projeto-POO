import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class ConnhecimentoDasRochas extends Habilidade{
    constructor(){
        super("Conhecimento das Rochas", " Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Conhecimento das Rochas é uma habilidade passiva.");
    }
}

export class DevagarESempre extends Habilidade {
    constructor(){
        super("Devagar e Sempre", "Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Devagar e Sempre é uma habilidade passiva.");
    }
}

export class DuroComoPedra extends Habilidade {
    constructor(){
        super("Duro como Pedra", "Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Duro como Pedra é uma habilidade passiva.");
    }
}

export class TradicaoDeHeredrimm extends Habilidade {
    constructor(){
        super("Tradição de Heredrimm", "Você é perito nas armas tradicionais anãs, seja por ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.", 0);
    }
    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Tradição de Heredrimm é uma habilidade passiva.");
    }
}
import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class Arremessador extends Habilidade{
    constructor(){
        super("Arremessador", "Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Arremessador é uma habilidade passiva.");
    }
}

export class PequenoERechonchudo extends Habilidade {
    constructor(){
        super("Pequeno e Rechonchudo", "Seu tamanho é Pequeno e seu deslocamento é 6m. Você recebe +2 em Enganação e usa o modificador de Destreza para Atletismo (em vez de Força).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Pequeno e Rechonchudo é uma habilidade passiva.");
    }
}

export class SorteSalvadora extends Habilidade {
    constructor(){
        super("Sorte Salvadora", "Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.", 1);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Sorte Salvadora é uma habilidade passiva.");
    }
}

import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class Engenhoso extends Habilidade{
    constructor(){
        super("Engenhoso", "Você não sofre penalidades em testes de perícia por não usar kits. Se usar o kit, recebe +2 no teste de perícia.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Engenhoso é uma habilidade passiva.");
    }
}

export class Espelunqueiro extends Habilidade {
    constructor(){
        super("Espelunqueiro", "Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Espelunqueiro é uma habilidade passiva.");
    }
}

export class PesteEsguia extends Habilidade {
    constructor(){
        super("Peste Esguia", "Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m. Apesar de pequenos, goblins são rápidos.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Peste Esguia é uma habilidade passiva.");
    }
}

export class RatoDasRuas extends Habilidade {
    constructor(){
        super("Rato das Ruas", "Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Rato das Ruas é uma habilidade passiva.");
    }
}

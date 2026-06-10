import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class Hibrido extends Habilidade{
    constructor(){
        super("Híbrido", "Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Híbrido é uma habilidade passiva.");
    }
}

export class LogicaGnomica extends Habilidade {
    constructor(){
        super("Lógica Gnômica", "Quando faz um teste de atributo ou perícia, você pode gastar 2 PM para substituir o modificador de atributo utilizado por Inteligência. Por exemplo, ao fazer um teste de Atletismo você pode gastar 2 PM para usar seu modificador de Inteligência em vez do modificador de Força.", 2);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Lógica Gnômica é uma habilidade passiva.");
    }
}

export class OssosFrageis extends Habilidade {
    constructor(){
        super("Ossos Frágeis", "Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6+2 pontos de dano.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Ossos Frágeis é uma habilidade passiva.");
    }
}

export class Vanguardista extends Habilidade {
    constructor(){
        super("Vanguardista", "Você recebe proficiência em armas de fogo e +2 em testes de Ofício (um qualquer, a sua escolha).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Vanguardista é uma habilidade passiva.");
    }
}

import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class CriaDeMegalokk extends Habilidade{
    constructor(){
        super("Cria de Megalokk", "Você é uma criatura do tipo monstro e recebe visão no escuro.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Cria de Megalokk é uma habilidade passiva.");
    }
}

export class NaturezaVenenosa extends Habilidade {
    constructor(){
        super("Natureza Venenosa", " Você recebe resistência a veneno 5 e pode gastar uma ação de movimento e 1PM para envenenar uma arma que esteja empunhando. A arma causa +1d12 pontos de dano de veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro).", 1);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Natureza Venenosa é uma habilidade passiva.");
    }
}

export class OlharAtordoante extends Habilidade {
    constructor(){
        super("Olhar Atordoante", " Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se a criatura falhar, fica atordoada por 1 rodada. Se passar, fica imune a esta habilidade por um dia.", 1);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Olhar Atordoante é uma habilidade passiva.");
    }
}

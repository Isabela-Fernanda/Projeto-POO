import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";

export class CriaDaTormenta extends Habilidade{
    constructor(){
        super("Cria da Tormenta", "Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Cria da Tormenta é uma habilidade passiva.");
    }
}

export class Deformidade extends Habilidade {
    constructor(){
        super("Deformidade", "Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta. Você pode trocar um desses bônus por um poder da Tormenta a sua escolha. Esta habilidade não causa perda de Carisma.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Deformidade é uma habilidade passiva.");
    }
}

import { Habilidade } from "./habilidades";
import { Personagem } from "..//personagens/personagem";

export class Furia extends Habilidade {
    constructor(){
        super("Fúria", 20);
    }

    usar(usuario: Personagem, alvo: Personagem): void {
        console.log(
            `${usuario.getNome()} entrou em fúria!`
        )
    }
}
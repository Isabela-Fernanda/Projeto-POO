import { Habilidade } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";

export class Desejos extends Habilidade{
    constructor(){
        super("Desejos", "Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.", -1);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Desejos é uma habilidade passiva.");
    }
}

export class ResistenciaElemental extends Habilidade {
    constructor(){
        super("Resistência Elemental", "Conforme sua ascendência, você recebe resistência 10 a um tipo de dano. Escolha uma: frio (qareen da água), eletricida de (do ar), fogo (do fogo), ácido (da terra), luz (da luz) ou trevas (qareen das trevas).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Resistência Elemental é uma habilidade passiva.");
    }
}

export class TatuagemMistica extends Habilidade {
    constructor(){
        super("Tatuagem Mística", "Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Tatuagem Mística é uma habilidade passiva.");
    }
}

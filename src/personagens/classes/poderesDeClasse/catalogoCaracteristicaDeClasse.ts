import { Personagem } from "../../../personagens/personagem.ts";
import { Caracteristica } from "../../../poderes/caracteristica.ts";

/* ------------------------------------------------------------------- */
/* ---------------------------- BUCANEIRO ---------------------------- */
/* ------------------------------------------------------------------- */
export class Insolente extends Caracteristica {
    constructor() {
        super("Insolente", "");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ---------------------------- CAVALEIRO ---------------------------- */
/* ------------------------------------------------------------------- */
export class Baluarte extends Caracteristica {
    constructor() {
        super("Baluarte", "Você pode gastar 1 PM para receber +2 na Defesa e nos testes de resistência até o início do seu próximo turno. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +2.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- CLÉRIGO ----------------------------- */
/* ------------------------------------------------------------------- */
export class SimboloSagrado extends Caracteristica {
    constructor() {
        super("Símbolo Sagrado", "Necessário para lançar magias divinas.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------ DRUIDA ----------------------------- */
/* ------------------------------------------------------------------- */
export class AspectoDaNatureza extends Caracteristica {
    constructor() {
        super("Aspecto da Natureza", "Concede um aspecto escolhido pelo druida.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ---------------------------- GUERREIRO ---------------------------- */
/* ------------------------------------------------------------------- */
export class AtaqueEspecial extends Caracteristica {
    constructor() {
        super("Ataque Especial", "Quando faz um ataque, você pode gastar 1 PM para receber +4 no teste de ataque ou na rolagem de dano. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +4. Você pode dividir os bônus igualmente. Por exemplo, no 17º nível, pode gastar 5 PM para receber +20 no ataque, +20 no dano ou +10 no ataque e +10 no dano.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- INVENTOR ---------------------------- */
/* ------------------------------------------------------------------- */
export class Engenhosidade extends Caracteristica {
    constructor() {
        super("Engenhosidade", "Quando faz um teste de perícia, você pode gastar 2 PM para receber um bônus igual ao seu modificador de Inteligência no teste. Você não pode usar esta habilidade em testes de ataque.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------ LADINO ----------------------------- */
/* ------------------------------------------------------------------- */
export class AtaqueFurtivo extends Caracteristica {
    constructor() {
        super("Ataque Furtivo", "Você sabe atingir os pontos vitais de um inimigo distraído. Uma vez por rodada, quando atinge um alvo desprevenido com um ataque corpo a corpo ou em alcance curto, ou um alvo que esteja flanqueando, você causa 1d6 pontos de dano adicional. A cada dois níveis, esse dano adicional aumenta em +1d6. Uma criatura imune a acertos críticos também é imune a ataques furtivos.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- LUTADOR ----------------------------- */
/* ------------------------------------------------------------------- */
export class Briga extends Caracteristica {
    constructor() {
        super("Briga", "Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades). A cada quatro níveis, seu dano desarmado aumenta, conforme a tabela.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------- NOBRE ----------------------------- */
/* ------------------------------------------------------------------- */
export class Autoconfianca extends Caracteristica {
    constructor() {
        super("Autoconfiança", "Você pode somar seu bônus de Carisma em vez de Destreza na Defesa (mas continua não podendo somar um bônus de atributo na Defesa quando usa armadura pesada).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- PALADINO ---------------------------- */
/* ------------------------------------------------------------------- */
export class GolpeDivino extends Caracteristica {
    constructor() {
        super("Golpe Divino", "Quando faz um ataque corpo a corpo, você pode gastar 2 PM para desferir um golpe destruidor.Você soma seu bônus de Carisma no teste de ataque e + 1d8 na rolagem de dano.A cada quatro níveis, pode gastar + 1 PM para aumentar o dano em + 1d8.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarCaracteristica(this);
    }
}


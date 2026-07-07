import { Personagem } from "@personagens/personagem.js";
import { Beneficio } from "@poderes/beneficio.js";
import { Caracteristica } from "@poderes/caracteristica.js";
import { Habilidade, TipoAcao, TipoAlvo } from "@poderes/habilidades.js";

import { EfeitoFuria } from "@poderes/efeitos/efeitoFuria.js";
import { EfeitoInspiracao } from "@poderes/efeitos/efeitoInspiracao.js";
import { EfeitoMarcaDaPresa } from "@poderes/efeitos/efeitoMarcaDaPresa.js";
import { EfeitoDesafio } from "@poderes/efeitos/efeitoDesafio.js";

/* ------------------------------------------------------------------- */
/* ---------------------------- ARCANISTA ---------------------------- */
/* ------------------------------------------------------------------- */
export class MagiasAprendidas extends Beneficio {
    constructor() {
        super(
            "Magias",
            "Você conhece três magias de 1º círculo."
        );
    }

    aplicar(personagem: Personagem): void {
        // escolher magias durante criação
    }
}

export class MagiasArcanas extends Beneficio {
    constructor() {
        super(
            "Magias",
            "Você conhece três magias arcanas."
        );
    }

    aplicar(personagem: Personagem): void {
        // seleção de magias na criação
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- CAÇADOR ----------------------------- */
/* ------------------------------------------------------------------- */
export class Explorador extends Beneficio {
    constructor() {
        super(
            "Explorador",
            "Recebe bônus em seu terreno favorito."
        );
    }

    aplicar(personagem: Personagem): void {
        // implementar futuramente
    }
}

export class MarcaDaPresa extends Habilidade {
    constructor() {
        super(
            "Marca da Presa",
            "...",
            1,
            TipoAcao.MOVIMENTO,
            TipoAlvo.INIMIGO
        );
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        alvo.adicionarEfeito(
            new EfeitoMarcaDaPresa()
        );
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
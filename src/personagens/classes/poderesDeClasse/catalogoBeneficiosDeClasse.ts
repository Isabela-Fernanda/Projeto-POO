import { Personagem } from "../../../personagens/personagem.ts";

import { Beneficio } from "../../../poderes/beneficio.ts";

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
/* ----------------------------- BARBARO ----------------------------- */
/* ------------------------------------------------------------------- */
export class MovimentoRapido extends Beneficio {
    constructor() {
        super(
            "Movimento Rápido",
            "Seu deslocamento aumenta em +3m."
        );
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(
            personagem.getDeslocamento() + 3
        );
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------ BARDO ------------------------------ */
/* ------------------------------------------------------------------- */
export class Ecletico extends Beneficio {
    constructor() {
        super(
            "Eclético",
            "Pode usar qualquer perícia."
        );
    }

    aplicar(personagem: Personagem): void {
        // implementar futuramente
    }
}

/* ------------------------------------------------------------------- */
/* ---------------------------- BUCANEIRO ---------------------------- */
/* ------------------------------------------------------------------- */
export class Audacia extends Beneficio {
    constructor() {
        super(
            "Audácia",
            "Adiciona Carisma a testes apropriados."
        );
    }

    aplicar(personagem: Personagem): void {
        // implementar quando existir sistema de testes
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

/* ------------------------------------------------------------------- */
/* ---------------------------- CAVALEIRO ---------------------------- */
/* ------------------------------------------------------------------- */
export class CodigoDeHonra extends Beneficio {
    constructor() {
        super("Código de Honra", "Cavaleiros distinguem-se de meros combatentes por seguir um código de conduta. Fazem isto para mostrar que estão acima dos mercenários e bandoleiros que infestam os campos de batalha. Você não pode atacar um oponente pelas costas (em termos de jogo, não pode se beneficiar do bônus de flanquear), caído, desprevenido ou incapaz de lutar. Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia. Rebaixar-se ao nível dos covardes e desesperados abala a autoconfiança que eleva o cavaleiro.");
    }

    aplicar(personagem: Personagem): void {
        // sem efeito mecânico imediato
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- CLÉRIGO ----------------------------- */
/* ------------------------------------------------------------------- */
export class MagiasDivinas extends Beneficio {
    constructor() {
        super("Magias Divinas", "Você conhece magias divinas.");
    }

    aplicar(personagem: Personagem): void {
        // selecionar magias
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------ DRUIDA ----------------------------- */
/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */
/* ----------------------------- INVENTOR ---------------------------- */
/* ------------------------------------------------------------------- */
export class Prototipo extends Beneficio {
    constructor() {
        super("Protótipo", "Você começa o jogo com um item superior com uma modificação ou 10 itens alquímicos, com preço total de até T$ 500.");
    }

    aplicar(personagem: Personagem): void {
        // escolher protótipo futuramente
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------ LADINO ----------------------------- */
/* ------------------------------------------------------------------- */
export class Especialista extends Beneficio {
    constructor() {
        super("Especialista", "Escolha um número de perícias treinadas igual ao seu bônus de Inteligência (mínimo 1). Ao fazer um teste de uma dessas perícias, você pode gastar 1 PM para dobrar seu bônus de treinamento. Você não pode usar esta habilidade em testes de ataque.");
    }

    aplicar(personagem: Personagem): void {
        // implementar no sistema de perícias
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- LUTADOR ----------------------------- */
/* ------------------------------------------------------------------- */
export class CascaGrossa extends Beneficio {
    constructor() {
        super("Casca Grossa", "No 3º nível, você soma seu bônus de Constituição na Defesa, limitado pelo seu nível e apenas se não estiver usando armadura pesada. Além disso, no 7º nível, e a cada quatro níveis, você recebe +1 na Defesa.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusDefesa(1);
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------- NOBRE ----------------------------- */
/* ------------------------------------------------------------------- */
export class Orgulho extends Beneficio {
    constructor() {
        super("Orgulho", "Quando faz um teste de perícia, você pode gastar uma quantidade de PM a sua escolha (limitado pelo seu modificador de Carisma). Para cada PM que gastar, recebe +2 no teste.");
    }

    aplicar(personagem: Personagem): void {
        // implementar depois
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- PALADINO ---------------------------- */
/* ------------------------------------------------------------------- */
import { Personagem } from "../../../personagens/personagem.js";
import { Habilidade, TipoAcao, TipoAlvo } from "../../../poderes/habilidades.js";

import { EfeitoFuria } from "../../../poderes/efeitos/efeitoFuria.js";
import { EfeitoInspiracao } from "../../../poderes/efeitos/efeitoInspiracao.js";
import { EfeitoMarcaDaPresa } from "../../../poderes/efeitos/efeitoMarcaDaPresa.js";
import { EfeitoDesafio } from "../../../poderes/efeitos/efeitoDesafio.js";

/* ------------------------------------------------------------------- */
/* ----------------------------- BARBARO ----------------------------- */
/* ------------------------------------------------------------------- */
export class Furia extends Habilidade {
    constructor() {
        super("Fúria", "...", 2, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(usuario: Personagem): void {
        usuario.adicionarVidaTemporaria(
            usuario.getNivel() * 2
        );

        usuario.adicionarEfeito(
            new EfeitoFuria(usuario.getNivel())
        );
    }
}

/* ------------------------------------------------------------------- */
/* ------------------------------ BARDO ------------------------------ */
/* ------------------------------------------------------------------- */
export class Inspiracao extends Habilidade {
    constructor() {
        super(
            "Inspiração",
            "...",
            1,
            TipoAcao.PADRAO,
            TipoAlvo.ALIADO
        );
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        alvo.adicionarEfeito(
            new EfeitoInspiracao()
        );
    }
}

/* ------------------------------------------------------------------- */
/* ---------------------------- CAVALEIRO ---------------------------- */
/* ------------------------------------------------------------------- */
export class Desafio extends Habilidade {
    constructor() {
        super(
            "Desafio",
            "A partir do 2º nível, você pode gastar 2 PM para escolher um inimigo em alcance curto e receber +1 em testes de ataque e rolagens de dano contra ele até o fim da cena. Se atacar outro inimigo, o bônus termina. Para cada 2 PM extras que você gastar, o bônus aumenta em +1.",
            2,
            TipoAcao.PADRAO,
            TipoAlvo.INIMIGO
        );
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        alvo.adicionarEfeito(
            new EfeitoDesafio()
        );
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- CLÉRIGO ----------------------------- */
/* ------------------------------------------------------------------- */
export class CanalizarEnergiaPositiva extends Habilidade {
    constructor() {
        super(
            "Canalizar Energia Positiva",
            "...",
            1,
            TipoAcao.PADRAO,
            TipoAlvo.ALIADO
        );
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        alvo.regenerarVida(
            1 + usuario.getSabedoria()
        );
    }
}

export class CanalizarEnergiaNegativa extends Habilidade {
    constructor() {
        super(
            "Canalizar Energia Negativa",
            "...",
            1,
            TipoAcao.PADRAO,
            TipoAlvo.INIMIGO
        );
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        alvo.receberDano(
            1 + usuario.getSabedoria()
        );
    }
}

/* ------------------------------------------------------------------- */
/* ----------------------------- PALADINO ---------------------------- */
/* ------------------------------------------------------------------- */
export class CuraPelasMaos extends Habilidade {
    constructor() {
        super("Cura pelas Mãos", "A partir do 2º nível, você pode gastar uma ação de movimento e 1 PM para curar 1d8+1 pontos de vida de um alvo em alcance corpo a corpo (incluindo você). A cada quatro níveis, você pode gastar +1 PM para aumentar os PV curados em +1d8+1.\nA partir do 6º nível, você pode gastar +1 PM quando usa Cura pelas Mãos para anular uma condição afetando o alvo, entre abalado, apavorado, atordoado, cego, doente, exausto, fatigado ou surdo. Esta habilidade também pode causar dano de luz a mortos-vivos, exigindo um ataque desarmado.", 0, TipoAcao.PADRAO, TipoAlvo.ALIADO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        const PM = Number(
            prompt("Quantos PM deseja gastar?")
        );

        if (PM <= 0) {
            return;
        }

        if (!usuario.gastarMana(PM)) {
            return;
        }

        alvo.regenerarVida(
            PM * 5
        );
    }
}

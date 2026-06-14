import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao, TipoAlvo } from "../../poderes/habilidades.ts";
import { EfeitoArmaduraDeAllihanna } from "../../poderes/efeitos/armaduraDeAllihanna.ts";

/* ----------------------------------------------------------------- */
/* ---------------------------- Dahllan ---------------------------- */
/* ----------------------------------------------------------------- */
export class ArmaduraDeAllihanna extends Habilidade {
    constructor() {
        super("Armadura de Allihanna", "Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.", 1, TipoAcao.MOVIMENTO, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        usuario.adicionarEfeito(new EfeitoArmaduraDeAllihanna());
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Golem ----------------------------- */
/* ----------------------------------------------------------------- */
export class CanalizarReparos extends Habilidade {
    constructor() {
        super("Canalizar Reparos", "Como uma ação completa, você pode gastar pontos de mana para recuperar pontos de vida, à taxa de 5 PV por PM.", 0, TipoAcao.COMPLETA, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem): void {
        const quantidadePM = Number(prompt("Quanta mana deseja gastar? (1PM = 5PV)"));

        if (quantidadePM <= 0) {
            console.log("Valor inválido.");
            return;
        }

        if (!usuario.gastarMana(quantidadePM)) {
            console.log("Mana insuficiente.");
            return;
        }

        console.log(`${usuario.getNome()} ativou Canalizar Reparos, a vida dele está se regenerando.`);

        usuario.regenerarVida(5 * quantidadePM);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Hynne ----------------------------- */
/* ----------------------------------------------------------------- */
export class SorteSalvadora extends Habilidade {
    constructor() {
        super("Sorte Salvadora", "Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.", 1, TipoAcao.LIVRE, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem): void {
        // Preciso aplicar o método para usar no combate 
        console.log(`${usuario.getNome()} usou sorte salvadora para refazer teste de resistência.`);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Medusa ---------------------------- */
/* ----------------------------------------------------------------- */
export class NaturezaVenenosa extends Habilidade {
    constructor() {
        super("Natureza Venenosa", "Você pode gastar uma ação de movimento e 1PM para envenenar uma arma que esteja empunhando. A arma causa +1d12 pontos de dano de veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro).", 1, TipoAcao.MOVIMENTO, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem): void {
        console.log(`${usuario.getNome()} envenenou sua arma.`);
        // Preciso implementar a parte da arma e do combate
    }
}

export class OlharAtordoante extends Habilidade {
    constructor() {
        super("Olhar Atordoante", " Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se a criatura falhar, fica atordoada por 1 rodada. Se passar, fica imune a esta habilidade por um dia.", 1, TipoAcao.MOVIMENTO, TipoAlvo.INIMIGO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log(`${usuario.getNome()} tenta atordoar ${alvo?.getNome()}`);
        // Preciso implementar o efeito e o combate
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Silfide ---------------------------- */
/* ----------------------------------------------------------------- */
export class Voo extends Habilidade {
    constructor() {
        super("Voo Feérico", "Você pode gastar 1 PM por rodada para voar com deslocamento de 12m.", 1, TipoAcao.MOVIMENTO, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Não sei direito como implemntar
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Trog ------------------------------ */
/* ----------------------------------------------------------------- */
export class MauCheiro extends Habilidade {
    constructor() {
        super("Mau Cheiro", "Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.", 2, TipoAcao.PADRAO, TipoAlvo.QUALQUER);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Não sei direito como implemntar
    }
}

import { Personagem } from "../../personagens/personagem.ts";
import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class EfeitoAbalado extends Efeito {
    constructor(rodadas: number) {
        super("Abalado", rodadas, [Condicao.ABALADO]);
    }

    override getBonusAtaque(): number { return -2; }
    override getBonusPericia(): number { return -2; }
    override getBonusResistencia(): number { return -2; }
}

export class EfeitoAmedrontado extends Efeito {
    constructor(rodadas: number) {
        super("Amedrontado", rodadas, [Condicao.AMEDRONTADO]);

        this.proximoEfeito = new EfeitoAbalado(2);
    }

    override getBonusAtaque(): number { return -4; }
    override getBonusDefesa(): number { return -2; }
    override getBonusDeslocamento(): number { return -3; }
}

export class EfeitoApavorado extends Efeito {
    constructor(rodadas: number) {
        super("Apavorado", rodadas, [Condicao.APAVORADO]);

        this.proximoEfeito = new EfeitoAmedrontado(3);
    }

    override podeAgir(): boolean { return false; }
    override getBonusDefesa(): number { return -4; }
}

export class EfeitoAtordoado extends Efeito {
    constructor(rodadas: number) {
        super("Atordoado", rodadas, [Condicao.ATORDOADO]);
    }

    override podeAgir(): boolean { return false; }
    override getBonusDefesa(): number { return -4; }
}

export class EfeitoCaido extends Efeito {
    constructor(rodadas: number) {
        super("Caído", rodadas, [Condicao.CAIDO]);
    }

    override getBonusAtaque(): number { return -4; }
    override getBonusDefesa(): number { return -4; }
    override getBonusDeslocamento(): number { return -6; }
}

export class EfeitoCamuflado extends Efeito {
    constructor(rodadas: number) {
        super("Camuflado", rodadas, [Condicao.CAMUFLADO]);
    }

    override getBonusDefesa(): number { return 4; }
    override getBonusEnganacao(): number { return 4; }
}

export class EfeitoCego extends Efeito {
    constructor(rodadas: number) {
        super("Cego", rodadas, [Condicao.CEGO]);
    }

    override getBonusAtaque(): number { return -4; }
    override getBonusDefesa(): number { return -4; }
    override getBonusPercepcao(): number { return -10; }
}

export class EfeitoDesequilibrado extends Efeito {
    constructor(rodadas: number) {
        super("Desequilibrado", rodadas, [Condicao.DESEQUILIBRADO]);
    }

    override getBonusAtaque(): number { return -2; }
    override getBonusDefesa(): number { return -2; }
    override getBonusAtletismo(): number { return -4; }
}

export class EfeitoEnredado extends Efeito {
    constructor(rodadas: number) {
        super("Enredado", rodadas, [Condicao.ENREDADO]);
    }

    override getBonusAtaque(): number { return -2; }
    override getBonusDeslocamento(): number { return -4; }
}

export class EfeitoEnvenenado extends Efeito {
    constructor(rodadas: number) {
        super("Envenenado", rodadas, [Condicao.ENVENENADO]);
    }

    override getBonusForca(): number { return -2; }
    override getBonusResistencia(): number { return -2; }

    override processar(personagem: Personagem): void {
        const danoVeneno = 2;
        personagem.receberDano(danoVeneno);
        console.log(`${personagem.getNome()} sofreu ${danoVeneno} de dano por envenenamento.`);
    }
}

export class EfeitoFatigado extends Efeito {
    constructor(rodadas: number) {
        super("Fatigado", rodadas, [Condicao.FATIGADO]);
    }

    override getBonusForca(): number { return -2; }
    override getBonusDeslocamento(): number { return -2; }
}

export class EfeitoFascinado extends Efeito {
    constructor(rodadas: number) {
        super("Fascinado", rodadas, [Condicao.FASCINADO]);
    }

    override getBonusPercepcao(): number { return -4; }
    override getBonusDefesa(): number { return -2; }
}

export class EfeitoInconsciente extends Efeito {
    constructor(rodadas: number) {
        super("Inconsciente", rodadas, [Condicao.INCONSCIENTE]);
    }

    override getBonusDefesa(): number { return -8; }
}

export class EfeitoOfuscado extends Efeito {
    constructor(rodadas: number) {
        super("Ofuscado", rodadas, [Condicao.OFUSCADO]);
    }

    override getBonusAtaque(): number { return -1; }
    override getBonusPercepcao(): number { return -2; }
}

export class EfeitoParalisado extends Efeito {
    constructor(rodadas: number) {
        super("Paralisado", rodadas, [Condicao.PARALISADO]);
    }

    override getBonusDefesa(): number { return -6; }
}

export class EfeitoPasmo extends Efeito {
    constructor(rodadas: number) {
        super("Pasmo", rodadas, [Condicao.PASMO]);
    }
}

export class EfeitoQueimando extends Efeito {
    constructor(rodadas: number) {
        super("Queimando", rodadas, [Condicao.QUEIMANDO]);
    }

    override processar(personagem: Personagem): void {
        const danoFogo = 4;
        personagem.receberDano(danoFogo);
        console.log(`${personagem.getNome()} está pegando fogo e sofreu ${danoFogo} de dano.`);
    }
}

export class EfeitoSangrando extends Efeito {
    constructor(rodadas: number) {
        super("Sangrando", rodadas, [Condicao.SANGRANDO]);
    }

    override processar(personagem: Personagem): void {
        const danoSangramento = 3;
        personagem.receberDano(danoSangramento);
        console.log(`${personagem.getNome()} está sangrando e perdeu ${danoSangramento} de vida.`);
    }
}

export class EfeitoVulneravel extends Efeito {
    constructor(rodadas: number) {
        super("Vulnerável", rodadas, [Condicao.VULNERAVEL]);
    }

    override getBonusDefesa(): number { return -4; }
}

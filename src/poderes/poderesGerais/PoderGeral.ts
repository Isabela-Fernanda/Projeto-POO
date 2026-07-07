import { Personagem } from "../../personagens/personagem.js";
import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.js";
import { Arma } from "../../itens/arma.js";

// ======================================================================
// Primeiro
// ======================================================================

export class AcuidadeComArma extends Habilidade {
    constructor() {
        super("Acuidade com Arma", "Se sua Destreza for maior que 13, ela será usada para calcular seu ataque em vez da Força quando usar uma arma leve.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }
}

export class AtaquePoderoso extends Habilidade {
    constructor() {
        super("Ataque Poderoso", "Se sua Força for maior que 13, ao ativar esse poder você sofre -2 nos testes de ataque, mas se acertar recebe +5 na rolagem de dano.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    override podeAlternar(): boolean {
        return true;
    }

    override estaAtiva(): boolean {
        return this.ativo;
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (usuario.getForca() <= 13) {
            console.log(`${usuario.getNome()} não possui o pré-requisito (Força > 13) para usar esta habilidade.`);
            return;
        }
        this.alternar();
        console.log(`${usuario.getNome()} ${this.ativo ? "ativou" : "desativou"} Ataque Poderoso.`);
    }

    override getBonusAtaque(): number {
        return this.ativo ? -2 : 0;
    }

    override getBonusDano(): number {
        return this.ativo ? 5 : 0;
    }
}

export class CombateDefensivo extends Habilidade {
    constructor() {
        super("Combate Defensivo", "Se sua Inteligência for maior que 13, pode ativar esse poder quando atacar e até seu próximo turno sofre -2 em todos os testes de ataque, mas recebe +5 na defesa.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    override podeAlternar(): boolean {
        return true;
    }

    override estaAtiva(): boolean {
        return this.ativo;
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (usuario.getInteligencia() <= 13) {
            console.log(`${usuario.getNome()} não possui o pré-requisito (Inteligência > 13) para usar esta habilidade.`);
            return;
        }
        this.alternar();
        console.log(`${usuario.getNome()} ${this.ativo ? "ativou" : "desativou"} Combate Defensivo.`);
    }

    override getBonusAtaque(): number {
        return this.ativo ? -2 : 0;
    }

    override getBonusDefesa(): number {
        return this.ativo ? 5 : 0;
    }
}

export class Esquiva extends Habilidade {
    constructor() {
        super("Esquiva", "Você recebe +2 em Defesa e Reflexos. Pré-requisito: Des 13.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }

    override getBonusDefesa(): number {
        return 2;
    }

    override getBonusReflexos(): number {
        return 2;
    }
}

export class FocoEmArma extends Habilidade {
    constructor(
        private armaEscolhida: string
    ) {
        super("Foco em Arma", "Escolha uma arma que tenha proficiência, você receberá +2 em testes de ataque com essa arma. Você pode escolher este poder outras vezes para armas diferentes.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }

    override getBonusAtaqueArma(arma: Arma): number {
        if (arma.getNome().toLowerCase() === this.armaEscolhida.toLowerCase()) {
            return 2;
        }
        return 0;
    }
}

export class ReflexosDeCombate extends Habilidade {
    constructor() {
        super("Reflexos de Combate", "Se sua Destreza for maior que 13, você ganha uma ação de movimento extra a cada turno de no combate.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }

    override getAcoesMovimentoExtrasPrimeiroTurno(): number {
        return 1;
    }
}

export class SaqueRapido extends Habilidade {
    constructor() {
        super("Saque Rápido", "Se for treinado em Iniciativa, você recebe +2 em Iniciativa e pode sacar ou guardar itens como uma ação livre (em vez de ação de movimento). Além disso, a ação que você gasta para recarregar uma arma de disparo diminui em uma categoria (ação completa para padrão, padrão para movimento, movimento para livre).", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }

    override getBonusIniciativa(): number {
        return 2;
    }
}

export class Vitalidade extends Habilidade {
    constructor() {
        super("Vitalidade", "Se sua Constituição for maior que 13, você recebe +1 PV por nível de personagem e +2 em Fortitude.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }

    override getBonusPVPorNivel(): number {
        return 1;
    }

    override getBonusFortitude(): number {
        return 2;
    }
}

export class VontadeDeFerro extends Habilidade {

    constructor() {
        super("Vontade de Ferro", "Se sua Sabedoria for maior que 13, você recebe +1 PM para cada dois níveis de personagem e +2 em Vontade.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void { }

    override getBonusVontade(): number {
        return 2;
    }

    override getBonusPMPorNivel(usuario?: Personagem): number {
        return 0.5;
    }
}


// Para depois
/* // ======================================================================
// Segundo
// ======================================================================

export class EstiloDesarmado extends Habilidade {
    constructor() {
        super("Estilo Desarmado", "Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades). Pré-requisito: treinado em Luta.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class EstiloDeUmaMao extends Habilidade {
    constructor() {
        super("Estilo de Uma Mão", "Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na Defesa e nos testes de ataque com essa arma (exceto ataques desarmados). Pré-requisito: treinado em Luta.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class EstiloDeDuasArmas extends Habilidade {
    constructor() {
        super("Estilo de Duas Armas", "Se estiver usando duas armas (e pelo menos uma delas for leve) e fizer a ação atacar, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os estes de ataque até o seu próximo turno. Se você possuir Ambidestria, não sofre essa penalidade. Pré-requisito: Des 15, treinado em Luta.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class EstiloDeDuasMaos extends Habilidade {
    constructor() {
        super("Estilo de Duas Mãos", "Se estiver usando uma arma corpo a corpo com as duas mãos, você recebe +5 nas rolagens de dano. Este poder não pode ser usado com armas leves. Pré-requisitos: For 15, Treinado em Luta.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

// ======================================================================
// A distância
// ======================================================================

export class EstiloDeArremeco extends Habilidade {
    constructor() {
        super("Estilo de Arremeço", "Você pode sacar armas de arremesso como uma ação livre e recebe +2 nas rolagens de dano com elas. Pré-requisito: treinado em Pontaria.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class EstiloDeDisparo extends Habilidade {
    constructor() {
        super("Estilo de Disparo", "Se estiver usando uma arma de disparo, você soma o bônus de Destreza nas rolagens de dano. Pré-requisito: treinado em Pontaria.", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}


// ======================================================================
// Terceira
// ======================================================================

export class Acrobatico extends Habilidade {
    constructor() {
        super("Acrobático", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class AparenciaInofensiva extends Habilidade {
    constructor() {
        super("Aparência Inofensiva", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class Atletico extends Habilidade {
    constructor() {
        super("Atlético", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class Atraente extends Habilidade {
    constructor() {
        super("Atraente", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class Comandar extends Habilidade {
    constructor() {
        super("Comandar", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class Investigador extends Habilidade {
    constructor() {
        super("Investigador", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class Medicina extends Habilidade {
    constructor() {
        super("Medicina", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
}

export class FocoEmPericia extends Habilidade {
    constructor() {
        super("Foco em Perícia", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO, false);
    }

    usar(): void {}

    //Falta implementar
} */
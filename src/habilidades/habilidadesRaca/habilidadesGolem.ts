import { Habilidade } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Tags } from "../../poderes/tags.ts";
import{ TipoEnergia } from "../../poderes/tipoEnergia.ts";

export class CanalizarReparos extends Habilidade {
    constructor() {
        super("Canalizar Reparos", "Como uma ação completa, você pode gastar pontos de mana para recuperar pontos de vida, à taxa de 5 PV por PM.", 1);
    }

    usar(usuario: Personagem, alvo: Personagem, quantidadePM: number): void {
        if (!usuario.gastarMana(quantidadePM)) {
            console.log("Mana insuficiente.");
            return;
        }

        console.log(`${usuario.getNome()} ativou Canalizar Reparos, a vida dele está se regenerando.`);

        usuario.regenerarVida(5 * quantidadePM);
    }
}

//Continuar a aplicar depois
export class Chassi extends Habilidade {
    constructor() {
        super("Chassi", "Seu corpo artificial é resistente, mas rígido. Você recebe +2 na Defesa, mas possui penalidade de armadura –2 e seu deslocamento é 6m. Você leva um dia para vestir ou remover uma armadura (pois precisa acoplar as peças dela a seu chassi).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Chassi é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.setDeslocamento(6);

        personagem.adicionarBonusDefesa(2);

    }
}

export class CriaturaArtificial extends Habilidade {
    constructor() {
        super("Criatura Artificial", "Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a doenças, fadiga, sangramento, sono e venenos. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, não recupera pontos de vida por descanso e não se beneficia de habilidades de cura e itens ingeríveis (comidas, poções etc.). Você precisa ficar inerte por oito horas por dia para recarregar sua fonte de energia. Se fizer isso, recupera PM por descanso em condições normais (golens não são afetados por condições boas ou ruins de descanso).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Criatura Artificial é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_ARTIFICIAL);
        personagem.adicionarTag(Tags.IMUNE_DOENCAS);
        personagem.adicionarTag(Tags.IMUNE_FADIGA);
        personagem.adicionarTag(Tags.IMUNE_SANGRAMENTO);
        personagem.adicionarTag(Tags.IMUNE_SONO);
        personagem.adicionarTag(Tags.IMUNE_VENENOS);
        personagem.adicionarTag(Tags.NAO_PRECISA_COMER);
        personagem.adicionarTag(Tags.NAO_PRECISA_DORMIR);
        personagem.adicionarTag(Tags.NAO_PRECISA_RESPIRAR);
        personagem.adicionarTag(Tags.NAO_RECEBE_CURA);
        personagem.adicionarTag(Tags.NAO_USA_INGERIVEIS);
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
    }
}

export class EspiritoElemental extends Habilidade {
    constructor(
        private energia: TipoEnergia
    ) {
        super("Espírito Elemental", "Escolha entre água (frio), ar (eletricidade), fogo (fogo) e terra (ácido). Você é imune a dano causado por essa energia. Se fosse sofrer dano mágico dessa energia, em vez disso cura PV em quantida de igual à metade do dano. Por exemplo, se um golem com espírito elemental do fogo é atingido por uma Bola de Fogo que causa 30 pontos de dano, em vez de sofrer esse dano, ele recupera 15 PV.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Espírito Elemental é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarImunidadeEnergia(this.energia);
    }
}

export class SemOrigem extends Habilidade {
    constructor() {
        super("Sem Origem", "Como uma criatura artificial, você já foi construído “pronto”. Não teve uma infância — portanto, não tem direito a escolher uma origem e receber benefícios por ela.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Sem Origem é uma habilidade passiva.");
    }
}

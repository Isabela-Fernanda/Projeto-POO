import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao } from "../habilidades.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { Tags } from "../../poderes/tags.ts";

export class HerancaDivina extends Habilidade {
    constructor() {
        super("Herança Divina", "Você é uma criatura do tipo espírito e recebe visão no escuro.", 0, TipoAcao.LIVRE, false);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Herança Divina é uma habilidade passiva.")
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
    }
}

export class LuzSagrada extends Habilidade {
    constructor() {
        super("Luz Sagrada", "Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.", 0, TipoAcao.LIVRE, false);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log(`${usuario.getNome()} emite uma luz celestial.`);
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.DIPLOMACIA, 2);

        personagem.adicionarBonusPericia(CatalogoPericias.INTUICAO, 2);

    }
}
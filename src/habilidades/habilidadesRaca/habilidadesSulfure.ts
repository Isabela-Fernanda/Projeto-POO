import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade } from "../habilidades.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { Tags } from "../../poderes/tags.ts";

export class HerancaDivina extends Habilidade {
    constructor() {
        super("Herança Divina", "Você é uma criatura do tipo espírito e recebe visão no escuro.", 0);
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

export class SombrasProfanas extends Habilidade {
    constructor() {
        super("Sombras Profanas", "Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo chave Inteligência). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log(`A sombra de ${usuario.getNome()} emite uma energia profana.`);
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.ENGANACAO, 2);

        personagem.adicionarBonusPericia(CatalogoPericias.FURTIVIDADE, 2);

    }
}
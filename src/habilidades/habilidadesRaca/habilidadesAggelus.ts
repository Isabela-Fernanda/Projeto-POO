import { Personagem } from "../../personagens/personagem";
import { Habilidade } from "../habilidades";
import { CatalogoPericias } from "../../pericias/catalogoPericias";

export class HerancaDivina extends Habilidade {
    constructor(){
        super("Herança Divina", "Você é uma criatura do tipo espírito e recebe visão no escuro.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Herança Divina é uma habilidade passiva.")
    }
}

export class LuzSagrada extends Habilidade {
    constructor(){
        super("Luz Sagrada", "Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Adicionar +2 em diplomacia e intuição
        //Lançar magia "Luz" como magia divina 
        console.log(`${usuario.getNome()} emite uma luz celestial.`);
    }

    override aplicarCriacao(personagem: Personagem): void {
    personagem.adicionarBonusPericia(CatalogoPericias.DIPLOMACIA, 2);

    personagem.adicionarBonusPericia(CatalogoPericias.INTUICAO, 2);

}
}
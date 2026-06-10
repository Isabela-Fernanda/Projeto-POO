import { Habilidade } from "../habilidades";
import { Personagem } from "../../personagens/personagem";
import { CatalogoPericias } from "../../pericias/catalogoPericias";

export class GracaDeGlorienn extends Habilidade{
    constructor(){
        super("Graça de Glórienn", "Seu deslocamento é 12m (em vez de 9m).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Graça de Glórienn é uma habilidade passiva.");
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.setDeslocamento(12);
    }
}

export class HerancaFeerica extends Habilidade {
    constructor(){
        super("Herança Feérica", "Você recebe +1 PM por nível.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Herança Feérica é uma habilidade passiva.");
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.aumentarManaMaxima(personagem.getNivel());
    }
}

export class SentidosElficos extends Habilidade {
    constructor(){
        super("Sentidos Élficos", "Você recebe visão na penumbra e +2 em Misticismo e Percepção.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Sentidos Élficos é uma habilidade passiva.");
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.MISTICISMO, 2);

        personagem.adicionarBonusPericia(CatalogoPericias.PERCEPCAO, 2);
    }
}

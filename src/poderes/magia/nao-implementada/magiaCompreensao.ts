import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoEnergia } from "../../tipoEnergia.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

export class MagiaCompreensao extends Magia {
    constructor() {
        super("Compreensão", "Essa magia lhe confere compreensão sobrenatural. Você pode tocar um texto e entender as palavras mesmo que não conheça o idioma. Se tocar numa criatura inteligente, pode se comunicar com ela mesmo que não tenham um idioma em comum. Se tocar uma criatura não inteligente, como um animal, pode perceber seus sentimentos.\nVocê também pode gastar uma ação de movimento para ouvir os pensamentos de uma criatura tocada (você “ouve” o que o alvo está pensando), mas um alvo involuntário tem direito a um teste de Vontade para proteger seus pensamentos e evitar este efeito.", 1, "Entende idiomas e pensamentos superficiais.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ADIVINHACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.TOQUE, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log(`${usuario.getNome()} pode compreender o ${alvo?.getNome()}.`);

        //Deixar os ifs de cada tipo de alvo para depois
    }
}
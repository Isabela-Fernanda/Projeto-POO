import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

export class MagiaTransmutarObjetos extends Magia {
    constructor() {
        super("Transmutar Objetos", "A magia transforma matéria bruta para moldar um novo objeto. Você pode usar matéria-prima mundana para criar um objeto de tamanho Pequeno ou menor e preço máximo de T$ 25, como um balde ou uma espada. O objeto reverte à matéria-prima no final da cena, ou se for tocado por um objeto feito de chumbo. Esta magia não pode ser usada para criar objetos consumíveis, como alimentos, itens alquímicos ou venenos, nem objetos com mecanismos complexos, como bestas ou armas de fogo. Transmutar Objetos anula Despedaçar.", 1, "Molda matéria em novos objetos.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.TRANSMUTACAO, TipoAcao.PADRAO, TipoAlvo.OBJETO, AlcanceMagia.TOQUE, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Deixar para depois
    }
}
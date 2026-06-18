import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoEnergia } from "../../tipoEnergia.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

export class MagiaTrancaArcana extends Magia {
    constructor() {
        super("Tranca Arcana", "Esta magia tranca uma porta ou outro item que possa ser aberto ou fechado (como um baú, caixa etc.), aumentando a CD de testes de Força ou Ladinagem para abri-lo em +10. Você pode abrir livremente sua própria tranca sem problemas. Componente material: chave de bronze no valor de T$ 25.", 1, "Tranca objetos com magia permanente.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ABJURACAO, TipoAcao.PADRAO, TipoAlvo.OBJETO, AlcanceMagia.TOQUE, DuracaoMagia.PERMANENTE);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Deixar para depois
    }
}
import { Personagem } from "../../../personagens/personagem.ts";
import { MagiaDano } from "../magiaDano.ts";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";

import { TipoDano } from "../../../combate/tipoDano.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";

export class MagiaSetaInfalivelDeTalude extends MagiaDano {
    constructor() {
        super("Seta Infalível de Talude", "Favorita entre arcanistas iniciantes, esta magia lança duas setas de energia que causando 1d4+1 pontos de dano de essência cada. Você pode lançar as setas em alvos diferentes ou concentrá-las num mesmo alvo. Caso você possua um bônus no dano de magias, como pelo poder Arcano de Batalha, ele é aplicado em apenas uma seta (o bônus vale para a magia, não cada alvo).", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.EVOCACAO, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.MEDIO, DuracaoMagia.INSTANTANEA, TipoDano.ESSENCIA, 1, 4)
    }

    private danoSeta(): number {
        return Dado.d4() + 1;
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        let alvo1:Personagem;
        let alvo2: Personagem;

        alvo1 = alvo;
        alvo2 = selecionarAlvo();

        while (true) {
            console.log("Essa magia pode ser lançada em até 2 alvos.")
            console.log("1 - Lançar em um alvo");
            console.log("2 - Lançar em alvos diferentes");
            const escolha = prompt("Escolha:");
            if(escolha === "1"){
                alvo?.receberDano(this.danoSeta() + this.danoSeta());
                break;
            }
            if(escolha === "2"){
                alvo1.receberDano(this.danoSeta());
                alvo2.receberDano(this.danoSeta());
                break;
            }
        }
    }
}
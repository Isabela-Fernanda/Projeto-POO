import { Personagem } from "../../../personagens/personagem.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoEnergia } from "../../tipoEnergia.js";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.js";

import { EfeitoResistenciaEnergia } from "../../efeitos/efeitoResistenciaEnergia.js";

export class MagiaResistenciaAEnergia extends Magia {
    constructor() {
        super("Resistência a Energia", "Ao lançar esta magia, escolha entre ácido, eletricidade, fogo, frio, luz ou trevas. O alvo recebe resistência 10 contra a energia escolhida, passando a ignorar os 10 primeiros pontos de dano de cada ataque feito com essa energia.", 1, "Protege contra um tipo de energia.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ABJURACAO, TipoAcao.PADRAO, TipoAlvo.CRIATURA, AlcanceMagia.TOQUE, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        const energia = this.escolherEnergiaElemental();
        usuario.adicionarEfeito(new EfeitoResistenciaEnergia(energia));
    }

    private escolherEnergiaElemental(): TipoEnergia {
        let opcao;
        while (true) {
            console.log("\n=== ENERGIA ELEMENTAL ===");
            console.log("1 - Ácido");
            console.log("2 - Eletricidade");
            console.log("3 - Fogo");
            console.log("4 - Frio");
            console.log("5 - Luz");
            console.log("6 - Trevas");

            opcao = prompt("Escolha o elemento:");

            if (opcao === "1" || opcao === "2" || opcao === "3" || opcao === "4" || opcao === "5" || opcao === "6") {
                break;
            }

            console.log("Escolha invalida! Tente novamente.")
        }

        switch (opcao) {
            case "1":
                return TipoEnergia.ACIDO;
            case "2":
                return TipoEnergia.ELETRICIDADE;
            case "3":
                return TipoEnergia.FOGO;
            case "4":
                return TipoEnergia.FRIO;
            case "5":
                return TipoEnergia.LUZ;
            case "6":
                return TipoEnergia.TREVAS;
            default:
                return TipoEnergia.FOGO;
        }
    }
}
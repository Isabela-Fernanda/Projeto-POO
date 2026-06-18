import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

import { CatalogoArmas } from "../../../inventario/itens/catalogoArmas.ts";
import { EfeitoArmaMagica } from "../../efeitos/efeitoArmaMagica.ts";

export class MagiaArmaMagica extends Magia {
    constructor() {
        super("Arma Mágica", "A arma fornece um bônus de +1 nos testes de ataque e rolagens de dano e é considerada mágica. Caso você esteja empunhando a arma, pode usar seu atributo-chave de magias em vez do atributo original nos testes de ataque.", 1, "Encanta uma arma com poder mágico.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.TRANSMUTACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.TOQUE, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        const armaPrincipal = usuario.getEquipamento().getArmaPrincipal();
        const armaSecundaria = usuario.getEquipamento().getArmaSecundaria();

        const temArmaPrincipal = armaPrincipal !== CatalogoArmas.DESARMADO;
        const temArmaSecundaria = armaSecundaria !== CatalogoArmas.DESARMADO;

        if (temArmaPrincipal && temArmaSecundaria) {
            while (true) {
                let opcao;
                console.log("Escolha uma arma para aplicar a magia.");
                console.log(`1 - ${armaPrincipal.getNome()}`);
                console.log(`2 - ${armaSecundaria.getNome()}`);
                opcao = prompt("Escolha:");

                if (opcao === "1" || opcao === "2") {
                    if (opcao === "1") {
                        armaPrincipal.adicionarEfeito(new EfeitoArmaMagica());
                    } else {
                        armaSecundaria.adicionarEfeito(new EfeitoArmaMagica());
                    }
                    return;
                }
            }
        }

        if (temArmaPrincipal) {
            armaPrincipal.adicionarEfeito(new EfeitoArmaMagica());
        }

        if (temArmaSecundaria) {
            armaSecundaria.adicionarEfeito(new EfeitoArmaMagica());
        }
    }
}
import { Personagem } from "../../../personagens/personagem.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.js";

import { EfeitoAlerta } from "../../efeitos/efeitoAlerta.js";

export class MagiaAviso extends Magia {
    constructor() {
        super("Aviso", "Envia um aviso telepático para uma criatura, mesmo que não possa vê-la nem tenha linha de efeito.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ADIVINHACAO, TipoAcao.MOVIMENTO, TipoAlvo.QUALQUER, AlcanceMagia.LONGO, DuracaoMagia.INSTANTANEA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        while (true) {
            console.log("1 - Alerta: o alvo recebe +5 em seu próximo teste de Iniciativa e de Percepção dentro da cena.");
            console.log(" 2 - Mensagem: o alvo recebe uma mensagem sua de até 25 palavras. Vocês devem ter um idioma em comum para o alvo poder entendê-lo.");
            console.log("3 - Localização: o alvo sabe onde você está naquele momento. Se você mudar de posição, ele não saberá.");
            const escolha = prompt("Escolha um:");
            if (escolha === "1" || escolha === "2" || escolha === "3") {
                switch (escolha) {
                    case "1":
                        if (alvo) {
                            alvo.adicionarEfeito(new EfeitoAlerta());

                            console.log(`${alvo.getNome()} recebe +5 em Iniciativa e Percepção.`);
                        }
                        break;
                    case "2":
                        const mensagem = prompt("Digite sua mensagem: ");
                        if (alvo && mensagem) {
                            console.log(`${alvo.getNome()} recebe a mensagem telepática: "${mensagem}"`);
                        }
                        break
                    case "3":
                        if (alvo) {
                            console.log(`${alvo.getNome()} sabe a localização atual de ${usuario.getNome()}.`);
                        }
                        break;
                }
                break;
            }
            console.log("Escolha invalida! Tente novamente.\n");
        }
    }
}
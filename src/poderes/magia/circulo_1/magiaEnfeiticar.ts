import { Personagem } from "../../../personagens/personagem.ts";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { UtilitarioResistencia } from "../utilitarios.ts"

import { EfeitoEnfeiticado } from "../../efeitos/efeitoEnfeiticado.ts";

export class MagiaEnfeiticar extends Magia {
    constructor() {
        super("Enfeitiçar", "Esta magia torna o alvo prestativo. Ele não fica sob seu controle, mas percebe suas palavras e ações da maneira mais favorável possível. Você recebe um bônus de +10 em testes de Diplomacia com a vítima. Um alvo hostil ou que esteja envolvido em um combate recebe +5 em seu teste de resistência. Se você ou seus aliados tomarem qualquer ação hostil contra o alvo, a magia é dissipada e o alvo retorna à atitude que tinha antes (ou piorada, de acordo com o mestre).", 1, "Torna o alvo mais receptivo.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ENCANTAMENTO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.MENTAL, usuario.getCDMagia())

        if(sucesso){
            console.log(`${alvo.getNome()} resistiu ao encantamento.`);
        } else {
            alvo.adicionarEfeito(new EfeitoEnfeiticado());
        }
    }
}
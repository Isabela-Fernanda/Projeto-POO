import { Personagem } from "../../../personagens/personagem.js";

import { MagiaArea } from "../magiaArea.js";
import { EfeitoArea } from "../../efeitoArea.js";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";

import { AreaCircular } from "../utilitarios.js";
import { EfeitoAlarme } from "../../efeitos/efeitoArea/efeitoAlarme.js";

export class MagiaAlarme extends MagiaArea {
    constructor() {
        super("Alarme", "Você cria uma barreira protetora invisível que detecta qualquer criatura que tocar ou entrar na área protegida. Ao lançar a magia, você pode escolher quais criaturas podem entrar na área sem ativar seus efeitos. Alarme pode emitir um aviso telepático ou sonoro, decidido quando a magia é lançada. Um aviso telepático alerta apenas você, inclusive acordando-o se estiver dormindo, mas apenas se estiver a até 1km da área protegida. Um aviso sonoro alerta todas as criaturas em alcance longo. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ABJURACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    protected obterArea(): AreaCircular {
        return new AreaCircular(9);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void { }

    protected override criarEfeitoArea(x: number, y: number, cd: number): EfeitoArea | null {
        return new EfeitoAlarme(x, y, 6, 10, cd)
    }
}
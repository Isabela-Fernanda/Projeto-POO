import { Personagem } from "../../../personagens/personagem.js";

import { MagiaArea } from "../magiaArea.js";
import { EfeitoArea } from "../../efeitoArea.js";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { AreaCircular, UtilitarioResistencia, UtilitarioCondicao } from "../utilitarios.js";
import { Condicao } from "../../../combate/tipoCondicao.js";

import { EfeitoTeia } from "../../efeitos/efeitoArea/efeitoTeia.js";

export class MagiaTeia extends MagiaArea {
    constructor() {
        super("Teia", "Teia cria várias camadas de fibras entrelaçadas e pegajosas na área. Qualquer criatura na área que falhar na resistência fica enredada. Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo. A área ocupada por Teia é terreno difícil.\nA Teia é inflamável. Qualquer ataque que cause dano de fogo destrói as teias por onde passar, libertando as criaturas enredadas mas deixando-as em chamas.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }
    protected obterArea(): AreaCircular {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.RESTRICAO, usuario.getCDMagia());

        if (!sucesso) {
            UtilitarioCondicao.aplicar(alvo, Condicao.ENREDADO, 3);
        }
    }

    protected override criarEfeitoArea(x: number, y: number, cd: number): EfeitoArea | null {
        return new EfeitoTeia(x, y, 6, 10, cd)
    }
}
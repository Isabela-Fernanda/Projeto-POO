import { Condicao } from "../../../combate/tipoCondicao.js";
import { EfeitoArea } from "../../efeitoArea.js";
import { Personagem } from "../../../personagens/personagem.js";
import { EfeitoEnredado } from "../efeitoCondicao.js";
import { TipoDano } from "../../../combate/tipoDano.js";
import { UtilitarioResistencia } from "../../magia/utilitarios.js";

export class EfeitoTeia extends EfeitoArea {
    constructor( 
        x: number,
        y: number,
        raio: number,
        duracao: number,
        private cd: number
    ){
        super(x, y, raio, duracao);
    }
    afetar(alvo: Personagem): void {
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.RESTRICAO, this.cd);

    if (!sucesso) {
        alvo.adicionarEfeito(new EfeitoEnredado(1));
    }
    }
}
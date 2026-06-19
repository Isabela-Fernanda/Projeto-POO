import { Condicao } from "../../../combate/tipoCondicao.ts";
import { EfeitoArea } from "../../efeitoArea.ts";
import { Personagem } from "../../../personagens/personagem.ts";
import { EfeitoCondicao } from "../efeitoCondicao.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";
import { UtilitarioResistencia } from "../../magia/utilitarios.ts";

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
        alvo.adicionarEfeito(new EfeitoCondicao("Teia", 1, Condicao.ENREDADO));
    }
    }
}
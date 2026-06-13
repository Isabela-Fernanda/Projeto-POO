import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { Personagem } from "../../personagens/personagem.ts";


import { Bencao } from "../efeitos/bencao.ts";

export class MagiaBencao extends Habilidade {
    constructor() {
        super("Benção", "Concede +1 em ataques e defesa.", 2, TipoAcao.PADRAO, TipoAlvo.ALIADO);
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        alvo.adicionarEfeito(
            new Bencao()
        );

        console.log(
            `${alvo.getNome()} recebeu Benção.`
        );
    }
}
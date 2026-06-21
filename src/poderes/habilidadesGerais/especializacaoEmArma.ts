import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";

export class EspecializacaoEmArma extends Habilidade {
    constructor(
        private armaEscolhida: string
    ){
        super("Especialização em Arma", "", 0, TipoAcao.LIVRE, TipoAlvo.PROPRIO);
    }

    getArmaEscolhida(): string {
        return this.armaEscolhida;
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        
    }

    
}
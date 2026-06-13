import { Dado } from "../../combate/dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";

export class CurarFerimentos extends Habilidade {

    constructor() {
        super("Curar Ferimentos", "Recupera PV.", 1, TipoAcao.PADRAO, TipoAlvo.ALIADO);
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        const cura = Dado.d8() + usuario.getNivel();

        alvo.regenerarVida(cura);

        console.log(`${alvo.getNome()} recuperou ${cura} PV.`);
    }
}
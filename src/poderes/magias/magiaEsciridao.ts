import { Dado } from "../../combate/dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { CalcularResistencia } from "../../combate/calcular/calcularResistencia.ts";
import { LuzSagrada } from "../../racas/beneficioRacial/catalogoBeneficiosRaciais.ts";

export class MagiaEscuridao extends Habilidade {
    constructor() {
        super("Luz", "Objeto ilumina como uma tocha.", 3, TipoAcao.PADRAO, TipoAlvo.INIMIGO);
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        let resultado = CalcularResistencia.executarCalculo(alvo, TipoDano.LUZ, 3);

        if(usuario.getRaca().getBeneficiosRaciais().includes(new LuzSagrada())){
            resultado = CalcularResistencia.executarCalculo(alvo, TipoDano.LUZ, 3)
        }

        let dano = Dado.rolarVarios(6, 6);

        if (resultado.sucesso) {
            dano = Math.floor(dano / 2);

            console.log(`${alvo.getNome()} reduz o dano pela metade!`);
        }

        alvo.receberDano(dano);

        console.log(
            `${alvo.getNome()} sofre ${dano} de dano de fogo.`
        );
    }
}
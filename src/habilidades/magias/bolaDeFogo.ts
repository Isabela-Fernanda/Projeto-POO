import { Dado } from "../../combate/dado.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { CalcularResistencia } from "../../combate/calcular/calcularResistencia.ts";

export class BolaDeFogo extends Habilidade {
    constructor() {
        super("Bola de Fogo", "Explosão de fogo.", 3, TipoAcao.PADRAO, TipoAlvo.INIMIGO);
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        const resultado = CalcularResistencia.executarCalculo(alvo, TipoDano.FOGO, 15);

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
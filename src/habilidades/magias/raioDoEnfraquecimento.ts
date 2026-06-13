import { Personagem } from "../../personagens/personagem.ts";
import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";
import { Enfraquecido } from "../efeitos/enfraquecido.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { CalcularResistencia } from "../../combate/calcular/calcularResistencia.ts";

export class RaioEnfraquecimento extends Habilidade {
    constructor() {
        super(
            "Raio do Enfraquecimento",
            "Reduz a capacidade de combate.",
            2,
            TipoAcao.PADRAO,
            TipoAlvo.INIMIGO
        );
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        const resultado =
            CalcularResistencia.executarCalculo(
                alvo,
                TipoDano.VENENO,
                15
            );

        if (!resultado.sucesso) {
            alvo.adicionarEfeito(
                new Enfraquecido()
            );

            console.log(
                `${alvo.getNome()} está enfraquecido!`
            );
        }
    }
}
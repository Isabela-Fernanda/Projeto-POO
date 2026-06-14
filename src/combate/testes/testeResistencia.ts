import { Personagem } from "../../personagens/personagem.ts";
import { ResultadoTeste } from "../resultados/resultadoTeste.ts";
import { CalcularResistencia } from "../calcular/calcularResistencia.ts";
import { TipoDano } from "../tipoDano.ts";

export class TesteResistencia {
    executarResistencia(personagem: Personagem, tipoDano: TipoDano, cd: number): ResultadoTeste{
        const resultado = CalcularResistencia.executarCalculo(personagem, tipoDano, cd);

        const rolagem = resultado.rolagem;
        const total = resultado.total;
        const sucesso= resultado.sucesso;

        return{rolagem, total, sucesso}
    }
}
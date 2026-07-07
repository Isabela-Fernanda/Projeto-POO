import { Personagem } from "../../personagens/personagem.js";
import { ResultadoTeste } from "../resultados/resultadoTeste.js";
import { CalcularResistencia } from "../calcular/calcularResistencia.js";
import { TipoDano } from "../tipoDano.js";

export class TesteResistencia {
    executarResistencia(personagem: Personagem, tipoDano: TipoDano, cd: number): ResultadoTeste{
        const resultado = CalcularResistencia.executarCalculo(personagem, tipoDano, cd);

        const rolagem = resultado.rolagem;
        const total = resultado.total;
        const sucesso= resultado.sucesso;

        return{rolagem, total, sucesso}
    }
}
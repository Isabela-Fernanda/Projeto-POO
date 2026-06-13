import { Dado } from "../dado.ts";
import { Pericia } from "../../pericias/pericia.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { CalculadoraPericia } from "../calcular/calculadoraPericia.ts";
import { ResultadoTeste } from "../resultados/resultadoTeste.ts";

export class TestePericia {
    static executar(personagem: Personagem, pericia: Pericia, cd: number, bonusEfeitoResistencia: number): ResultadoTeste {
        const rolagem = Dado.d20();

        const modificador = CalculadoraPericia.calcular(personagem, pericia) + bonusEfeitoResistencia;

        const total = rolagem + modificador;

        console.log(`\n=== TESTE DE ${pericia.getNome().toLocaleUpperCase()} ===`);
        console.log(`Rolagem: ${rolagem}`);
        console.log(`Modificador: ${modificador}`);
        console.log(`Total: ${total}`);
        console.log(`CD: ${cd}`);

        let sucesso = total >= cd;

        if(rolagem === 20) {
            console.log("\n20 NATURAL!");
            sucesso = true;
        }

        if(rolagem === 1) {
            console.log("\n1 NATURAL!");
            sucesso = false;
        }

        console.log(sucesso ? "SUCESSO!" : "FALHA!");

        return new ResultadoTeste (rolagem, total, sucesso);
    }
} 
import { Dado } from "../combate/dado";
import { Pericia } from "../pericias/pericia";
import { Personagem } from "../personagens/personagem";
import { CalculadoraPericia } from "../pericias/calculadoraPericia";

export class TestePericia {
    static executar(personagem: Personagem, pericia: Pericia, cd: number): boolean {
        const rolagem = Dado.d20();

        if(rolagem === 20) {
            console.log("\n20 NATURAL!");
            return true;
        }

        if(rolagem === 1) {
            console.log("\n1 NATURAL!");
            return false;
        }

        const modificador = CalculadoraPericia.calcular(personagem, pericia);

        const total = rolagem + modificador;

        console.log(`\n=== TESTE DE ${pericia.getNome().toLocaleUpperCase()} ===`);
        console.log(`Rolagem: ${rolagem}`);
        console.log(`Modificador: ${modificador}`);
        console.log(`Total: ${total}`);
        console.log(`CD: ${cd}`);

        const sucesso = total >= cd;

        console.log(sucesso ? "SUCESSO!" : "FALHA!");

        return sucesso;
    }
}
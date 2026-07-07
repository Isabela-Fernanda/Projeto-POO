import { Raca } from "../../personagens/racas/raca.js";
import { Anao } from "../../personagens/racas/anao.js";
import { Elfo } from "../../personagens/racas/elfo.js";
import { Humano } from "../../personagens/racas/humano.js";

export class SelecionarRaca {
    static escolherRaca(): Raca {
            const racas: Raca[] = [
                new Anao(),
                new Elfo(),
                new Humano()
            ];
    
            let indice = 0;
    
            while (true) {
                console.clear();
                const raca = racas[indice];
    
                console.log(`\n=== RAÇA ${indice + 1}/${racas.length} ===`);
                console.log(`\n${raca.getNome().toUpperCase()}`);
                console.log(raca.getResumo());
    
                console.log(`\n1 - Escolher`);
                console.log(`2 - Próxima`);
                console.log(`3- Anterior`);
    
                const opcao = Number(prompt("Escolha a Raça:"));
    
                switch (opcao) {
                    case 1: return raca;
                    case 2:
                        indice = (indice + 1) % racas.length;
                        break;
                    default:
                        indice = (indice - 1) % racas.length;
                        break;
                }
            }
        }
}
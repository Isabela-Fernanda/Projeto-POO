import { Raca } from "../../personagens/racas/raca.ts";
import { Anao } from "../../personagens/racas/anao.ts";
import { Elfo } from "../../personagens/racas/elfo.ts";
import { Humano } from "../../personagens/racas/humano.ts";

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
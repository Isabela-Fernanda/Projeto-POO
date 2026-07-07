import { Classe } from "@personagens/classes/classe.js";
import { Arcanista } from "../../personagens/classes/arcanista.js";
import { Cacador } from "../../personagens/classes/cacador.js";
import { Guerreiro } from "../../personagens/classes/guerreiro.js";

export class EscolherClasse {
    static escolher(): Classe {
        const classes: Classe[] = [
            new Arcanista(),
            new Cacador(),
            new Guerreiro()
        ];

        let indice = 0;

        while (true) {
            console.clear();

            const classe = classes[indice];

            console.log(`\n=== CLASSE ${indice + 1}/${classes.length} ===`);

            console.log(`\n${classe.getNome().toUpperCase()}`);
            console.log(classe.getResumo());
            console.log("\n1 - Escolher");
            console.log("2 - Próxima");
            console.log("3 - Anterior");

            const opcao = prompt("Escolha:");

            switch (opcao) {
                case "1": return classe;
                case "2":
                    indice = (indice + 1) % classes.length;
                    break;
                case "3":
                    indice = (indice - 1 + classes.length) % classes.length;
                    break;
            }
        }
    }
}
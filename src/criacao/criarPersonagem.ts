import { Jogador } from "../personagens/jogador.ts";

// Atributos
import { Atributos, TipoAtributo } from "../personagens/atributos/atributos.ts";
import { GeradorAtributos } from "./geradorAtributos.ts";

// Raças
import { Raca } from "../racas/raca.ts";
import { Elfo } from "../racas/elfo.ts";
import { Humano } from "../racas/humano.ts";

// Classes
import { Classe } from "../personagens/classes/classe.ts";
import { Guerreiro } from "../personagens/classes/guerreiro.ts";

// Perícias
import { Pericia } from "../pericias/pericia.ts";

// Inventario
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";

export class CriacaoPersonagem {

    static criar(): Jogador {
        const nome = this.escolherNome();

        const atributos = this.gerarAtributos();

        const raca = this.escolherRaca();

        if (raca.precisaEscolherBonus()) {
            this.configurarBonusRaciais(atributos, raca.getAtributosProibidos());
        }

        const classe = this.escolherClasse();

        const pericias = this.escolherPericias(classe, atributos);

        return new Jogador(
            nome,
            1,
            raca,
            classe,
            atributos,
            new Inventario(),
            new Equipamento(),
            pericias,
            []
        )
    }

    private static escolherNome(): string {
        const nome = prompt("Nome do personagem:");
        return nome ?? "Herói";
    }

    private static gerarAtributos(): Atributos {
        let atributos;
        console.log("\n=== Gerar Atributos ===");
        console.log("1 - Gerar por Sorte\n2 - Gerar por pontos");

        const opcao = prompt("Escolha o método:");

        switch (opcao) {
            case "2":
                atributos = GeradorAtributos.gerarPorPontos();
                break;
            default:
                atributos = GeradorAtributos.gerarPorRolagem();
        };
        return atributos;
    };

    private static escolherRaca(): Raca {
        console.log("\n=== RAÇA ===");
        console.log("1 - Humano\n2 - Elfo");

        const opcao = prompt("Escolha a Raça:");

        switch (opcao) {
            case "1":
                return new Humano();
            case "2":
                return new Elfo();
            default:
                return new Humano();
        }
    }

    private static escolherAtributo(): TipoAtributo {
        console.log("\nEscolha um atributo:");
        console.log("1 - Força");
        console.log("2 - Destreza");
        console.log("3 - Constituição");
        console.log("4 - Inteligência");
        console.log("5 - Sabedoria");
        console.log("6 - Carisma");
        const opcao = prompt("Escolha:");

        switch (opcao) {
            case "1":
                return TipoAtributo.FORCA;
            case "2":
                return TipoAtributo.DESTREZA;
            case "3":
                return TipoAtributo.CONSTITUICAO;
            case "4":
                return TipoAtributo.INTELIGENCIA;
            case "5":
                return TipoAtributo.SABEDORIA;
            case "6":
                return TipoAtributo.CARISMA;
            default:
                return TipoAtributo.FORCA;
        }

    }

    // Se a raça escolhida for humano, seria/tritão, lefou ou osteon
    private static configurarBonusRaciais(atributos: Atributos, atributosProibidos: TipoAtributo[] = []): void {
        const escolhidos: TipoAtributo[] = [];
        if (atributosProibidos.length > 0) {
            console.log("\nAtributos indisponíveis:");
            console.log(atributosProibidos);
        }

        for (let i = 0; i < 3; i++) {
            atributos.mostrar();

            const atributo = this.escolherAtributo();

            if (escolhidos.includes(atributo)) {
                console.log("Você já escolheu esse atributo.");
                i--;
                continue;
            }
            if (atributosProibidos.includes(atributo)) {
                console.log("Esse atributo não pode ser escolhido.");
                i--;
                continue;
            }

            atributos.adicionarBonus(atributo, 2);
            escolhidos.push(atributo);

            console.log("Atributos aualizados:");
            atributos.mostrar();
        }
    }

    private static escolherClasse(): Classe {
        console.log("\n=== CLASSE ===");
        console.log("1 - Guerreiro");

        const opcao = prompt("Escolha a classe:");

        switch (opcao) {
            case "1":
                return new Guerreiro();
            default:
                return new Guerreiro();
        }

    }

    private static escolherPericias(classe: Classe, atributos: Atributos): Map<Pericia, number> {
        const pericias = new Map<Pericia, number>();

        const disponiveis = classe.getPericiasDisponiveis();

        const quantidade = classe.getPericiasTreinadas();

        for (let i = 0; i < quantidade; i++) {
            console.log(`\nEscolha a perícia ${i + 1}:`);

            disponiveis.forEach((pericia, indice) => {
                console.log(`${indice + 1} - ${pericia.getNome()}`);
            }
            );

            const escolha = Number(prompt("Escolha:"));

            const pericia = disponiveis[escolha - 1];

            if (!pericia) {
                console.log("Perícia inválida.");
                i--;
                continue;
            }

            if (pericias.has(pericia)) {
                console.log("Você já escolheu essa perícia.");
                i--;
                continue;
            }

            pericias.set(pericia, 1);
        }

        console.log(
            "\n=== PERÍCIAS ESCOLHIDAS ==="
        );

        pericias.forEach((_, pericia) => {
                console.log(pericia.getNome());
            }
        );

        return pericias;
    }

}
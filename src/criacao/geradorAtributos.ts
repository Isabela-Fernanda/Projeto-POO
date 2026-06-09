import { Atributos } from "../personagens/atributos/atributos.ts";
import { Dado } from "../combate/dado.ts";

export class GeradorAtributos {

    private static readonly custos =
        new Map<number, number>([
            [8, -2],
            [9, -1],
            [10, 0],
            [11, 1],
            [12, 2],
            [13, 3],
            [14, 4],
            [15, 6],
            [16, 8],
            [17, 11],
            [18, 14]
        ]);

    static gerarPorPontos(): Atributos {

        let pontos = 20;
        console.log("\nVocê possui 20 pontos para distribuir.");

        const forca = this.escolherAtributo("Força", pontos);
        pontos -= this.custos.get(forca)!;

        const destreza = this.escolherAtributo("Destreza", pontos);
        pontos -= this.custos.get(destreza)!;

        const constituicao = this.escolherAtributo("Constituição", pontos);
        pontos -= this.custos.get(constituicao)!;

        const inteligencia = this.escolherAtributo("Inteligência", pontos);
        pontos -= this.custos.get(inteligencia)!;

        const sabedoria = this.escolherAtributo("Sabedoria", pontos);
        pontos -= this.custos.get(sabedoria)!;

        const carisma = this.escolherAtributo("Carisma", pontos);
        pontos -= this.custos.get(carisma)!;

        if (pontos > 0) {
            console.log(`Ainda restam ${pontos} pontos.`);
            console.log("Distribua todos os pontos.");
            return this.gerarPorPontos();
        }

        return new Atributos(
            forca,
            destreza,
            constituicao,
            inteligencia,
            sabedoria,
            carisma
        );
    }

    private static escolherAtributo(
        nome: string,
        pontosDisponiveis: number
    ): number {

        while (true) {

            console.log(
                `\nPontos restantes: ${pontosDisponiveis}`
            );

            const valor = Number(
                prompt(
                    `${nome} (8 a 18):`
                )
            );

            const custo =
                this.custos.get(valor);

            if (
                custo !== undefined &&
                custo <= pontosDisponiveis
            ) {
                return valor;
            }

            console.log(
                "Valor inválido."
            );

        }

    }

    static gerarPorRolagem(): Atributos {

        const valores: number[] = [];

        for (let i = 0; i < 6; i++) {
            valores.push(this.rolarAtributo());
        }

        console.log("\nValores obtidos:");

        console.log(valores.join(", "));

        const forca = this.escolherValor("Força", valores);
        const destreza = this.escolherValor("Destreza", valores);
        const constituicao = this.escolherValor("Constituição", valores);
        const inteligencia = this.escolherValor("Inteligência", valores);
        const sabedoria = this.escolherValor("Sabedoria", valores);
        const carisma = this.escolherValor("Carisma", valores)

        return new Atributos(forca, destreza, constituicao, inteligencia, sabedoria, carisma);
    }

    private static rolarAtributo(): number {

        const dados = [Dado.d6(), Dado.d6(), Dado.d6(), Dado.d6()];

        dados.sort((a, b) => a - b);

        dados.shift();

        let soma = dados.reduce((total, valor) => total + valor, 0);

        if (soma < 6) {
            dados.sort((a, b) => a - b);
            dados[0] = Dado.d6();

            soma = dados.reduce((total, valor) => total + valor, 0);
        }
        return soma;
    }

    private static escolherValor(atributo: string, valores: number[]): number {
        while (true) {
            console.log(`\nEscolha o valor para ${atributo}`);

            valores.forEach((valor, indice) => console.log(`${indice + 1} - ${valor}`));

            const escolha = Number(prompt("Escolha:")) - 1;

            if (escolha >= 0 && escolha < valores.length) {
                return valores.splice(escolha, 1)[0];
            }

            console.log("Opção inválida.");
        }
    }

}
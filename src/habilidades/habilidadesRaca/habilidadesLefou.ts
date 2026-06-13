import { Habilidade } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { Tags } from "../../poderes/tags.ts";

export class CriaDaTormenta extends Habilidade {
    constructor() {
        super("Cria da Tormenta", "Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Cria da Tormenta é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_MONSTRO);
        personagem.adicionarTag(Tags.CRIA_DA_TORMENTA);
    }
}

export class Deformidade extends Habilidade {
    constructor() {
        super("Deformidade", "Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta. Você pode trocar um desses bônus por um poder da Tormenta a sua escolha. Esta habilidade não causa perda de Carisma.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Deformidade é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    //Continuar a aplicar depois
    override aplicarCriacao(personagem: Personagem): void {
        console.log("\n=== HABILIDADE RACIAL: DEFORMIDADE ===");
        let escolha;
        while (true) {
            console.log("1 - Escolha duas perícias para receber +2.");
            console.log("2 - Escolha uma perícia para receber +2 e um poder da Tormenta.");
            escolha = prompt("Escolha: ");

            if (escolha === "1" || escolha === "2") {
                break;
            }

            console.log("Opção inválida.");
        }

        const escolhidas: Pericia[] = [];
        if (escolha === "1") {
            for (let i = 0; i < 2; i++) {
                const pericia = CatalogoPericias.escolherPericia(CatalogoPericias.getTodas());

                if (escolhidas.includes(pericia)) {
                    console.log("Você já escolheu essa perícia.");
                    i--;
                    continue;
                }

                personagem.adicionarBonusPericia(pericia, 2);

                console.log(`Perícia ${pericia.getNome()} melhorada.`);

                escolhidas.push(pericia);
            }
        }

        if (escolha === "2") {
            const pericia = CatalogoPericias.escolherPericia(CatalogoPericias.getTodas());
            personagem.adicionarBonusPericia(pericia, 2);

            console.log(`Perícia ${pericia.getNome()} melhorada.`);

            const poderTormenta = console.log("Escolha de Poder da Tormenta ainda não implementada.");
        }

        personagem.adicionarPoderTormenta(2);
    }
}

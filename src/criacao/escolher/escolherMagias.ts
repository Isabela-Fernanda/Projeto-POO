import { Classe } from "@personagens/classes/classe.js";
import { Habilidade } from "../../poderes/habilidades.js";
import { CatalogoMagias } from "../../poderes/magia/catalogoMagias.js";
import { CirculoMagia, EscolaMagia, TipoMagia } from "../../poderes/magia/magia.js";

export class EscolherMagias {
    escolher(classe: Classe): Habilidade[] {
        if (classe.getNome() === "Arcanista") {
            const magias = CatalogoMagias.obterMagiasTipoCirculo(TipoMagia.ARCANA, CirculoMagia.PRIMEIRO);

            return this.escolherMagiasDaLista(magias, 3);
        }

        if (classe.getNome() === "Bardo") {
            const escolas = this.escolherEscolas(3);
            const magias = CatalogoMagias.obterMagiasTipoCirculo(TipoMagia.ARCANA, CirculoMagia.PRIMEIRO).filter(m => escolas.includes(m.getEscola()));
            
            return this.escolherMagiasDaLista(magias, 2);
        }
        if (classe.getNome() === "Clérigo") {
            const magias = CatalogoMagias.obterMagiasTipoCirculo(TipoMagia.DIVINA, CirculoMagia.PRIMEIRO);

            return this.escolherMagiasDaLista(magias, 3);
        }
        if (classe.getNome() === "Druida") {
            const escolas = this.escolherEscolas(3);
            const magias = CatalogoMagias.obterMagiasTipoCirculo(TipoMagia.DIVINA, CirculoMagia.PRIMEIRO).filter(m => escolas.includes(m.getEscola()));
            
            return this.escolherMagiasDaLista(magias, 2);
        }
        return [];
    }

    private escolherEscolas(quantidade: number): EscolaMagia[] {
        const escolasEscolhidas: EscolaMagia[] = [];
        console.log("Escolha 3 escolas de magia.")
        while (escolasEscolhidas.length < quantidade) {
            console.log("1 - Abjuração");
            console.log("2 - Adivinhação");
            console.log("3 - Convocação");
            console.log("4 - Encantamento");
            console.log("5 - Evocação");
            console.log("6 - Ilusão");
            console.log("7 - Necromancia");
            console.log("8 - Transmutação");

            const escolha =Number(prompt("Escolha:"));

            const escola = escolha - 1;

            if (escola < 0 || escola > 7) {
                console.log("Inválido.");
                continue;
            }

            if (escolasEscolhidas.includes(escola)) {
                console.log("Já escolhida.");
                continue;
            }

            escolasEscolhidas.push(escola);
        }
        return escolasEscolhidas;
    }

    private escolherMagiasDaLista(magias: Habilidade[], quantidade: number): Habilidade[] {
        const magiasEscolhidas: Habilidade[] = [];

        console.log(`Escolha ${quantidade} magias iniciais.`)
        while (magiasEscolhidas.length < quantidade) {
            magias.forEach((magia, indice) =>
                console.log(`${indice + 1} - ${magia.getNome()} | Custo: ${magia.getCustoMana()}\n${magia.getDescricao()}\n`));

            const escolha = Number(prompt("Escolha:")) - 1;
            const magia = magias[escolha];

            if (!magia) {
                console.log("Escolha inválida.");
                continue;
            }

            if (magiasEscolhidas.includes(magia)) {
                console.log("Magia já escolhida.");
                continue;
            }

            magiasEscolhidas.push(magia);
            console.log(`${magia.getNome()} adicionada.`);
        }
        return magiasEscolhidas;
    }
}
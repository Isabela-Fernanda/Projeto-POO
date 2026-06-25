import { Jogador } from "../personagens/jogador.ts";

// Atributos
import { Atributos, TipoAtributo } from "../personagens/atributos/atributos.ts";
import { GeradorAtributos } from "./geradorAtributos.ts";

// Raças
import { Raca } from "../personagens/racas/raca.ts";

// Classes
import { Classe } from "../personagens/classes/classe.ts";

// Beneficios, Caracteristicas e Habilidades
import { Beneficio } from "../poderes/beneficio.ts";
import { Caracteristica } from "../poderes/caracteristica.ts";
import { Habilidade } from "../poderes/habilidades.ts";

// Inventario
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";

import { SelecionarRaca } from "./escolher/escolherRaca.ts";
import { EscolherClasse } from "./escolher/escolherClasse.ts";
import { EscolherPericia } from "./escolher/escolherPericia.ts";
import { EscolherMagias } from "./escolher/escolherMagias.ts";
import { AplicarBeneficioRacial } from "./aplicarBeneficiosRaciais.ts";

export class CriacaoPersonagem {
    static criar(): Jogador {
        const nome = this.escolherNome();
        const atributos = GeradorAtributos.gerarAtributos();
        const raca = SelecionarRaca.escolherRaca();

        if (raca.precisaEscolherBonus()) {
            this.configurarBonusRaciais(atributos, raca.getAtributosProibidos());
        }

        const classe = EscolherClasse.escolher();
        const pericias = new EscolherPericia().escolher(classe);

        const caracteristicas = this.aplicarCaracteristicas(raca, classe);

        const beneficios = this.aplicarBeneficios(raca, classe);
        const habilidades = this.gerarHabilidades(raca, classe);

        if (classe.getNome() === "Arcanista" || classe.getNome() === "Bardo" || classe.getNome() === "Clérigo" || classe.getNome() === "Druida") {
            const magias = new EscolherMagias().escolher(classe);
            habilidades.push(...magias);
        }

        const jogador = new Jogador(nome, 1, raca, classe, atributos, new Inventario(), new Equipamento(), pericias, new Map(), beneficios, caracteristicas, habilidades);

        jogador.getBeneficios().forEach(beneficio => {
            beneficio.aplicar(jogador);
        });

        this.aplicarEscolhasRaciais(jogador);

        return jogador;
    }

    private static escolherNome(): string {
        const nome = prompt("Nome do personagem:");
        return nome ?? "Herói";
    }

    private static aplicarEscolhasRaciais(jogador: Jogador): void {
        if (jogador.getRaca().getNome() === "Humano") {
            AplicarBeneficioRacial.aplicarVersatil(jogador);
        }
    }

    private static aplicarBeneficios(raca: Raca, classe: Classe): Beneficio[] {
        const beneficios: Beneficio[] = [];

        beneficios.push(...raca.getBeneficiosRaciais());

        beneficios.push(...classe.getBeneficios());

        return beneficios;
    }

    private static aplicarCaracteristicas(raca: Raca, classe: Classe): Caracteristica[] {
        const caracteristicas: Caracteristica[] = [];

        caracteristicas.push(...raca.getCaracteristicasRaciais());

        caracteristicas.push(...classe.getCaracteristicas());

        return caracteristicas;
    }

    private static gerarHabilidades(raca: Raca, classe: Classe): Habilidade[] {
        const habilidades: Habilidade[] = [];

        habilidades.push(
            ...raca.getHabilidadesRaciais()
        );

        habilidades.push(
            ...classe.getHabilidades()
        );

        return habilidades;
    }

    private static mostrarHabilidades(habilidades: Habilidade[]): void {
        console.log("\n=== HABILIDADES ===");

        habilidades.forEach(habilidade => console.log(habilidade.getNome()));
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

}
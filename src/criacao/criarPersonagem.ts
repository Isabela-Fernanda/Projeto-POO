import { Jogador } from "../personagens/jogador.ts";

// Atributos
import { Atributos, TipoAtributo } from "../personagens/atributos/atributos.ts";
import { GeradorAtributos } from "./geradorAtributos.ts";

// Raças
import { Raca } from "../racas/raca.ts";
import { Aggelus } from "../racas/aggelus.ts";
import { Anao } from "../racas/anao.ts";
import { Dahllan } from "../racas/dahllan.ts";
import { Elfo } from "../racas/elfo.ts";
import { Goblin } from "../racas/goblin.ts";
import { Golem } from "../racas/golem.ts";
import { Humano } from "../racas/humano.ts";
import { Hynne } from "../racas/hynne.ts";
import { Kliren } from "../racas/kliren.ts";
import { Lefou } from "../racas/lefou.ts";
import { Medusa } from "../racas/medusa.ts";
import { Minotauro } from "../racas/minotauro.ts";
import { Osteon } from "../racas/osteon.ts";
import { Qareen } from "../racas/qareen.ts";
import { SereiaTritao } from "../racas/sereia-tritao.ts";
import { Silfide } from "../racas/silfide.ts";
import { Sulfure } from "../racas/sulfure.ts";
import { Trog } from "../racas/trog.ts";

// Classes
import { Classe } from "../personagens/classes/classe.ts";
import { Arcanista } from "../personagens/classes/arcanista.ts";
import { Barbaro } from "../personagens/classes/barbaro.ts";
import { Bardo } from "../personagens/classes/bardo.ts";
import { Bucaneiro } from "../personagens/classes/bucaneiro.ts";
import { Cacador } from "../personagens/classes/cacador.ts";
import { Cavaleiro } from "../personagens/classes/cavaleiro.ts";
import { Clerigo } from "../personagens/classes/clerigo.ts";
import { Druida } from "../personagens/classes/druida.ts";
import { Guerreiro } from "../personagens/classes/guerreiro.ts";
import { Inventor } from "../personagens/classes/inventor.ts";
import { Ladino } from "../personagens/classes/ladino.ts";
import { Lutador } from "../personagens/classes/lutador.ts";
import { Nobre } from "../personagens/classes/nobre.ts";
import { Paladino } from "../personagens/classes/paladino.ts";

// Habilidades
import { Habilidade } from "../habilidades/habilidades.ts";
import { Amedrontar } from "../habilidades/magias/amedrontar.ts";
import { Sono } from "../habilidades/magias/sono.ts";
import { CurarFerimentos } from "../habilidades/magias/curarFerimentos.ts";
import { MagiaBencao } from "../habilidades/magias/bencao.ts";

// Perícias
import { Pericia } from "../pericias/pericia.ts";

// Inventario
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { CatalogoArmas } from "../inventario/itens/catalogoArmas.ts";
import { CatalogoArmaduras } from "../inventario/itens/catalogoArmadura.ts";
import { GrauTreinamento } from "../pericias/grauTreinamento.ts";

export class CriacaoPersonagem {

    static criar(): Jogador {
        const nome = this.escolherNome();

        const atributos = this.gerarAtributos();

        const raca = this.escolherRaca();

        if (raca.precisaEscolherBonus()) {
            this.configurarBonusRaciais(atributos, raca.getAtributosProibidos());
        }

        const classe = this.escolherClasse();

        const habilidades = this.gerarHabilidades(raca, classe);
        this.mostrarHabilidades(habilidades);

        const pericias = this.escolherPericias(classe);

        const jogador = new Jogador(
            nome,
            1,
            raca,
            classe,
            atributos,
            new Inventario(),
            new Equipamento(),
            pericias,
            new Map(),
            habilidades
        )

        jogador.getInventario().adicionar(CatalogoArmas.ESPADA_LONGA);

        jogador.getInventario().adicionar(CatalogoArmaduras.ARMADURA_DE_COURO);

        jogador.getInventario().adicionar(CatalogoArmaduras.ESCUDO_LEVE);

        this.aplicarHabilidadesCriacao(jogador);

        jogador.adicionarHabilidade(new Amedrontar());
        jogador.adicionarHabilidade(new Sono());
        jogador.adicionarHabilidade(new MagiaBencao());
        jogador.adicionarHabilidade(new CurarFerimentos());


        return jogador;
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
        console.log("1 - Aggelus |   2 - Anão\n3 - Dahllan |   4 - Elfo\n5 - Goblin |   6 - Golem\n7 - Humano |   8 - Hynne\n9 - Kliren |   10 - Lefou\n11 - Medusa |   12 - Minotauro\n13 - Osteon |   14 - Qareen\n15 - Sereia |   16 - Silfide\n17 - Sulfure |   18 - Trog\n");

        const opcao = prompt("Escolha a Raça:");

        switch (opcao) {
            case "1":
                return new Aggelus();
            case "2":
                return new Anao();
            case "3":
                return new Dahllan();
            case "4":
                return new Elfo();
            case "5":
                return new Goblin();
            case "6":
                return new Golem();
            case "7":
                return new Humano();
            case "8":
                return new Hynne();
            case "9":
                return new Kliren();
            case "10":
                return new Lefou();
            case "11":
                return new Medusa();
            case "12":
                return new Minotauro();
            case "13":
                return new Osteon();
            case "14":
                return new Qareen();
            case "15":
                return new SereiaTritao();
            case "16":
                return new Silfide();
            case "17":
                return new Sulfure();
            case "18":
                return new Trog();
            default:
                return new Humano();
        }
    }

    private static gerarHabilidades(raca: Raca, classe: Classe): Habilidade[] {
        const habilidades: Habilidade[] = [];

        habilidades.push(
            ...raca.getHabilidadesRaciais()
        );

        habilidades.push(
            ...classe.getHabilidadesClasse()
        );

        return habilidades;
    }

    private static aplicarHabilidadesCriacao(jogador: Jogador): void {
        for (const habilidade of jogador.getHabilidades()) {
            if (habilidade.ehHabilidadeCriacao()) {
                habilidade.aplicarCriacao(jogador);
            }
        }
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

    private static escolherClasse(): Classe {
        console.log("\n=== CLASSE ===");
        console.log("1 - Arcanista  |   2 - Bárbaro\n3 - Bardo  |   4 - Bucaneiro\n5 - Caçador  |   6 - Cavaleiro\n7 - Clérigo  |   8 - Druida\n9 - Guerreiro   |   10 - Inventor\n11 - Ladino  |   12 - Lutador\n13 - Nobre    |   14 - Paladino");

        const opcao = prompt("Escolha a classe:");

        switch (opcao) {
            case "1":
                return new Arcanista();
            case "2":
                return new Barbaro();
            case "3":
                return new Bardo();
            case "4":
                return new Bucaneiro();
            case "5":
                return new Cacador();
            case "6":
                return new Cavaleiro();
            case "7":
                return new Clerigo();
            case "8":
                return new Druida();
            case "9":
                return new Guerreiro();
            case "10":
                return new Inventor();
            case "11":
                return new Ladino();
            case "12":
                return new Lutador();
            case "13":
                return new Nobre();
            case "14":
                return new Paladino();
            default:
                return new Guerreiro();
        }

    }

    private static escolherPericias(classe: Classe): Map<Pericia, GrauTreinamento> {
        const pericias = new Map<Pericia, GrauTreinamento>();

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

            pericias.set(pericia, GrauTreinamento.TREINADO);
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
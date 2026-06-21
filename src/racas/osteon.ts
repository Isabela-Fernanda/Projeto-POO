import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { ArmaduraOssea, MemoriaPostuma, PrecoDaNaoVida } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";
import { NaturezaEsqueletica } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";

export class Osteon extends Raca {
    private racaOriginal: string;

    constructor() {
        super("Osteon");
        this.racaOriginal = this.escolherRacaOrigem();
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return -2;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    escolherRacaOrigem(): string {
        console.log("\n=== ESCOLHA A RAÇA ORIGINAL ===");
        console.log("Sua estrutura ossea pertence a uma das raças abaixo. (Seu tamanho e deslocamento são modificados de acordo)");
        console.log("1 - Aggelus |   2 - Anão\n3 - Dahllan |   4 - Elfo\n5 - Goblin |   6 - Golem\n7 - Humano |   8 - Hynne\n9 - Kliren |   10 - Lefou\n11 - Medusa |   12 - Minotauro\n13 - Qareen |   14 - Sereia\n15 - Sífide |   16 - Sulfure\n17 - Trog\n");

        const opcao = prompt("Escolha a Raça:");

        switch (opcao) {
            case "1":
                return "Aggelus";
            case "2":
                return "Anao";
            case "3":
                return "Dahllan";
            case "4":
                return "Elfo";
            case "5":
                return "Goblin";
            case "6":
                return "Golem";
            case "7":
                return "Humano";
            case "8":
                return "Hynne";
            case "9":
                return "Kliren";
            case "10":
                return "Lefou";
            case "11":
                return "Medusa";
            case "12":
                return "Minotauro";
            case "13":
                return "Qareen";
            case "14":
                return "SereiaTritao";
            case "15":
                return "Silfide";
            case "16":
                return "Sulfure";
            case "17":
                return "Trog";
            default:
                return "Humano";
        }
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new ArmaduraOssea(),
            new MemoriaPostuma(),
            new PrecoDaNaoVida()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new NaturezaEsqueletica()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [TipoAtributo.CONSTITUICAO];
    }
}
import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";
import { TipoDano } from "../combate/tipoDano.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { ResistenciaElemental, TatuagemMistica, Desejos } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";

export class Qareen extends Raca {
    private tipoDano: TipoDano
    constructor() {
        super("Qareen");

        this.tipoDano = this.escolherResistenciaElemental();
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return 2;
    }
    getBonusSabedoria(): number {
        return -2;
    }
    getBonusCarisma(): number {
        return 4;
    }

    private escolherResistenciaElemental(): TipoDano {
        console.log("\n=== BENEFÍCIO RACIAL: RESISTÊNCIA A UM TIPO DE DANO ===");
        let escolha;
        while (true) {
            console.log("1 - 10 de Resistência a Frio (Qareen da Água)");
            console.log("2 - 10 de Resistência a Eletricidade (Qareen da Ar)");
            console.log("3 - 10 de Resistência a Fogo (Qareen do Fogo)");
            console.log("4 - 10 de Resistência a Ácido (Qareen da Terra)");
            console.log("5 - 10 de Resistência a Luz (Qareen da Luz)");
            console.log("6 - 10 de Resistência a Trevas (Qareen da Trevas)");
            escolha = prompt("Escolha: ");

            if (escolha === "1" || escolha === "2" || escolha === "3" || escolha === "4" || escolha === "5" || escolha === "6") {
                break;
            }

            console.log("Opção inválida.");
        }

        switch (escolha) {
            case "1":
                return TipoDano.FRIO;
            case "2":
                return TipoDano.ELETRICIDADE;
            case "3":
                return TipoDano.FOGO;
            case "4":
                return TipoDano.ACIDO;
            case "5":
                return TipoDano.LUZ;
            case "6":
                return TipoDano.TREVAS;
        }
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new Desejos(),
            new ResistenciaElemental(this.tipoDano),
            new TatuagemMistica()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
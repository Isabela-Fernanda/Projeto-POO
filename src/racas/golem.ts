import { Raca } from "./raca.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { CanalizarReparos, Chassi, CriaturaArtificial, EspiritoElemental, SemOrigem } from "../poderes/habilidadesRaca/habilidadesGolem.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";
import { TipoEnergia } from "../poderes/tipoEnergia.ts";

export class Golem extends Raca {
    private energiaElemental: TipoEnergia;

    constructor() {
        super(
            "Golem"
        );

        this.energiaElemental = this.escolherEnergiaElemental();
    }

    private escolherEnergiaElemental(): TipoEnergia {
        console.log("\n=== ESPÍRITO ELEMENTAL ===");
        console.log("1 - Água (Frio)");
        console.log("2 - Ar (Eletricidade)");
        console.log("3 - Fogo");
        console.log("4 - Terra (Ácido)");

        const opcao = prompt("Escolha o elemento:");

        switch (opcao) {
            case "1":
                return TipoEnergia.FRIO;

            case "2":
                return TipoEnergia.ELETRICIDADE;

            case "3":
                return TipoEnergia.FOGO;

            case "4":
                return TipoEnergia.ACIDO;

            default:
                return TipoEnergia.FOGO;
        }
    }

    getBonusForca(): number {
        return 4;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 2;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return -2;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new CanalizarReparos(),
            new Chassi(),
            new CriaturaArtificial(),
            new EspiritoElemental(this.energiaElemental),
            new SemOrigem()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}
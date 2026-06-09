import { Raca } from "../racas/raca.ts";
import { Classe } from "./classes/classe.ts";
import { Atributos, TipoAtributo } from "./atributos/atributos.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Pericia } from "../pericias/pericia.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { CalculadoraDano } from "../combate/calcularDano.ts";
import { CalculadoraDefesa } from "../combate/calcularDefesa.ts";

export abstract class Personagem {
    protected vidaAtual: number;
    protected vidaMaxima: number;
    protected manaAtual: number;
    protected manaMaxima: number;

    constructor(
        protected nome: string,
        protected nivel: number,
        protected raca: Raca,
        protected classe: Classe | null,
        protected atributos: Atributos,
        protected inventario: Inventario,
        protected equipamento: Equipamento,
        protected pericias: Map< Pericia, number >,
        protected habilidades: Habilidade[],
    ) {
        this.vidaMaxima = (classe?.getVidaInicial() ?? 0) + this.getConstituicao();
        this.manaMaxima = (classe?.getManaInicial() ?? 0);

        this.vidaAtual = this.vidaMaxima;
        this.manaAtual = this.manaMaxima;
    }

    abstract atacar(alvo?: Personagem): void;
    
    receberDano(dano: number): void {
        this.vidaAtual -= dano;
        if (this.vidaAtual < 0) {
            this.vidaAtual = 0;
        }
    }

    estaVivo(): boolean {
        return this.vidaAtual > 0;
    }

    getNome(): string {
        return this.nome;
    }

    getNivel(): number {
        return this.nivel;
    }

    getVidaAtual(): number {
        return this.vidaAtual;
    }

    getVidaMaxima(): number {
        return this.vidaMaxima;
    }

    getManaAtual(): number {
        return this.manaAtual;
    }

    getManaMaxima(): number {
        return this.manaMaxima;
    }

    getAtributos(): Atributos {
        return this.atributos;
    }

    getForca(): number {
        return (this.atributos.getAtributo(TipoAtributo.FORCA) + this.raca.getBonusForca());
    }
    getDestreza(): number {
        return (this.atributos.getAtributo(TipoAtributo.DESTREZA) + this.raca.getBonusDestreza());
    }
    getConstituicao(): number {
        return (this.atributos.getAtributo(TipoAtributo.CONSTITUICAO) + this.raca.getBonusConstituicao());
    }
    getInteligencia(): number {
        return (this.atributos.getAtributo(TipoAtributo.INTELIGENCIA) + this.raca.getBonusInteligencia());
    }
    getSabedoria(): number {
        return (this.atributos.getAtributo(TipoAtributo.SABEDORIA) + this.raca.getBonusSabedoria());
    }
    getCarisma(): number {
        return (this.atributos.getAtributo(TipoAtributo.CARISMA) + this.raca.getBonusCarisma());
    }
    

    getDefesa(): number {
        return CalculadoraDefesa.calcular(this);
    }

    getEquipamento(): Equipamento {
        return this.equipamento;
    }

}
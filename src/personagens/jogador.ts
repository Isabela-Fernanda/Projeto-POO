import { Personagem } from "./personagem.ts";
import { Raca } from "../racas/raca.ts";
import { Classe } from "./classes/classe.ts";
import { Atributos } from "./atributos/atributos.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Pericia } from "../pericias/pericia.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Jogador extends Personagem {
    protected experiencia: number = 0;
    protected ouro: number = 0;

    constructor(
        nome: string,
        nivel: number,
        raca: Raca,
        classe: Classe | null,
        atributos: Atributos,
        inventario: Inventario,
        equipamento: Equipamento,
        pericias: Map<Pericia, number>,
        habilidades: Habilidade[]
    ) {
        super(nome, nivel, raca, classe, atributos, inventario, equipamento, pericias, habilidades);
        this.experiencia = 0;
        this.ouro = 0;
    }

    ganharExperiencia(valor: number) {
        this.experiencia += valor;
        
        while(this.experiencia >= this.getNivel() * 100) {
            this.experiencia -= this.getNivel() * 100;
            this.nivel++;

            console.log(`${this.getNome()} subiu para o nível ${this.nivel}!`)
        }
    }

    atacar(alvo?: Personagem): void {
        if(!alvo){
            console.log(`${this.getNome()} não possui alvo.`);
            return;
        }
        console.log(`${this.getNome()} atacou ${alvo.getNome()}.`);
    }
}

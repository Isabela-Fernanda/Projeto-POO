import { Mapa } from "../../mapa/mapa.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Magia } from "./magia.ts";
import { AreaCircular } from "./utilitarios.ts";
import { EfeitoArea } from "../efeitoArea.ts";

export abstract class MagiaArea extends Magia {
    protected abstract afetarAlvo(usuario: Personagem, alvo: Personagem): void;

    protected abstract obterArea(): AreaCircular;

    protected criarEfeitoArea(x: number, y: number, cd: number): EfeitoArea | null {
        return null;
    }

    usarEmArea(usuario: Personagem, criaturas: Personagem[], centroX: number, centroY: number): void {
        const area = this.obterArea();

        const alvos = area.obterAlvos(centroX, centroY, usuario, criaturas);

        for (const alvo of alvos) {
            this.afetarAlvo(usuario, alvo);
        }
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        throw new Error(
            `${this.getNome()} deve ser usada através de usarEmArea()`
        );
    }

    executarArea(usuario: Personagem, mapa: Mapa, centroX: number, centroY: number): boolean {
        if (!usuario.gastarMana(this.getCustoMana())) {
            console.log(`${usuario.getNome()} não possui PM suficientes.`);
            return false;
        }

        const area = this.obterArea();
        const criaturas = mapa.getEntidadesEmRaio(centroX, centroY, area.getRaio());


        console.log(`${usuario.getNome()} usa ${this.getNome()}!`);

        this.usarEmArea(usuario, criaturas, centroX, centroY);

        const efeito = this.criarEfeitoArea(centroX, centroY, usuario.getCDMagia());

        if(efeito) {
            mapa.adicionarEfeitoArea(efeito);
        }

        return true;
    }
}
import { Mapa } from "../../mapa/mapa.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { Magia } from "./magia.ts";
import { AreaCircular } from "./utilitarios";
import { EfeitoArea } from "../efeitoArea.ts";

export abstract class MagiaArea extends Magia {
    protected abstract afetarAlvo(usuario: Personagem, alvo: Personagem): void;

    protected abstract obterArea(): AreaCircular;

    protected criarEfeitoArea(x: number, y: number, cd: number): EfeitoArea | null {
        return null;
    }

    usarEmArea(usuario: Personagem, criaturas: Personagem[]): void {
        const area = this.obterArea();

        const alvos = area.obterAlvos(usuario.getX(), usuario.getY(), usuario, criaturas);

        for (const alvo of alvos) {
            this.afetarAlvo(usuario, alvo);
        }
    }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        throw new Error(
            `${this.getNome()} deve ser usada através de usarEmArea()`
        );
    }

    executarArea(usuario: Personagem, mapa: Mapa): boolean {
        if (!usuario.gastarMana(this.getCustoMana())) {
            console.log(`${usuario.getNome()} não possui PM suficientes.`);
            return false;
        }

        const area = this.obterArea();
        const criaturas = mapa.getEntidadesEmRaio(usuario.getX(), usuario.getY(), area.getRaio());


        console.log(`${usuario.getNome()} usa ${this.getNome()}!`);

        this.usarEmArea(usuario, criaturas);

        const efeito = this.criarEfeitoArea(usuario.getX(), usuario.getY(), usuario.getCDMagia());

        if(efeito) {
            mapa.adicionarEfeitoArea(efeito);
        }

        return true;
    }
}
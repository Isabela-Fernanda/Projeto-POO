import { Personagem } from "../../personagens/personagem.ts";
import { Magia } from "./magia.ts";
import { AreaMagica } from "./utilitarios";

export abstract class MagiaArea extends Magia {
    protected abstract afetarAlvo(usuario: Personagem, alvo: Personagem): void;

    protected abstract obterArea(): AreaMagica;

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

    executarArea(usuario: Personagem, criaturas: Personagem[]): boolean {
        if (!usuario.gastarMana(this.getCustoMana())) {
            console.log(`${usuario.getNome()} não possui PM suficientes.`);
            return false;
        }

        console.log(`${usuario.getNome()} usa ${this.getNome()}!`);

        this.usarEmArea(usuario, criaturas);

        return true;
    }
}
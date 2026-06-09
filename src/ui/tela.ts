import { Personagem } from "../personagens/personagem.ts";
import { Atributos, TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Tela {

    static titulo(texto: string): void {

        console.log("\n====================");
        console.log(texto);
        console.log("====================\n");

    }

    static mostrarStatus(personagem: Personagem): void {
        console.log(
            `${personagem.getNome()}`
        );

        console.log(
            `HP: ${personagem.getVidaAtual()}/${personagem.getVidaMaxima()}`
        );
        
        console.log("");

    }

}

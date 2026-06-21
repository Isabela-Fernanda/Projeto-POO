import { Personagem } from "../personagens/personagem.ts";
import { Atributos, TipoAtributo } from "../personagens/atributos/atributos.ts";
import { Mapa } from "../mapa/mapa.ts";

export class Tela {

    static mostrarMapa(mapa: Mapa): void {
        console.log(mapa.renderizar());
    }

    static mostrarStatus(personagem: Personagem): void{

    }

    static mostrarCombate(): void{}

}

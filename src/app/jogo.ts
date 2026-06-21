import { Mapa } from "../mapa/mapa.ts";

import { Tela } from "../ui/tela.ts";
import { Jogador } from "../personagens/jogador.ts";

import { Item } from "../inventario/itens/item.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Armadura } from "../inventario/itens/armadura.ts";

import { CriacaoPersonagem } from "../criacao/criarPersonagem.ts";
import { Combate } from "../combate/combate.ts";
import { Time } from "../personagens/time.ts";

export class Jogo {

    async iniciar() {

        console.clear();
        console.log("=== RPG TORMENTA ===");

        console.log("\nCriando Personagem 1");

        const jogador = CriacaoPersonagem.criar();

        console.log("\nCriando inimigos");

        const inimigo1 = CriacaoPersonagem.criar();
        inimigo1.setTime(Time.INIMIGOS);

        const mapa = new Mapa();
        mapa.posicionarEntidade(jogador, 2, 2);
        mapa.posicionarEntidade(inimigo1, 8, 8);

        const combate = new Combate(mapa, [jogador, inimigo1,]);

        combate.iniciar();

        prompt("\nPressione Enter...");
    }
}
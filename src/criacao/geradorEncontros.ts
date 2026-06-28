import { Mapa } from "../mapa/mapa.ts";

import { FabricaMonstros } from "./fabricaDeMonstros.ts";
import { CatalogoMonstros } from "../personagens/tiposPersonagem/catalogoMonstros.ts";
import { CatalogoChaves } from "../itens/catalogos/catalogoChaves.ts";
import { CatalogoItensDiversos } from "../itens/catalogos/catalogoItensDiverso.ts";

export class GeradorEncontros {
    static criarEntrada(mapa: Mapa): void {
        const goblin = FabricaMonstros.criar(CatalogoMonstros.GOBLIN, [{
            item: CatalogoItensDiversos.BEBIDA_COMUM,
            chance: 100,
            quantidadeMin: 1,
            quantidadeMax: 1
        }]);
        mapa.posicionarEntidade(goblin, 8, 5);
    }

    static criarSalaGoblins(mapa: Mapa): void{
        const goblin1 = FabricaMonstros.criar(CatalogoMonstros.GOBLIN);

        const goblin2 = FabricaMonstros.criar(CatalogoMonstros.GOBLIN_ARQUEIRO);

        mapa.posicionarEntidade(goblin1, 25, 3);
        mapa.posicionarEntidade(goblin2, 30, 7);
    }

    static criarDeposito(mapa: Mapa): void {
        const goblin = FabricaMonstros.criar(CatalogoMonstros.GOBLIN_XAMA);
        mapa.posicionarEntidade(goblin, 28, 21);
    }   
    
    static criarChefe(mapa: Mapa): void{
        const chefe = FabricaMonstros.criar(CatalogoMonstros.HOBGOBLIN, [
        {
            item: CatalogoChaves.TESOURO_CHEFE,
            chance: 100,
            quantidadeMin: 1,
            quantidadeMax: 1
        }
    ]);

        const guarda1 = FabricaMonstros.criar(
            CatalogoMonstros.GOBLIN
        );

        const guarda2 = FabricaMonstros.criar(
            CatalogoMonstros.GOBLIN
        );

        mapa.posicionarEntidade(chefe, 7, 20);
        mapa.posicionarEntidade(guarda1, 5, 18);
        mapa.posicionarEntidade(guarda2, 10, 18); 
    }
}
import { Equipamento } from "@inventario/equipamento.js";
import { Inventario } from "@inventario/inventario.js";
import { Atributos } from "@personagens/atributos/atributos.js";
import { Guerreiro } from "@personagens/classes/guerreiro.js";
import { Anao } from "@personagens/racas/anao.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";

export class CriadorPersonagemTeste {
    static criar(): Jogador {
        const jogador = new Jogador("Ars", 1, new Anao(), new Guerreiro(), new Atributos(10, 10, 10, 10, 10, 10), new Inventario(), new Equipamento(), new Map(), new Map(), [], [], []);

        return jogador;
    }

}
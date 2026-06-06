import { Guerreiro } from "./personagens/classes/guerreiro.ts";
import { Humano } from "./racas/humano.ts";

import { Inventario } from "./inventario/inventario.ts";
import { Equipamento } from "./inventario/equipamento.ts";

import { Atributos } from "./personagens/atributos/atributos.ts";


const guerreiro = new Guerreiro(
    "Arthas",
    1, // Nível
    new Humano(),
    new Atributos(
        5, // Força
        2, // Destreza
        4, // Constituição
        1,  // Inteligência
        1, // Sabedoria
        1, // Carisma
    ),
    10, // Defesa
    20, // Vida Máxima
    0, // Mana Máxima
    new Inventario(),
    new Equipamento(),
        new Map(), // Perícias
        [] // Habilidades
);

const inimigo = new Guerreiro(
    "Globin",
    1, // Nível
    new Humano(),
    new Atributos(
        3, // Força 
        2, // Destreza
        2, // Constituição
        1,  // Inteligência
        1, // Sabedoria
        1, // Carisma
    ),
    10, // Defesa
    20, // Vida Máxima
    0, // Mana Máxima
    new Inventario(),
    new Equipamento(),
        new Map(), // Perícias
        [] // Habilidades
);

guerreiro.atacar(inimigo);
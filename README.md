# Tormenta RPG

Um RPG de turno desenvolvido em TypeScript inspirado nas mecânicas de sistemas de fantasia medieval, com foco em criação de personagens, exploração, combate e gerenciamento de campanha.

Atualmente na versão demo, o projeto busca simular uma experiência de RPG de mesa adaptada para o terminal, implementando sistemas como atributos, raças, classes, perícias, equipamentos, magias, monstros e progressão de aventura para um unico jogador/personagem.

## Funcionalidades

### Criação de Personagem

* Geração de atributos utilizando diferentes métodos;
* Escolha de raça e aplicação de habilidades raciais;
* Escolha de classes e poderes;
* Seleção de perícias;
* Sistema de equipamentos iniciais;
* Gerenciamento de vida e mana.

### Sistema de Combate

* Combate baseado em turnos;
* Ordem de iniciativa;
* Ataques físicos e mágicos;
* Cálculo de dano;
* Defesa e resistências;
* Efeitos e condições;
* Habilidades especiais.

### Magia e Habilidades

* Sistema de magias com diferentes círculos;
* Escolas e tipos de magia;
* Aplicação de efeitos;
* Habilidades de classe e raciais.

### Inventário e Equipamentos

* Gerenciamento de itens;
* Armas e armaduras;
* Equipamentos equipáveis;
* Drops de monstros;
* Recompensas de exploração.

### Exploração

* Sistema de mapas;
* Salas e masmorras;
* Eventos de exploração;
* Encontros aleatórios;
* Chefes e recompensas.

### Sistema de Salvamento

O jogo possui um sistema de save capaz de armazenar:

* Personagens disponíveis;
* Campanha atual;
* Progresso da aventura;
* Histórico de personagens.

Os arquivos de salvamento são gerados localmente e não fazem parte do controle de versão.

## Tecnologias utilizadas

* TypeScript
* Node.js
* Git

## Estrutura do Projeto

```
src/
├── app/              # Inicialização do jogo e menus
├── personagens/      # Classes, raças e personagens
├── combate/          # Sistema de batalha
├── poderes/          # Magias e habilidades
├── inventario/       # Itens, armas e equipamentos
├── monstros/         # Criaturas e encontros
├── mapas/            # Exploração e masmorras
├── save/             # Sistema de salvamento
└── utils/            # Classes auxiliares
```

## Como executar

Instale as dependências:

```bash
npm install
```

Execute o jogo:

```bash
npm run dev
```

## Objetivo do Projeto

Este projeto foi desenvolvido como estudo de programação orientada a objetos, buscando aplicar conceitos como:

* Herança;
* Encapsulamento;
* Abstração;
* Polimorfismo;
* Organização modular;
* Modelagem de sistemas complexos.

Além do aprendizado técnico, o projeto explora a adaptação de regras de RPG de mesa para um sistema digital.

## Estado Atual

O projeto possui uma base funcional contendo:

* Criação completa de personagens;
* Sistema de combate;
* Magias e habilidades;
* Monstros e encontros;
* Masmorra tutorial;
* Inventário;
* Salvamento de campanha.

Novos sistemas podem ser adicionados futuramente, como evolução de personagens, novas aventuras, NPCs e melhorias na interface.

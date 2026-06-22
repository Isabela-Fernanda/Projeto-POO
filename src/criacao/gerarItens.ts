import { Jogador } from "../personagens/jogador.ts";

import { Item } from "../inventario/itens/item.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Armadura } from "../inventario/itens/armadura.ts";
import { CatalogoItensDiversos } from "../inventario/itens/catalogoItensDiverso.ts";
import { CatalogoArmas } from "../inventario/itens/catalogoArmas.ts";
import { CatalogoArmaduras } from "../inventario/itens/catalogoArmadura.ts"

export type ItensIniciais = {
    mesa: Item[];
    bau: Item[];
    estante: Item[];
}

export class GeradorInicial {
    private itensIniciais: ItensIniciais = {
        mesa: [],
        bau: [],
        estante: []
    };

    private itensBasicos: Item[] = [
        CatalogoItensDiversos.CORDA_10M,
        CatalogoItensDiversos.MOCHILA,
        CatalogoItensDiversos.ODRE,
        CatalogoItensDiversos.RACAO_DE_VIAGEM_POR_DIA,
        CatalogoItensDiversos.RACAO_DE_VIAGEM_POR_DIA,
        CatalogoItensDiversos.RACAO_DE_VIAGEM_POR_DIA,
        CatalogoItensDiversos.RACAO_DE_VIAGEM_POR_DIA,
        CatalogoItensDiversos.RACAO_DE_VIAGEM_POR_DIA,
        CatalogoItensDiversos.SACO_DE_DORMIR,
        CatalogoItensDiversos.TOCHA,
        CatalogoItensDiversos.TRAJE_DE_PLEBEU
    ];

    private presenteAleatorio: Item[] = [
        CatalogoItensDiversos.TOCHA,
        CatalogoItensDiversos.CORDA_10M,
        //Add mais
    ]

    /* --------------------------------------------------------------- */
    /* ---------------------------- CLASSE --------------------------- */
    /* --------------------------------------------------------------- */
    private armasClasse: Record<string, Arma[]> = {
        "Arcanista": [CatalogoArmas.ADAGA, CatalogoArmas.BORDAO],

        "Bárbaro": [CatalogoArmas.MACHADO_DE_BATALHA, CatalogoArmas.MACHADO_DE_GUERRA, CatalogoArmas.TACAPE, CatalogoArmas.LANCA],

        "Bardo": [CatalogoArmas.ESPADA_CURTA, CatalogoArmas.FLORETE, CatalogoArmas.ADAGA],

        "Bucaneiro": [CatalogoArmas.FLORETE, CatalogoArmas.ADAGA, CatalogoArmas.PISTOLA],

        "Caçador": [CatalogoArmas.ARCO_LONGO, CatalogoArmas.ARCO_CURTO, CatalogoArmas.MACHADINHA],

        "Cavaleiro": [CatalogoArmas.ESPADA_LONGA, CatalogoArmas.LANCA_MONTADA, CatalogoArmas.MACA],

        "Clérigo": [CatalogoArmas.MACA, CatalogoArmas.BORDAO],

        "Druida": [CatalogoArmas.FOICE, CatalogoArmas.BORDAO, CatalogoArmas.LANCA],

        "Guerreiro": [CatalogoArmas.ESPADA_LONGA, CatalogoArmas.MACHADO_DE_BATALHA, CatalogoArmas.MARTELO_DE_GUERRA, CatalogoArmas.ALABARDA],

        "Inventor": [CatalogoArmas.PISTOLA, CatalogoArmas.BESTA_LEVE, CatalogoArmas.ADAGA],

        "Ladino": [CatalogoArmas.ADAGA, CatalogoArmas.ESPADA_CURTA, CatalogoArmas.ARCO_CURTO],

        "Lutador": [CatalogoArmas.MANOPLA],

        "Nobre": [CatalogoArmas.ESPADA_LONGA, CatalogoArmas.FLORETE],

        "Paladino": [CatalogoArmas.ESPADA_LONGA, CatalogoArmas.MACA, CatalogoArmas.MARTELO_DE_GUERRA]
    }

    private armadurasClasse: Record<string, Armadura[]> = {
        "Arcanista": [CatalogoArmaduras.ARMADURA_ACOLCHOADA],

        "Bárbaro": [CatalogoArmaduras.GIBAO_DE_PELES],

        "Bardo": [CatalogoArmaduras.ARMADURA_DE_COURO],

        "Bucaneiro": [CatalogoArmaduras.ARMADURA_DE_COURO],

        "Caçador": [CatalogoArmaduras.COURO_BATIDO],

        "Cavaleiro": [CatalogoArmaduras.BRUNEA, CatalogoArmaduras.ESCUDO_PESADO],

        "Clérigo": [CatalogoArmaduras.BRUNEA, CatalogoArmaduras.ESCUDO_LEVE],

        "Druida": [CatalogoArmaduras.ARMADURA_DE_COURO],

        "Guerreiro": [CatalogoArmaduras.COTA_DE_MALHA, CatalogoArmaduras.ESCUDO_PESADO],

        "Inventor": [CatalogoArmaduras.ARMADURA_DE_COURO],

        "Ladino": [CatalogoArmaduras.ARMADURA_DE_COURO],

        "Nobre": [CatalogoArmaduras.ARMADURA_DE_COURO],

        "Paladino": [CatalogoArmaduras.COTA_DE_MALHA, CatalogoArmaduras.ESCUDO_PESADO]
    }

    private itensClasse: Record<string, Item[]> = {
        "Arcanista": [CatalogoItensDiversos.ESSENCIA_DE_MANA, CatalogoItensDiversos.PERGAMINHO_FOLHA, CatalogoItensDiversos.TINTA_FRASCO],

        "Bárbaro": [CatalogoItensDiversos.CORDA_10M, CatalogoItensDiversos.TOCHA],

        "Bardo": [CatalogoItensDiversos.INSTRUMENTO_MUSICAL],

        "Bucaneiro": [CatalogoItensDiversos.CORDA_10M],

        "Caçador": [CatalogoItensDiversos.FLECHA_20, CatalogoItensDiversos.FLECHA_20, CatalogoItensDiversos.TRAJE_CAMUFLADO],

        "Cavaleiro": [CatalogoItensDiversos.SELA],

        "Clérigo": [CatalogoItensDiversos.AGUA_BENTA, CatalogoItensDiversos.KIT_DE_MEDICAMENTOS],

        "Druida": [CatalogoItensDiversos.KIT_DE_MEDICAMENTOS],

        "Inventor": [CatalogoItensDiversos.KIT_DE_OFICIO, CatalogoItensDiversos.PEDERNEIRA],

        "Ladino": [CatalogoItensDiversos.KIT_DE_LADRAO],

        "Lutador": [CatalogoItensDiversos.CORDA_10M],

        "Nobre": [CatalogoItensDiversos.TRAJE_DA_CORTE],

        "Paladino": [CatalogoItensDiversos.AGUA_BENTA]
    }

    /* ----------------------------------------------------------- */
    /* -------------------------- RAÇAS -------------------------- */
    /* ----------------------------------------------------------- */

    private armasRaca: Record<string, Arma[]> = {
        "Anão": [CatalogoArmas.MARTELO_DE_GUERRA, CatalogoArmas.MACHADO_ANAO],

        "Elfo": [CatalogoArmas.ARCO_LONGO, CatalogoArmas.FLORETE],

        "Minotauro": [CatalogoArmas.MACHADO_TAURICO],

        "SereiaTritão": [CatalogoArmas.TRIDENTE]
    }

    private itensRaca: Record<string, Item[]> = {
        "Goblin": [CatalogoItensDiversos.BOMBA]
    }

    gerar(personagem: Jogador): ItensIniciais {
        this.itensIniciais = {
            mesa: [],
            bau: [],
            estante: []
        };

        this.itensIniciais.mesa.push(...this.itensBasicos);

        this.sortearClasse(personagem);
        this.sortearRaca(personagem);

        return this.itensIniciais;
    }

    private adicionarItensBasicos(itens: Item[]): void {
        //Já adicionar nos locais devidos
    }

    private adicionarItensSorteados(itens: Item[]): void {
        //Colocar nos lugares aleatóriamente
    }

    private sortearRaca(personagem: Jogador): void {
        const raca = personagem.getRaca()?.getNome() ?? "";

        const arma = this.sortear(this.armasRaca[raca] ?? []);
        const item = this.sortear(this.itensRaca[raca] ?? []);

        if (arma) this.itensIniciais.estante.push(arma);

        if (item) this.itensIniciais.estante.push(item);
    }

    private sortearClasse(personagem: Jogador): void {
        const classe = personagem.getClasse()?.getNome() ?? "";

        const arma = this.sortear(this.armasClasse[classe] ?? []);
        const armadura = this.sortear(this.armadurasClasse[classe] ?? []);
        const item = this.sortear(this.itensClasse[classe] ?? []);

        if (arma) {
            this.itensIniciais.bau.push(arma);
            switch (arma) {
                case CatalogoArmas.ARCO_CURTO:
                case CatalogoArmas.ARCO_LONGO:
                    this.itensIniciais.bau.push(CatalogoItensDiversos.FLECHA_20);
                    break;
                case CatalogoArmas.BESTA_LEVE:
                case CatalogoArmas.BESTA_PESADA:
                    this.itensIniciais.bau.push(CatalogoItensDiversos.VIROTES_20);
                    break;
                case CatalogoArmas.PISTOLA:
                case CatalogoArmas.MOSQUETE:
                    this.itensIniciais.bau.push(CatalogoItensDiversos.MUNICAO_20);
                    break;
            }
        }

        if (armadura) this.itensIniciais.bau.push(armadura);

        if (item) this.itensIniciais.estante.push(item);
    }

    private sortear<T>(lista: T[]): T | undefined {
        if (lista.length === 0) {
            return undefined;
        }
        return lista[Math.floor(Math.random() * lista.length)];
    }
}

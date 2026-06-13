import { Habilidade } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { Tags } from "../../poderes/tags.ts";

export class Hibrido extends Habilidade {
    constructor() {
        super("Híbrido", "Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Híbrido é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {

        console.log("\n=== HABILIDADE RACIAL: HÍBRIDO ===");

        for (let i = 0; i < 1; i++) {
            while (true) {
                const pericia = CatalogoPericias.escolherPericia(CatalogoPericias.getTodas());

                if (personagem.possuiPericia(pericia)) {
                    console.log("Você já possui essa perícia.");
                    continue;
                }

                personagem.adicionarPericia(pericia);

                console.log(`Perícia ${pericia.getNome()} adicionada.`);

                break;
            }
        }
    }
}

export class LogicaGnomica extends Habilidade {
    constructor() {
        super("Lógica Gnômica", "Quando faz um teste de atributo ou perícia, você pode gastar 2 PM para substituir o modificador de atributo utilizado por Inteligência. Por exemplo, ao fazer um teste de Atletismo você pode gastar 2 PM para usar seu modificador de Inteligência em vez do modificador de Força.", 2);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Lógica Gnômica é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarTag(Tags.LOGICA_GNOMICA);
    }
}

export class OssosFrageis extends Habilidade {
    constructor() {
        super("Ossos Frágeis", "Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6+2 pontos de dano.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Ossos Frágeis é uma habilidade passiva.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {
        personagem.adicionarTag(Tags.OSSOS_FRAGEIS);
    }
}

// Continuar a aplicar depois
export class Vanguardista extends Habilidade {
    constructor() {
        super("Vanguardista", "Você recebe proficiência em armas de fogo e +2 em testes de Ofício (um qualquer, a sua escolha).", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Vanguardista é uma habilidade passiva.");
    }
}

import { CatalogoPericias } from "../../pericias/catalogoPericias";
import { Personagem } from "../../personagens/personagem";
import { Habilidade } from "../habilidades";

export class Versatil extends Habilidade {
    constructor() {
        super("Versátil", "Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.", 0);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log("Versátil não possui uso ativo.");
    }

    override ehHabilidadeCriacao(): boolean {
        return true;
    }

    override aplicarCriacao(personagem: Personagem): void {

        console.log("\n=== HABILIDADE RACIAL: VERSÁTIL ===");

        for (let i = 0; i < 2; i++) {
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
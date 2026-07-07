import { Dado } from "../dado.js";
import { Pericia } from "../../pericias/pericia.js";
import { Personagem } from "../../personagens/personagem.js";
import { CalculadoraPericia } from "../calcular/calculadoraPericia.js";
import { ResultadoTeste } from "../resultados/resultadoTeste.js";
import { Tags } from "../../poderes/tags.js";
import { Luminosidade, Sala } from "../../mapa/sala.js";
import { CatalogoPericias } from "../../pericias/catalogoPericias.js";

export class TestePericia {
    static executar(personagem: Personagem, pericia: Pericia, cd: number, bonusEfeitoResistencia: number): ResultadoTeste {
        const rolagem = Dado.d20();

        let modificador = CalculadoraPericia.calcular(personagem, pericia) + bonusEfeitoResistencia;

        const sala = personagem.getSalaAtual()

        if((pericia === CatalogoPericias.PERCEPCAO || pericia === CatalogoPericias.SOBREVIVENCIA) && personagem.possuiTag(Tags.CONHECIMENTO_DAS_ROCHAS) && sala?.ehSubterraneo()){
            modificador += 2;
        }

        if(sala?.getIluminacaoAmbiente() === Luminosidade.PENUMBRA && !personagem.possuiTag(Tags.VISAO_NA_PENUMBRA)) {
            modificador -= 3;
        }

        if(sala?.getIluminacaoAmbiente() === Luminosidade.ESCURO && !personagem.possuiTag(Tags.VISAO_NO_ESCURO)) {
            if(!personagem.possuiTag(Tags.VISAO_NA_PENUMBRA)){
                modificador -= 3;
            }
            modificador -= 3;  
        }

        const total = rolagem + modificador;

        console.log(`${personagem.getNome()} tenta resistir e faz um Teste de ${pericia.getNome().toLocaleUpperCase()}.`)
        /* console.log(`Rolagem: ${rolagem}`);
        console.log(`Modificador: ${modificador}`);
        console.log(`Total: ${total}`);
        console.log(`CD: ${cd}`); */

        let sucesso = total >= cd;

        if(rolagem === 20) {
            console.log("\n20 NATURAL!");
            sucesso = true;
        }

        if(rolagem === 1) {
            console.log("\n1 NATURAL!");
            sucesso = false;
        }

        console.log(sucesso ? "SUCESSO!" : "FALHA!");

        return new ResultadoTeste (rolagem, total, sucesso);
    }
} 
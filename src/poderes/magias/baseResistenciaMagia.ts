import { Habilidade, TipoAcao, TipoAlvo } from "../habilidades.ts";
import { Personagem } from "../../personagens/personagem.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { CalcularResistencia } from "../../combate/calcular/calcularResistencia.ts";

export abstract class ResistenciaMagia extends Habilidade {
    constructor(
        nome: string,
        descricao: string,
        custoMana: number,
        tipoDano: TipoDano,
        tipoAlvo: TipoAlvo
    ) {
        super(nome, descricao, custoMana, TipoAcao.PADRAO, tipoAlvo);

        this.tipoDano = tipoDano;
    }

    protected tipoDano: TipoDano;

    protected alvoFalhou(usuario: Personagem, alvo: Personagem): void { }

    protected alvoPassou(usuario: Personagem, alvo: Personagem): void { }

    override usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        const resultado = CalcularResistencia.executarCalculo(alvo, this.tipoDano, usuario.getCDMagia());

        if (!resultado.sucesso) {
            this.alvoPassou(usuario, alvo);
        } else {
            this.alvoFalhou(usuario, alvo);
        }
    }
}
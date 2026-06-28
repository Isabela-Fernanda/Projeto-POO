import { Magia, CirculoMagia, EscolaMagia, TipoMagia } from "./magia.ts"

import { MagiaAdagaMental } from "./circulo_1/magiaAdagaMental.ts";
import { MagiaAmedrontar } from "./circulo_1/magiaAmedrontar.ts";
import { MagiaArmaduraArcana } from "./circulo_1/magiaArmaduraArcana.ts";
import { MagiaArmaMagica } from "./circulo_1/magiaArmaMagica.ts";
import { MagiaAviso } from "./circulo_1/magiaAviso.ts";
import { MagiaConcentracaoDeCombate } from "./circulo_1/magiaConcentracaoDeCombate.ts";
import { MagiaEnfeiticar } from "./circulo_1/magiaEnfeiticar.ts";
import { MagiaHipnotismo } from "./circulo_1/magiaHipnotismo.ts";
import { MagiaImagemEspelhada } from "./circulo_1/magiaImagemEspelhada.ts";
import { MagiaLequeCromatico } from "./circulo_1/magiaLequeCromatico.ts";
import { MagiaPrimorAtletico } from "./circulo_1/magiaPrimorAtletico.ts";
import { MagiaRaioDoEnfraquecimento } from "./circulo_1/magiaRaioDoEnfraquecimento.ts";
import { MagiaResistenciaAEnergia } from "./circulo_1/magiaResistenciaAEnergia.ts";
import { MagiaSono } from "./circulo_1/magiaSono.ts";
import { MagiaToqueChocante } from "./circulo_1/magiaToqueChocante.ts";
import { MagiaVisaoMistica } from "./circulo_1/magiaVisaoMistica.ts";
import { MagiaVitalidadeFantasma } from "./circulo_1/magiaVitalidadeFantasma.ts";

export class CatalogoMagias {
    static criar(nome: string): Magia {
        const magia = this.magias.get(nome);

        if (!magia) {
            throw new Error(`Magia não encontrada: ${nome}`);
        }

        return magia();
    }

    static obterMagiasTipo(tipo: TipoMagia): Magia[] {
        return [...this.magias.values()].map(m => m()).filter(magia => magia.getTipoMagia() === tipo);
    }

    static obterMagiasCirculo(circulo: CirculoMagia): Magia[] {
        return [...this.magias.values()].map(m => m()).filter(magia => magia.getCirculo() === circulo);
    }

    static obterMagiasEscola(escola: EscolaMagia): Magia[] {
        return [...this.magias.values()].map(m => m()).filter(magia => magia.getEscola() === escola);
    }

    static obterMagiasTipoCirculo(tipo: TipoMagia, circulo: CirculoMagia): Magia[] {
        return [...this.magias.values()].map(m => m()).filter(magia => magia.getTipoMagia() === tipo && magia.getCirculo() === circulo);
    }

    static obterMagiasEscolaTipoCirculo(escola: EscolaMagia, tipo: TipoMagia, circulo: CirculoMagia): Magia[] {
        return [...this.magias.values()].map(m => m()).filter(magia => magia.getEscola() === escola && magia.getTipoMagia() === tipo && magia.getCirculo() === circulo);
    }

    private static readonly magias = new Map<string, () => Magia>([
        ["Adaga Mental", () => new MagiaAdagaMental()],
        ["Amedrontar", () => new MagiaAmedrontar()],
        ["Arma Mágica", () => new MagiaArmaMagica()],
        ["Armadura Arcana", () => new MagiaArmaduraArcana()],
        ["Concentração de Combate", () => new MagiaConcentracaoDeCombate()],
        ["Enfeitiçar", () => new MagiaEnfeiticar()],
        ["Hipnotismo", () => new MagiaHipnotismo()],
        ["Primor Atlético", () => new MagiaPrimorAtletico()],
        ["Raio do Enfraquecimento", () => new MagiaRaioDoEnfraquecimento()],
        ["Resistência a Energia", () => new MagiaResistenciaAEnergia()],
        ["Sono", () => new MagiaSono()],
        ["Toque Chocante", () => new MagiaToqueChocante()],
        ["Vitalidade Fantasma", () => new MagiaVitalidadeFantasma()],
        /* ["", () => new ()], */
    ]);
}
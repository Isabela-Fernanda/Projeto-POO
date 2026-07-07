import { Magia, CirculoMagia, EscolaMagia, TipoMagia } from "./magia.js"

import { MagiaAdagaMental } from "./circulo_1/magiaAdagaMental.js";
import { MagiaAmedrontar } from "./circulo_1/magiaAmedrontar.js";
import { MagiaArmaduraArcana } from "./circulo_1/magiaArmaduraArcana.js";
import { MagiaArmaMagica } from "./circulo_1/magiaArmaMagica.js";
import { MagiaAviso } from "./circulo_1/magiaAviso.js";
import { MagiaConcentracaoDeCombate } from "./circulo_1/magiaConcentracaoDeCombate.js";
import { MagiaEnfeiticar } from "./circulo_1/magiaEnfeiticar.js";
import { MagiaHipnotismo } from "./circulo_1/magiaHipnotismo.js";
import { MagiaImagemEspelhada } from "./circulo_1/magiaImagemEspelhada.js";
import { MagiaLequeCromatico } from "./circulo_1/magiaLequeCromatico.js";
import { MagiaPrimorAtletico } from "./circulo_1/magiaPrimorAtletico.js";
import { MagiaRaioDoEnfraquecimento } from "./circulo_1/magiaRaioDoEnfraquecimento.js";
import { MagiaResistenciaAEnergia } from "./circulo_1/magiaResistenciaAEnergia.js";
import { MagiaSono } from "./circulo_1/magiaSono.js";
import { MagiaToqueChocante } from "./circulo_1/magiaToqueChocante.js";
import { MagiaVisaoMistica } from "./circulo_1/magiaVisaoMistica.js";
import { MagiaVitalidadeFantasma } from "./circulo_1/magiaVitalidadeFantasma.js";

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
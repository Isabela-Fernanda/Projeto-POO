import { Time } from "./time.ts";

import { Raca } from "../racas/raca.ts";
import { Classe } from "./classes/classe.ts";
import { Atributos, TipoAtributo } from "./atributos/atributos.ts";

import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Armadura } from "../inventario/itens/armadura.ts";

import { Pericia } from "../pericias/pericia.ts";
import { GrauTreinamento } from "../pericias/grauTreinamento.ts";

import { Habilidade } from "../habilidades/habilidades.ts";
import { Efeito } from "../habilidades/efeito.ts";
import { Condicao } from "../combate/tipoCondicao.ts";

import { CalculadoraDefesa } from "../combate/calcular/calcularDefesa.ts";
import { Tags } from "../poderes/tags.ts";
import { TipoEnergia } from "../poderes/tipoEnergia.ts";

export abstract class Personagem {
    protected vidaAtual: number;
    protected vidaMaxima: number;
    protected manaAtual: number;
    protected manaMaxima: number;
    protected deslocamento: number;
    protected bonusDefesa: number = 0;
    protected bonusDefesaTemporario: number = 0;
    protected tags: Tags[] = [];
    protected imunidadesEnergia: TipoEnergia[] = [];
    private poderesTormenta = 0;
    private efeitos: Efeito[] = [];

    constructor(
        protected nome: string,
        protected nivel: number,
        protected time: Time,
        protected raca: Raca,
        protected classe: Classe | null,
        protected atributos: Atributos,
        protected inventario: Inventario,
        protected equipamento: Equipamento,
        protected pericias: Map<Pericia, GrauTreinamento>,
        protected bonusPericias: Map<Pericia, number> = new Map(),
        protected habilidades: Habilidade[],
    ) {
        this.vidaMaxima = (classe?.getVidaInicial() ?? 0) + this.getConstituicao();
        this.manaMaxima = (classe?.getManaInicial() ?? 0);

        this.vidaAtual = this.vidaMaxima;
        this.manaAtual = this.manaMaxima;

        this.deslocamento = 9;
    }

    abstract atacar(alvo?: Personagem): void;

    receberDano(dano: number): void {
        this.vidaAtual -= dano;

        if (this.vidaAtual < 0) {
            this.vidaAtual = 0;
        }

        if (!this.estaVivo()) {
            console.log(`${this.nome} foi derrotado!`)
        }
    }

    estaVivo(): boolean {
        return this.vidaAtual > 0;
    }

    getNome(): string {
        return this.nome;
    }

    getNivel(): number {
        return this.nivel;
    }

    getTime(): Time {
        return this.time;
    }

    setTime(time: Time): void {
        this.time = time;
    }

    getClasse(): Classe | null {
        return this.classe;
    }

    getRaca(): Raca {
        return this.raca;
    }

    getInventario(): Inventario {
        return this.inventario;
    }

    getCDMagia(): number {
        return 10 + Math.floor(this.nivel / 2) + this.getModificadorAtributo(TipoAtributo.SABEDORIA);
    }

    /* ------------------------------------------------------------ */
    /* --------------------------- VIDA --------------------------- */
    /* ------------------------------------------------------------ */

    getVidaAtual(): number {
        return this.vidaAtual;
    }

    getVidaMaxima(): number {
        return this.vidaMaxima;
    }

    aumentarVidaMaxima(valor: number): void {
        this.vidaMaxima += valor;
        this.vidaAtual += valor;
    }

    regenerarVida(valor: number): void {
        this.vidaAtual += valor;

        if (this.vidaAtual > this.vidaMaxima) {
            this.vidaAtual = this.vidaMaxima;
        }
    }

    /* ------------------------------------------------------------ */
    /* -------------------------- MANA ---------------------------- */
    /* ------------------------------------------------------------ */

    getManaAtual(): number {
        return this.manaAtual;
    }

    getManaMaxima(): number {
        return this.manaMaxima;
    }

    aumentarManaMaxima(valor: number): void {
        this.manaMaxima += valor;
        this.manaAtual += valor;
    }

    gastarMana(valor: number): boolean {
        if (this.manaAtual < valor) {
            return false;
        }

        this.manaAtual -= valor;
        return true;
    }

    regenerarMana(valor: number): void {
        this.manaAtual += valor;

        if (this.manaAtual > this.manaMaxima) {
            this.manaAtual = this.manaMaxima;
        }
    }

    /* ------------------------------------------------------------ */
    /* ---------------------- DESLOCAMENTO ------------------------ */
    /* ------------------------------------------------------------ */

    getDeslocamento(): number {
        let bonusEfeito = 0;

        for (const efeito of this.efeitos) {
            bonusEfeito += efeito.getBonusDeslocamento();
        }

        return Math.max(0, this.deslocamento + bonusEfeito);
    }
    setDeslocamento(valor: number): void {
        this.deslocamento = valor;
    }

    /* ------------------------------------------------------------ */
    /* --------------------------- TAG ---------------------------- */
    /* ------------------------------------------------------------ */

    adicionarTag(tag: Tags): void {
        this.tags.push(tag);
    }

    possuiTag(tag: Tags): boolean {
        return this.tags.includes(tag);
    }

    getTags(): Tags[] {
        return [...this.tags];
    }

    /* ------------------------------------------------------------ */
    /* ------------------------- ENERGIA -------------------------- */
    /* ------------------------------------------------------------ */

    adicionarImunidadeEnergia(energia: TipoEnergia): void {
        this.imunidadesEnergia.push(energia);
    }

    /* ------------------------------------------------------------ */
    /* ------------------------ ATRIBUTOS ------------------------- */
    /* ------------------------------------------------------------ */

    getAtributos(): Atributos {
        return this.atributos;
    }

    getForca(): number {
        return (this.atributos.getAtributo(TipoAtributo.FORCA));
    }
    getDestreza(): number {
        return (this.atributos.getAtributo(TipoAtributo.DESTREZA));
    }
    getConstituicao(): number {
        return (this.atributos.getAtributo(TipoAtributo.CONSTITUICAO));
    }
    getInteligencia(): number {
        return (this.atributos.getAtributo(TipoAtributo.INTELIGENCIA));
    }
    getSabedoria(): number {
        return (this.atributos.getAtributo(TipoAtributo.SABEDORIA));
    }
    getCarisma(): number {
        return (this.atributos.getAtributo(TipoAtributo.CARISMA));
    }

    getAtributo(tipo: TipoAtributo): number {
        switch (tipo) {
            case TipoAtributo.FORCA:
                return this.getForca();

            case TipoAtributo.DESTREZA:
                return this.getDestreza();

            case TipoAtributo.CONSTITUICAO:
                return this.getConstituicao();

            case TipoAtributo.INTELIGENCIA:
                return this.getInteligencia();

            case TipoAtributo.SABEDORIA:
                return this.getSabedoria();

            case TipoAtributo.CARISMA:
                return this.getCarisma();
        }
    }

    getModificadorAtributo(tipo: TipoAtributo): number {
        const valor = this.getAtributo(tipo);

        return Atributos.calcularModificador(valor);
    }

    /* ------------------------------------------------------------ */
    /* ------------------------- DEFESA --------------------------- */
    /* ------------------------------------------------------------ */

    getDefesa(): number {
        return CalculadoraDefesa.calcular(this);
    }

    adicionarBonusDefesa(valor: number): void {
        this.bonusDefesa += valor;
    }

    getBonusDefesa(): number {
        return this.bonusDefesa;
    }

    /* ------------------------------------------------------------ */
    /* ---------------------- HABILIDADES ------------------------- */
    /* ------------------------------------------------------------ */

    adicionarHabilidade(habilidade: Habilidade): void {
        if (this.possuiHabilidade(habilidade.getNome())) {
            return;
        }

        this.habilidades.push(habilidade);
    }

    getHabilidades(): Habilidade[] {
        return this.habilidades;
    }

    possuiHabilidade(nome: string): boolean {
        return this.habilidades.some(habilidade =>
            habilidade.getNome() === nome
        );
    }

    /* ------------------------------------------------------------ */
    /* ---------------------- EQUIPAMENTO ------------------------- */
    /* ------------------------------------------------------------ */

    getEquipamento(): Equipamento {
        return this.equipamento;
    }

    equiparArma(arma: Arma): void {
        this.equipamento.equiparArma(arma);
    }

    equiparProtecao(armadura: Armadura): void {
        this.equipamento.equiparProtecao(armadura);
    }

    /* ------------------------------------------------------------ */
    /* ------------------------- PERICIA -------------------------- */
    /* ------------------------------------------------------------ */

    adicionarPericia(pericia: Pericia, grau: GrauTreinamento = GrauTreinamento.TREINADO): void {
        this.pericias.set(pericia, grau);
    }

    adicionarBonusPericia(pericia: Pericia, valor: number): void {
        const atual = this.bonusPericias.get(pericia) ?? 0;

        this.bonusPericias.set(pericia, atual + valor);
    }

    getPericias(): Map<Pericia, GrauTreinamento> {
        return this.pericias;
    }

    getBonusPericia(pericia: Pericia): number {
        return this.bonusPericias.get(pericia) ?? 0;
    }

    getGrauTreinamento(pericia: Pericia): GrauTreinamento {
        return (this.pericias.get(pericia) ?? GrauTreinamento.DESTREINADO);
    }

    possuiPericia(pericia: Pericia): boolean {
        return this.pericias.has(pericia);
    }

    /* ------------------------------------------------------------ */
    /* -------------------- PODER DA TORMENTA --------------------- */
    /* ------------------------------------------------------------ */

    adicionarPoderTormenta(quantidade: number = 1): void {
        this.poderesTormenta += quantidade;
    }

    getQuantidadePoderesTormenta(): number {
        return this.poderesTormenta;
    }

    /* ------------------------------------------------------------ */
    /* -------------------- EFEITOS --------------------- */
    /* ------------------------------------------------------------ */

    adicionarEfeito(efeito: Efeito): void {
        this.efeitos.push(efeito);

        console.log(`${this.nome} recebeu o efeito ${efeito.getNome()}`)
    }

    removerEfeito(efeito: Efeito): void {
        this.efeitos = this.efeitos.filter(e => e !== efeito);
    }

    possuiCondicao(condicao: Condicao): boolean {
        return this.efeitos.some(
            efeito => efeito.possuiCondicao(condicao)
        );
    }

    podeAgir(): boolean {
        return this.efeitos.every(efeito => efeito.podeAgir());
    }

    getEfeitos(): Efeito[] {
        return this.efeitos;
    }

    listarEfeitos(): void {
        if (this.efeitos.length === 0) {
            return;
        }

        console.log("Efeitos:");
        for (const efeito of this.efeitos) {
            console.log(`${efeito.getNome()} (${efeito.getDuracao()} rodadas)`);
        }
    }

    somarBonusEfeitos(seletor: (efeito: Efeito) => number): number {
        let total = 0;

        for (const efeito of this.efeitos) {
            total += seletor(efeito);
        }

        return total;
    }

    atualizarEfeitos(): void {
        for (const efeito of this.efeitos) {
            efeito.processar(this);
            efeito.reduzirDuracao();
        }

        this.efeitos = this.efeitos.filter(e => !e.expirou());
    }

}
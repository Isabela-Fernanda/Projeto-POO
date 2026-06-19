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

import { Habilidade } from "../poderes/habilidades.ts";
import { Efeito } from "../poderes/efeito.ts";
import { Condicao } from "../combate/tipoCondicao.ts";

import { CalculadoraDefesa } from "../combate/calcular/calcularDefesa.ts";
import { Tags } from "../poderes/tags.ts";
import { TipoEnergia } from "../poderes/tipoEnergia.ts";
import { TipoDano } from "../combate/tipoDano.ts";

export abstract class Personagem {
    protected vidaAtual: number;
    protected vidaMaxima: number;
    protected manaAtual: number;
    protected manaMaxima: number;

    protected deslocamento: number;
    protected posX: number = 0;
    protected posY: number = 0;

    protected bonusDefesa: number = 0;
    private poderesTormenta = 0;

    private criaturasInvocadas: Personagem[] = [];
    private efeitos: Efeito[] = [];
    protected tags: Tags[] = [];
    protected imunidadesEnergia: TipoEnergia[] = [];

    private vidaTemporaria = 0;
    protected defesaTemporaria: number = 0;

    private resistencias = new Map<TipoDano, number>();
    private bonusAtributos = new Map<TipoAtributo, number>();

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
        if (this.vidaTemporaria > 0) {
            const absorvido = Math.min(this.vidaTemporaria, dano);
            this.vidaTemporaria -= absorvido;
            dano -= absorvido;
        }

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

    getResistencia(tipo: TipoDano): number {
        return this.resistencias.get(tipo) ?? 0;
    }

    adicionarResistencia(tipo: TipoDano, valor: number): void {
        this.resistencias.set(tipo, valor);
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

    getX(): number {
        return this.posX;
    }

    getY(): number {
        return this.posY;
    }

    setPosicao(x: number, y: number): void {
        this.posX = x;
        this.posY = y;
    }

    moverPara(x: number, y: number): void {
        this.posX = x;
        this.posY = y;
    }

    estaAdjacente(alvo: Personagem): boolean {
        const dx = Math.abs(this.getX() - alvo.getX());
        const dy = Math.abs(this.getY() - alvo.getY());
        return dx <= 1 && dy <= 1;
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
        return (this.atributos.getAtributo(TipoAtributo.FORCA) + this.getBonusAtributo(TipoAtributo.FORCA));
    }
    getDestreza(): number {
        return (this.atributos.getAtributo(TipoAtributo.DESTREZA) + this.getBonusAtributo(TipoAtributo.DESTREZA));
    }
    getConstituicao(): number {
        return (this.atributos.getAtributo(TipoAtributo.CONSTITUICAO) + this.getBonusAtributo(TipoAtributo.CONSTITUICAO));
    }
    getInteligencia(): number {
        return (this.atributos.getAtributo(TipoAtributo.INTELIGENCIA) + this.getBonusAtributo(TipoAtributo.INTELIGENCIA));
    }
    getSabedoria(): number {
        return (this.atributos.getAtributo(TipoAtributo.SABEDORIA) + this.getBonusAtributo(TipoAtributo.SABEDORIA));
    }
    getCarisma(): number {
        return (this.atributos.getAtributo(TipoAtributo.CARISMA) + this.getBonusAtributo(TipoAtributo.CARISMA));
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

    private getBonusAtributo(tipo: TipoAtributo): number {
        return this.bonusAtributos.get(tipo) ?? 0;
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

    equiparMaoDireita(arma: Arma): void {
        this.equipamento.equiparMaoDireita(arma);
    }

    equiparMaoEsquerda(arma: Arma): void {
        this.equipamento.equiparMaoEsquerda(arma);
    }

    equiparDuasMãos(arma: Arma): void {
        this.equipamento.equiparDuasMaos(arma);
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
        const tagsAnuladas = efeito.getTagsAnuladas();

        this.efeitos = this.efeitos.filter(e => {
            const possuiTagAnulada = e.getTags().some(tag => tagsAnuladas.includes(tag));

            if (possuiTagAnulada) {
                console.log(`${efeito.getNome()} anulou ${e.getNome()}`);
            }

            return !possuiTagAnulada;
        });

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
        const novosEfeitos: Efeito[] = [];

        for (const efeito of this.efeitos) {
            efeito.processar(this);
            efeito.reduzirDuracao();

            if (efeito.expirou()) {
                const sucessor = efeito.getProximoEfeito();

                if (sucessor) {
                    novosEfeitos.push(sucessor);
                    console.log(`${efeito.getNome()} evoluiu para ${sucessor.getNome()}`);
                }
            } else {
                novosEfeitos.push(efeito);
            }
        }

        this.efeitos = novosEfeitos;
    }

    //BONUS DE EFEITO
    getBonusIniciativa(): number {
        return this.efeitos.reduce((total, efeito) => total + efeito.getBonusIniciativa(), 0);
    }

    getBonusPercepcao(): number {
        return this.efeitos.reduce((total, efeito) => total + efeito.getBonusPercepcao(), 0);
    }

    adicionarInvocacao(criatura: Personagem): void {
        this.criaturasInvocadas.push(criatura);
    }

    adicionarBonusAtributo(tipo: TipoAtributo, valor: number): void {
        const atual = this.bonusAtributos.get(tipo) ?? 0;

        this.bonusAtributos.set(tipo, atual + valor);
    }

    removerBonusAtributo(tipo: TipoAtributo, valor: number): void {
        const atual = this.bonusAtributos.get(tipo) ?? 0;
        this.bonusAtributos.set(tipo, atual - valor);
    }

    //TEMPORARIOS
    getVidaTemporaria(): number {
        return this.vidaTemporaria;
    }

    adicionarVidaTemporaria(valor: number): void {
        this.vidaTemporaria += valor;
    }

    removerVidaTemporaria(): void {
        this.vidaTemporaria = 0;
    }

}



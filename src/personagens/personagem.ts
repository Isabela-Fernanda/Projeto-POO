// ======================================================================
// IMPORTS
// ======================================================================

// Core e Definições de Base
import { Time } from "./time.js";
import { Raca } from "./racas/raca.js";
import { Classe } from "./classes/classe.js";
import { Atributos, TipoAtributo } from "./atributos/atributos.js";
import { Mapa } from "../mapa/mapa.js";
import { Sala } from "../mapa/sala.js";

// Sistema de Inventário e Itens
import { Inventario } from "../inventario/inventario.js";
import { Equipamento, FacilidadeUso } from "../inventario/equipamento.js";
import { Arma, Categoria } from "../itens/arma.js";
import { Armadura } from "../itens/armadura.js";
import { CatalogoArmas } from "../itens/catalogos/catalogoArmas.js";

// Sistema de Perícias
import { Pericia, GrauTreinamento } from "../pericias/pericia.js";

// Poderes, Condições e Estados
import { Habilidade } from "../poderes/habilidades.js";
import { Caracteristica } from "../poderes/caracteristica.js";
import { Efeito } from "../poderes/efeito.js";
import { Condicao } from "../combate/tipoCondicao.js";
import { Tags } from "../poderes/tags.js";
import { TipoEnergia } from "../poderes/tipoEnergia.js";

// Motores de Combate e Mecânica
import { TipoDano } from "../combate/tipoDano.js";
import { CalculadoraDefesa } from "../combate/calcular/calcularDefesa.js";
import { ModoAtaque, TesteAtaque, AtaquePossivel } from "../combate/testes/testeAtaque.js";
import { Beneficio } from "../poderes/beneficio.js";
import { CatalogoPericias } from "../pericias/catalogoPericias.js";
import { Loot, Random } from "./loot.js";
import { Item } from "../itens/item.js";

// ======================================================================
// INTERFACES
// ======================================================================
export interface AtaqueBonus {
    nome: string;
    arma: Arma;
}

// ======================================================================
// CLASSE PRINCIPAL
// ======================================================================

export abstract class Personagem {
    // Atributos Vitais de Estado
    protected vidaAtual: number;
    protected vidaMaxima: number;
    protected manaAtual: number;
    protected manaMaxima: number;
    private vidaTemporaria = 0;

    // Posicionamento e Mobilidade
    protected salaAtual: Sala | null = null;
    protected deslocamento: number;
    protected posX: number = 0;
    protected posY: number = 0;

    // Estatísticas de Combate Estáticas e Temporárias
    protected bonusDefesa: number = 0;
    protected defesaTemporaria: number = 0;
    private ataquesExtrasPermanentes = 0;
    private ataquesExtrasTemporarios = 0;

    // Coleções e Mapas Dinâmicos de Dados
    private ataquesBonus: AtaqueBonus[] = [];
    private criaturasInvocadas: Personagem[] = [];
    private efeitos: Efeito[] = [];
    private beneficios: Beneficio[] = [];
    private caracteristicas: Caracteristica[] = [];
    private resistencias = new Map<TipoDano, number>();
    private bonusAtributos = new Map<TipoAtributo, number>();

    // Metadados RPG e Propriedades de Raça
    protected tags: Tags[] = [];
    protected imunidadesEnergia: TipoEnergia[] = [];
    private poderesTormenta = 0;

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
        protected xpConcedido: number = 0,
        protected loot: Loot[] = [],
    ) {
        this.vidaMaxima = (classe?.getVidaInicial() ?? 10) + (((classe?.getPVPorNivel() ?? 2) + this.getBonusVidaPorNivel()) * (this.nivel - 1)) + this.getConstituicao();
        this.manaMaxima = (classe?.getManaInicial() ?? 1) * this.nivel + Math.floor(this.getBonusManaPorNivel() * this.nivel);

        this.vidaAtual = this.vidaMaxima;
        this.manaAtual = this.manaMaxima;
        this.deslocamento = 9;
    }

    /* ------------------------------------------------------------ */
    /* ------------------- MÉTODOS ABSTRATOS ---------------------- */
    /* ------------------------------------------------------------ */

    abstract atacar(alvo: Personagem, mapa: Mapa, arma: Arma, modoAtaque: ModoAtaque): void;
    abstract atacarComDuasArmas(alvo: Personagem, mapa: Mapa, ataques: AtaquePossivel[]): void;

    /* ------------------------------------------------------------ */
    /* --------------------- DADOS DO CORE ------------------------ */
    /* ------------------------------------------------------------ */

    getNome(): string { return this.nome; }

    getNivel(): number { return this.nivel; }

    getTime(): Time { return this.time; }

    setTime(time: Time): void { this.time = time; }

    getRaca(): Raca { return this.raca; }

    getClasse(): Classe | null { return this.classe || null; }

    inicializarClasse(): void {
        if (!this.classe) return;

        const habilidades = this.classe.getHabilidades();

        for (const hab of habilidades) {
            this.adicionarHabilidade(hab);
        }
    }

    /* ------------------------------------------------------------ */
    /* ------------------ REGRAS DE VIDA E DANOS ------------------ */
    /* ------------------------------------------------------------ */

    getVidaAtual(): number { return this.vidaAtual; }

    getVidaMaxima(): number { return this.vidaMaxima; }

    setVidaMaxima(valor: number): void {
        this.vidaMaxima = valor;
        this.vidaAtual = valor;
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

        console.log(`${this.nome} sofreu ${dano} de dano.`);

        if (!this.estaVivo()) {
            console.log(`${this.nome} foi derrotado!`)
        }
    }

    estaVivo(): boolean { return this.vidaAtual > 0; }

    getBonusVidaPorNivel(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusPVPorNivel(), 0);
    }

    getVidaTemporaria(): number { return this.vidaTemporaria; }

    adicionarVidaTemporaria(valor: number): void { this.vidaTemporaria += valor; }

    removerVidaTemporaria(): void { this.vidaTemporaria = 0; }

    /* ------------------------------------------------------------ */
    /* ---------------------- SISTEMA MANA ------------------------ */
    /* ------------------------------------------------------------ */

    getManaAtual(): number { return this.manaAtual; }

    getManaMaxima(): number { return this.manaMaxima; }

    getBonusManaPorNivel(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusPMPorNivel(), 0);
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
    /* ----------------------- LOOT E XP -------------------------- */
    /* ------------------------------------------------------------ */

    getXPConcedido(): number {
        return this.xpConcedido;
    }

    setXPConcedido(xp: number): void {
        this.xpConcedido = xp;
    }

    getLoot(): Loot[] {
        return this.loot;
    }

    adicionarLoot(loot: Loot): void {
        this.loot.push(loot);
    }

    gerarLoot(): Item[] {
        const itens: Item[] = [];

        // Loot aleatório
        for (const loot of this.loot) {
            if (!Random.chance(loot.chance)) {
                continue;
            }

            const quantidade = Random.inteiro(
                loot.quantidadeMin,
                loot.quantidadeMax
            );

            for (let i = 0; i < quantidade; i++) {
                itens.push(loot.item);
            }
        }

        // Inventário
        itens.push(...this.inventario.getTodosItens());

        // Equipamentos
        itens.push(...this.equipamento.getItensEquipados());

        return itens;
    }

    /* ------------------------------------------------------------ */
    /* ----------------------- ATRIBUTOS -------------------------- */
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
            case TipoAtributo.FORCA: return this.getForca();
            case TipoAtributo.DESTREZA: return this.getDestreza();
            case TipoAtributo.CONSTITUICAO: return this.getConstituicao();
            case TipoAtributo.INTELIGENCIA: return this.getInteligencia();
            case TipoAtributo.SABEDORIA: return this.getSabedoria();
            case TipoAtributo.CARISMA: return this.getCarisma();
        }
    }

    getModificadorAtributo(tipo: TipoAtributo): number {
        const valor = this.getAtributo(tipo);
        return Atributos.calcularModificador(valor);
    }

    private getBonusAtributo(tipo: TipoAtributo): number { return this.bonusAtributos.get(tipo) ?? 0; }

    adicionarBonusAtributo(tipo: TipoAtributo, valor: number): void {
        const atual = this.bonusAtributos.get(tipo) ?? 0;
        this.bonusAtributos.set(tipo, atual + valor);
    }

    removerBonusAtributo(tipo: TipoAtributo, valor: number): void {
        const atual = this.bonusAtributos.get(tipo) ?? 0;
        this.bonusAtributos.set(tipo, atual - valor);
    }

    /* ------------------------------------------------------------ */
    /* ----------------------- PERÍCIAS --------------------------- */
    /* ------------------------------------------------------------ */

    getPericias(): Map<Pericia, GrauTreinamento> {
        return this.pericias;
    }

    possuiPericia(pericia: Pericia): boolean {
        return this.pericias.has(pericia);
    }

    getGrauTreinamento(pericia: Pericia): GrauTreinamento {
        return (this.pericias.get(pericia) ?? GrauTreinamento.DESTREINADO);
    }

    adicionarPericia(pericia: Pericia, grau: GrauTreinamento = GrauTreinamento.TREINADO): void {
        this.pericias.set(pericia, grau);
    }

    getBonusPericia(pericia: Pericia): number {
        return this.bonusPericias.get(pericia) ?? 0;
    }

    adicionarBonusPericia(pericia: Pericia, valor: number): void {
        const atual = this.bonusPericias.get(pericia) ?? 0;

        this.bonusPericias.set(pericia, atual + valor);
    }

    /* ----------------------------------------------------------- */
    /* ---------------- MECÂNICAS DE COMBATE --------------------- */
    /* ----------------------------------------------------------- */

    getDefesa(): number {
        return CalculadoraDefesa.calcular(this);
    }

    getBonusDefesa(): number {
        return this.bonusDefesa;
    }

    adicionarBonusDefesa(valor: number): void {
        this.bonusDefesa += valor;
    }

    getCDMagia(): number {
        if (!this.classe) {
            return 10 + Math.floor(this.nivel / 2);
        }
        const atributo = this.classe.getAtributoMagia();

        return atributo === null ? 10 + Math.floor(this.nivel / 2) : 10 + Math.floor(this.nivel / 2) + this.getModificadorAtributo(atributo);
    }

    getResistencia(tipo: TipoDano): number {
        return this.resistencias.get(tipo) ?? 0;
    }

    adicionarResistencia(tipo: TipoDano, valor: number): void {
        this.resistencias.set(tipo, valor);
    }

    protected resolverAtaque(alvo: Personagem, arma: Arma, modoAtaque: ModoAtaque, penalidade: number = 0): void {
        const resultado = TesteAtaque.executarAtaque(this, alvo, arma, modoAtaque, penalidade);

        if (modoAtaque === ModoAtaque.ARREMESSO) {
            this.removerArma(arma);
            console.log(`${this.nome} lançou ${arma.getNome()}, e agora está desarmado.`);
        } else if (modoAtaque === ModoAtaque.CORPO_A_CORPO) {
            console.log(`${this.nome} atacou com ${arma.getNome()}.`)
        } else if (modoAtaque === ModoAtaque.DISTANCIA) {
            console.log(`${this.nome} disparou contra ${alvo.getNome()} com ${arma.getNome()}.`)
        }

        if (!resultado.acertou) {
            console.log("ERROU!");
            return;
        }

        alvo.receberDano(resultado.dano);

        if (resultado.critico) {
            console.log("ACERTO CRÍTICO!");
        }
    }

    /* ------------------------------------------------------------ */
    /* ----------------- GERENCIAMENTO DE ATAQUES ----------------- */
    /* ------------------------------------------------------------ */

    getQuantidadeAtaques(): number {
        return 1 + this.ataquesExtrasPermanentes + this.ataquesExtrasTemporarios;
    }

    getAtaquesExtras(): number {
        return this.ataquesExtrasPermanentes;
    }

    adicionarAtaqueExtra(quantidade = 1): void {
        this.ataquesExtrasPermanentes += quantidade;
    }

    adicionarAtaqueExtraTemporario(quantidade = 1): void {
        this.ataquesExtrasTemporarios += quantidade;
    }

    consumirAtaquesExtrasTemporarios(): void {
        this.ataquesExtrasTemporarios = 0;
    }

    getAtaquesBonus(): AtaqueBonus[] {
        return this.ataquesBonus;
    }

    possuiAtaqueBonus(nome: string): boolean {
        return this.ataquesBonus.some(ataque => ataque.nome === nome);
    }

    adicionarAtaqueBonus(nome: string, arma: Arma): void {
        this.ataquesBonus.push({ nome, arma });
    }

    removerAtaqueBonus(nome: string): void {
        this.ataquesBonus = this.ataquesBonus.filter(ataque => ataque.nome !== nome);
    }

    /* ------------------------------------------------------------ */
    /* ------------------ ESPAÇO, MAPA E MOVIMENTO ---------------- */
    /* ------------------------------------------------------------ */

    getSalaAtual(): Sala | null {
        return this.salaAtual;
    }

    setSalaAtual(sala: Sala): void {
        this.salaAtual = sala;
    }

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

    getAlcancePercepcao(): number {
        return 3 + this.getBonusPericia(CatalogoPericias.PERCEPCAO);
    }

    estaAdjacente(alvo: Personagem): boolean {
        const dx = Math.abs(this.getX() - alvo.getX());
        const dy = Math.abs(this.getY() - alvo.getY());
        return dx <= 1 && dy <= 1;
    }

    /* ------------------------------------------------------------ */
    /* ---------------- INVENTÁRIO E EQUIPAMENTOS ----------------- */
    /* ------------------------------------------------------------ */

    getInventario(): Inventario {
        return this.inventario;
    }

    getEquipamento(): Equipamento {
        return this.equipamento;
    }

    possuiProficiencia(facilidade: FacilidadeUso): boolean {
        return this.classe?.possuiProficiencia(facilidade) ?? false;
    }

    possuiProficiencias(facilidade: FacilidadeUso): boolean {
        if (this.classe?.possuiProficiencia(facilidade)) {
            return true;
        }

        return this.habilidades.some(habilidade => habilidade.concedeProficiencia(facilidade));
    }

    getAlcanceAtaque(): number {
        let alcance = 1;
        const alcance1 = this.equipamento.getArmaPrincipal().obterMaiorAlcance();
        const alcance2 = this.equipamento.getArmaSecundaria().obterMaiorAlcance();

        return Math.max(alcance, alcance1, alcance2);
    }

    obterAtaquesPossiveis(distancia: number): AtaquePossivel[] {
        const ataques: { arma: Arma, modoAtaque: ModoAtaque }[] = [];

        const armas = [
            this.equipamento.getArmaPrincipal(),
            this.equipamento.getArmaSecundaria()
        ];

        for (const arma of armas) {
            if (arma.podeAtacarCorpoACorpo() && distancia <= arma.getAlcance()) {
                ataques.push({ arma, modoAtaque: ModoAtaque.CORPO_A_CORPO });
                continue;
            }

            if (arma.podeAtacarDistancia() && distancia <= arma.getAlcance()) {
                ataques.push({ arma, modoAtaque: ModoAtaque.DISTANCIA });
                continue;
            }

            if (arma.podeArremessar() && distancia <= arma.getAlcanceArremesso()) {
                ataques.push({ arma, modoAtaque: ModoAtaque.ARREMESSO });
            }
        }

        return ataques;
    }

    possuiArmaNoAlcance(distancia: number): boolean {
        return (
            this.equipamento.getArmaPrincipal().armaNoAlcance(distancia) || this.equipamento.getArmaSecundaria().armaNoAlcance(distancia)
        );
    }

    getBonusAtaqueArma(arma: Arma): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusAtaqueArma(arma), 0);
    }

    getPenalidadeDuasArmas(): number {
        let penalidade = -2;

        if (this.possuiHabilidade("Estilo de Duas Armas")) {
            penalidade += 2;
        }

        return penalidade;
    }

    equiparArma(arma: Arma): boolean {
        const armaPrincipal = this.equipamento.getArmaPrincipal();
        const armaSecundaria = this.equipamento.getArmaSecundaria();

        if (arma.getCategoria() === Categoria.DUAS_MAOS) {
            if (armaPrincipal !== CatalogoArmas.DESARMADO) {
                this.inventario.adicionar(armaPrincipal);
            }

            if (armaSecundaria !== CatalogoArmas.DESARMADO) {
                this.inventario.adicionar(armaSecundaria);
            }

            this.equipamento.equiparDuasMaos(arma);
            this.inventario.equiparArmaPrincipal(arma);
            this.inventario.equiparArmaSecundaria(arma);
            return true;
        }

        while (true) {
            console.log("1 - Mão direita");
            console.log("2 - Mão esquerda");
            const escolha = prompt("Escolha:");

            if (escolha == "1") {
                if (armaPrincipal !== CatalogoArmas.DESARMADO) {
                    this.inventario.adicionar(armaPrincipal);
                }
                this.equipamento.equiparMaoDireita(arma);
                this.inventario.equiparArmaPrincipal(arma);
                return true;
            }

            if (escolha == "2") {
                if (armaSecundaria !== CatalogoArmas.DESARMADO) {
                    this.inventario.adicionar(armaSecundaria);
                }
                this.equipamento.equiparMaoEsquerda(arma);
                this.inventario.equiparArmaSecundaria(arma);
                return true;
            }
        }
    }

    equiparArmaNatural(arma: Arma): void {
        this.equipamento.equiparArmaNatura(arma);
    }

    equiparProtecao(armadura: Armadura): boolean {
        this.equipamento.equiparProtecao(armadura);
        this.inventario.equiparArmadura(armadura);
        return true;
    }

    removerArma(arma: Arma): void {
        if (this.equipamento.getArmaPrincipal() === arma && this.equipamento.getArmaSecundaria() === arma) {
            this.equipamento.desequiparDuasMaos();
            this.equipamento.equiparDuasMaos(CatalogoArmas.DESARMADO);
            return
        }

        if (this.equipamento.getArmaPrincipal() === arma) {
            this.equipamento.desequiparMaoDireita();
            this.equipamento.equiparMaoDireita(CatalogoArmas.DESARMADO);
            return;
        }

        if (this.equipamento.getArmaSecundaria() === arma) {
            this.equipamento.desequiparMaoEsquerda();
            this.equipamento.equiparMaoEsquerda(CatalogoArmas.DESARMADO);
            return;
        }
    }

    desequiparArma(arma: Arma): void {
        if (this.equipamento.getArmaPrincipal() === arma && this.equipamento.getArmaSecundaria() === arma) {
            this.equipamento.desequiparDuasMaos();
            this.inventario.adicionar(arma);
            return
        }

        if (this.equipamento.getArmaPrincipal() === arma) {
            this.equipamento.desequiparMaoDireita();
            this.inventario.adicionar(arma);
            return;
        }

        if (this.equipamento.getArmaSecundaria() === arma) {
            this.equipamento.desequiparMaoEsquerda();
            this.inventario.adicionar(arma);
            return;
        }
    }

    /* ------------------------------------------------------------ */
    /* ------------------ HABILIDADES E CARACTERÍSTICAS ----------- */
    /* ------------------------------------------------------------ */

    getHabilidades(): Habilidade[] {
        return this.habilidades;
    }

    possuiHabilidade(nome: string): boolean {
        return this.habilidades.some(habilidade => habilidade.getNome() === nome);
    }

    adicionarHabilidade(habilidade: Habilidade): void {
        if (this.possuiHabilidade(habilidade.getNome())) return;
        this.habilidades.push(habilidade);
    }

    getBonusAtaqueHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusAtaque(), 0);
    }

    getBonusDanoHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusDano(), 0);
    }

    getBonusDefesaHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusDefesa(), 0);
    }

    getBonusFortitudeHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusFortitude(), 0);
    }

    getBonusIniciativaHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusIniciativa(), 0);
    }

    getBonusReflexosHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusReflexos(), 0);
    }

    getBonusVontadeHabilidades(): number {
        return this.habilidades.reduce((total, habilidade) => total + habilidade.getBonusVontade(), 0);
    }

    getBeneficios(): Beneficio[] {
        return this.beneficios;
    }

    getCaracteristicas(): Caracteristica[] {
        return this.caracteristicas;
    }

    possuiCaracteristica(nome: string): boolean {
        return this.caracteristicas.some(
            caracteristica => caracteristica.getNome() === nome
        );
    }

    adicionarCaracteristica(caracteristica: Caracteristica): void {
        this.caracteristicas.push(caracteristica);
    }

    /* ------------------------------------------------------------ */
    /* ----------------- GERENCIAMENTO DE EFEITOS ----------------- */
    /* ------------------------------------------------------------ */

    getEfeitos(): Efeito[] {
        return this.efeitos;
    }

    possuiCondicao(condicao: Condicao): boolean {
        return this.efeitos.some(efeito => efeito.possuiCondicao(condicao));
    }

    podeAgir(): boolean {
        return this.efeitos.every(efeito => efeito.podeAgir());
    }

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
        console.log(`${this.nome} recebeu o efeito ${efeito.getNome()}`);
    }

    removerEfeito(efeito: Efeito): void {
        this.efeitos = this.efeitos.filter(e => e !== efeito);
    }

    listarEfeitos(): void {
        if (this.efeitos.length === 0) return;

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

    getBonusIniciativa(): number {
        return this.efeitos.reduce((total, efeito) => total + efeito.getBonusIniciativa(), 0);
    }

    getBonusPercepcao(): number {
        return this.efeitos.reduce((total, efeito) => total + efeito.getBonusPercepcao(), 0);
    }

    /* ------------------------------------------------------------ */
    /* ---------------- METADADOS E ALIANÇAS ---------------------- */
    /* ------------------------------------------------------------ */

    getTags(): Tags[] {
        return [...this.tags];
    }

    adicionarTag(tag: Tags): void {
        this.tags.push(tag);
    }

    possuiTag(tag: Tags): boolean {
        return this.tags.includes(tag);
    }

    adicionarImunidadeEnergia(energia: TipoEnergia): void {
        this.imunidadesEnergia.push(energia);
    }

    adicionarPoderTormenta(quantidade: number = 1): void {
        this.poderesTormenta += quantidade;
    }

    getQuantidadePoderesTormenta(): number {
        return this.poderesTormenta;
    }

    adicionarInvocacao(criatura: Personagem): void {
        this.criaturasInvocadas.push(criatura);
    }
}



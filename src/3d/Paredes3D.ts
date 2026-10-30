import * as THREE from "three";

import { Mapa } from "../mapa/mapa.js";
import { Sala, TipoSala, LadoSala } from "../mapa/sala.js";

export class Paredes3D {
    constructor(
        private readonly cena: THREE.Scene,
        private readonly mapa: Mapa
    ) { }

    private readonly objetosCriados = new Set<THREE.Object3D>();
    private readonly materiaisCriados = new Set<THREE.Material>();

    private adicionarObjeto(objeto: THREE.Object3D): void {
        this.cena.add(objeto);
        this.objetosCriados.add(objeto);
    }

    private registrarMaterial<T extends THREE.Material>(material: T): T {
        this.materiaisCriados.add(material);
        return material;
    }

    public criarParedeDeBlocos(eixo: "x" | "z", x: number, z: number, comprimento: number, altura: number, espessura: number, materialBase: THREE.Material, alturaBase: number = 0,): void {
        const larguraBloco = 1.8;
        const alturaBloco = 0.72;
        const junta = 0.035;

        const materiais = [
            materialBase,
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#504a50",
                    roughness: 0.94,
                })
            ),
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#454148",
                    roughness: 0.96,
                })
            ),
            this.registrarMaterial(
                new THREE.MeshStandardMaterial({
                    color: "#4b464c",
                    roughness: 0.95,
                })
            ),
        ];

        const quantidadeFileiras = Math.ceil(altura / alturaBloco);
        const inicio = -comprimento / 2;
        const fim = comprimento / 2;
        const recuoEstrutura = 0.08;
        const espessuraEstrutura = Math.max(
            0.01,
            espessura - recuoEstrutura * 2
        );

        const geometriaEstrutura = new THREE.BoxGeometry(
            eixo === "x" ? comprimento : espessuraEstrutura,
            altura,
            eixo === "z" ? comprimento : espessuraEstrutura,
        );

        const materialEstrutura = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#29272d",
                roughness: 1,
            })
        );

        const estrutura = new THREE.Mesh(geometriaEstrutura, materialEstrutura,);

        estrutura.position.set(x, alturaBase + altura / 2, z);
        estrutura.receiveShadow = true;

        this.adicionarObjeto(estrutura);

        for (let linha = 0; linha < quantidadeFileiras; linha++) {
            const deslocamento =
                linha % 2 === 0 ? 0 : larguraBloco / 2;

            const limites = [inicio, fim];

            for (
                let limite = inicio + larguraBloco - deslocamento;
                limite < fim;
                limite += larguraBloco
            ) {
                if (limite > inicio && limite < fim) {
                    limites.push(limite);
                }
            }

            limites.sort((a, b) => a - b);

            for (let i = 0; i < limites.length - 1; i++) {
                const inicioBloco = limites[i];
                const fimBloco = limites[i + 1];
                const larguraReal = fimBloco - inicioBloco;

                const alturaReal = Math.min(
                    alturaBloco - junta,
                    altura - linha * alturaBloco,
                );

                if (larguraReal <= junta || alturaReal <= 0) {
                    continue;
                }

                const geometria = new THREE.BoxGeometry(
                    eixo === "x" ? larguraReal - junta : espessura,
                    alturaReal,
                    eixo === "z" ? larguraReal - junta : espessura,
                );

                const indiceMaterial =
                    Math.abs(
                        Math.floor(
                            Math.sin(linha * 127.1 + i * 311.7) * 10000,
                        ),
                    ) % materiais.length;

                const bloco = new THREE.Mesh(geometria, materiais[indiceMaterial],);

                const centroHorizontal = (inicioBloco + fimBloco) / 2;

                const centroVertical = alturaBase + linha * alturaBloco + alturaReal / 2;

                bloco.position.set(
                    eixo === "x" ? x + centroHorizontal : x,
                    centroVertical,
                    eixo === "z" ? z + centroHorizontal : z,
                );

                bloco.castShadow = true;
                bloco.receiveShadow = true;

                this.adicionarObjeto(bloco);
            }
        }
    }

    private criarMolduraAbertura(eixo: "x" | "z", x: number, z: number, largura: number, altura: number, alturaBase: number,): void {
        const profundidade = 0.54;
        const larguraPilar = 0.14;
        const alturaVerga = 0.16;

        const material = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#625b60",
                roughness: 0.92,
            })
        );

        const criarPeca = (posX: number, posY: number, posZ: number, tamanhoX: number, tamanhoY: number, tamanhoZ: number,): void => {
            const geometria = new THREE.BoxGeometry(tamanhoX, tamanhoY, tamanhoZ,);

            const peca = new THREE.Mesh(geometria, material);

            peca.position.set(posX, posY, posZ);
            peca.castShadow = true;
            peca.receiveShadow = true;

            this.adicionarObjeto(peca);
        };

        const tamanhoPilarX = eixo === "x" ? larguraPilar : profundidade;
        const tamanhoPilarZ = eixo === "x" ? profundidade : larguraPilar;

        // Lateral esquerda.
        criarPeca(
            eixo === "x" ? x - largura / 2 - larguraPilar / 2 : x,
            alturaBase + altura / 2,
            eixo === "z" ? z - largura / 2 - larguraPilar / 2 : z,
            tamanhoPilarX,
            altura,
            tamanhoPilarZ,
        );

        // Lateral direita.
        criarPeca(
            eixo === "x" ? x + largura / 2 + larguraPilar / 2 : x,
            alturaBase + altura / 2,
            eixo === "z" ? z + largura / 2 + larguraPilar / 2 : z,
            tamanhoPilarX,
            altura,
            tamanhoPilarZ,
        );

        // Verga superior.
        criarPeca(
            x,
            alturaBase + altura + alturaVerga / 2,
            z,
            eixo === "x" ? largura + larguraPilar * 2 : profundidade,
            alturaVerga,
            eixo === "z" ? largura + larguraPilar * 2 : profundidade,
        );
    }

    private chaveCelula(x: number, z: number): string {
        return `${x},${z}`;
    }

    private criarParedesMasmorra(): void {
        const salas = this.mapa.getSalas();

        if (salas.length === 0) return;

        type Borda = {
            eixo: "x" | "z";
            fixa: number;
            inicio: number;
            fim: number;
            altura: number;
        };

        const celulasPorSala = new Map<Sala, Set<string>>();
        const bordas = new Map<string, Borda>();

        const chaveCelula = (x: number, z: number): string =>
            `${x},${z}`;

        const adicionarBorda = (borda: Borda): void => {
            const chave =
                `${borda.eixo},${borda.fixa},${borda.altura},` +
                `${borda.inicio},${borda.fim}`;

            bordas.set(chave, borda);
        };

        // Registra as células de cada sala separadamente.
        for (const sala of salas) {
            const celulas = new Set<string>();

            for (const area of sala.getPlanta()) {
                for (let x = 0; x < area.largura; x++) {
                    for (let z = 0; z < area.altura; z++) {
                        const mundoX = sala.getX() + area.x + x;
                        const mundoZ = sala.getY() + area.y + z;

                        celulas.add(
                            this.chaveCelula(mundoX, mundoZ)
                        );
                    }
                }
            }

            celulasPorSala.set(sala, celulas);
        }

        // 2. Identifica as bordas expostas de cada sala.
        for (const sala of salas) {
            const altura = sala.getConfiguracaoArquitetonica().alturaTeto;

            for (const area of sala.getPlanta()) {
                for (let x = 0; x < area.largura; x++) {
                    for (let z = 0; z < area.altura; z++) {
                        const mundoX = sala.getX() + area.x + x;
                        const mundoZ = sala.getY() + area.y + z;

                        const vizinhos = [
                            {
                                dx: 0,
                                dz: -1,
                                eixo: "x" as const,
                                fixa: mundoZ,
                                inicio: mundoX,
                            },
                            {
                                dx: 0,
                                dz: 1,
                                eixo: "x" as const,
                                fixa: mundoZ + 1,
                                inicio: mundoX,
                            },
                            {
                                dx: -1,
                                dz: 0,
                                eixo: "z" as const,
                                fixa: mundoX,
                                inicio: mundoZ,
                            },
                            {
                                dx: 1,
                                dz: 0,
                                eixo: "z" as const,
                                fixa: mundoX + 1,
                                inicio: mundoZ,
                            },
                        ];

                        for (const vizinho of vizinhos) {
                            const celulasDaSala = celulasPorSala.get(sala)!;

                            const chaveVizinho = this.chaveCelula(
                                mundoX + vizinho.dx,
                                mundoZ + vizinho.dz
                            );

                            // Só descarta a borda quando a célula vizinha
                            // pertence à mesma sala.
                            if (celulasDaSala.has(chaveVizinho)) {
                                continue;
                            }

                            adicionarBorda({
                                eixo: vizinho.eixo,
                                fixa: vizinho.fixa,
                                inicio: vizinho.inicio,
                                fim: vizinho.inicio + 1,
                                altura,
                            });
                        }
                    }
                }
            }
        }

        // 3. Agrupa as bordas consecutivas em paredes contínuas.
        const grupos = new Map<string, Borda[]>();

        for (const borda of bordas.values()) {
            const chave =
                `${borda.eixo},${borda.fixa},${borda.altura}`;

            const grupo = grupos.get(chave) ?? [];
            grupo.push(borda);
            grupos.set(chave, grupo);
        }

        const paredes: Borda[] = [];

        for (const grupo of grupos.values()) {
            grupo.sort((a, b) => a.inicio - b.inicio);

            let atual: Borda | null = null;

            for (const borda of grupo) {
                if (!atual) {
                    atual = { ...borda };
                    continue;
                }

                if (borda.inicio <= atual.fim) {
                    atual.fim = Math.max(atual.fim, borda.fim);
                } else {
                    paredes.push(atual);
                    atual = { ...borda };
                }
            }

            if (atual) paredes.push(atual);
        }

        const materialParede = this.registrarMaterial(
            new THREE.MeshStandardMaterial({
                color: "#48434a",
                roughness: 0.9,
            })
        );

        const espessuraParede = 0.5;
        const margemAbertura = 0.5;

        const moldurasCriadas = new Set<string>();
        const alturaBloco = 0.72;
        const alturaVerga = 0.16;
        const alturaPorta = 3.25;
        const folgaSuperiorPorta = 0.1;

        const alturaAbertura = alturaPorta + folgaSuperiorPorta;

        const trechosSuperioresCriados = new Set<string>();

        // 4. Calcula as aberturas das conexões e cria os trechos restantes.
        for (const parede of paredes) {
            const { eixo, fixa, inicio, fim, altura } = parede;

            const aberturas: Array<{
                inicio: number;
                fim: number;
            }> = [];

            for (const conexao of this.mapa.getConexoes()) {
                const lado = conexao.getLadoA();

                const origem = conexao.getOrigem();
                const destino = conexao.getDestino();

                const salaCorredor = [origem, destino].find(
                    (sala) => sala.getTipoSala() === TipoSala.CORREDOR,
                );

                // Determina se esta conexão atravessa a orientação da parede.
                const paredeHorizontal = eixo === "x";

                const ladoCompativel = paredeHorizontal
                    ? lado === LadoSala.NORTE || lado === LadoSala.SUL
                    : lado === LadoSala.LESTE || lado === LadoSala.OESTE;

                if (!ladoCompativel) continue;

                const inicioConexao =
                    eixo === "x" ? conexao.getX() : conexao.getY();

                const fimConexao =
                    inicioConexao +
                    (eixo === "x"
                        ? conexao.getLargura()
                        : conexao.getAltura());

                // A conexão precisa estar na borda que estamos construindo.
                const coordenadaSala = paredeHorizontal
                    ? (lado === LadoSala.NORTE ? origem.getY() : origem.getY() + origem.getAltura())
                    : (lado === LadoSala.OESTE ? origem.getX() : origem.getX() + origem.getLargura());

                if (Math.abs(fixa - coordenadaSala) > 0.01) {
                    continue;
                }

                if (inicioConexao >= fim || fimConexao <= inicio) {
                    continue;
                }

                let aberturaInicio = inicioConexao;
                let aberturaFim = fimConexao;

                if (salaCorredor) {
                    const centroCorredor = eixo === "x"
                        ? salaCorredor.getX() + salaCorredor.getLargura() / 2
                        : salaCorredor.getY() + salaCorredor.getAltura() / 2;

                    const larguraAbertura =
                        fimConexao - inicioConexao + margemAbertura * 2;

                    aberturaInicio = centroCorredor - larguraAbertura / 2;
                    aberturaFim = centroCorredor + larguraAbertura / 2;
                } else {
                    aberturaInicio -= margemAbertura;
                    aberturaFim += margemAbertura;
                }

                aberturaInicio = Math.max(inicio, aberturaInicio);
                aberturaFim = Math.min(fim, aberturaFim);

                if (aberturaInicio < aberturaFim) {
                    aberturas.push({
                        inicio: aberturaInicio,
                        fim: aberturaFim,
                    });

                    const chaveMoldura = [
                        eixo,
                        fixa.toFixed(2),
                        inicioConexao.toFixed(2),
                        fimConexao.toFixed(2),
                    ].join(",");

                    if (!moldurasCriadas.has(chaveMoldura)) {
                        moldurasCriadas.add(chaveMoldura);

                        const centroAbertura = (aberturaInicio + aberturaFim) / 2;

                        const larguraAbertura = aberturaFim - aberturaInicio;

                        this.criarMolduraAbertura(
                            eixo,
                            eixo === "x" ? centroAbertura : fixa,
                            eixo === "z" ? centroAbertura : fixa,
                            larguraAbertura,
                            alturaAbertura,
                            0,
                        );
                    }

                    const alturaBaseSuperior = Math.ceil(alturaAbertura / alturaBloco) * alturaBloco;

                    const alturaTrechoSuperior = altura - alturaBaseSuperior;

                    if (alturaTrechoSuperior > 0.05) {
                        const chaveTrechoSuperior = [
                            eixo,
                            fixa.toFixed(2),
                            aberturaInicio.toFixed(2),
                            aberturaFim.toFixed(2),
                            altura.toFixed(2),
                        ].join(",");

                        if (!trechosSuperioresCriados.has(chaveTrechoSuperior)) {
                            trechosSuperioresCriados.add(chaveTrechoSuperior);

                            const centroAbertura = (aberturaInicio + aberturaFim) / 2;

                            const larguraAbertura = aberturaFim - aberturaInicio;

                            this.criarParedeDeBlocos(
                                eixo,
                                eixo === "x" ? centroAbertura : fixa,
                                eixo === "z" ? centroAbertura : fixa,
                                larguraAbertura,
                                alturaTrechoSuperior,
                                espessuraParede,
                                materialParede,
                                alturaBaseSuperior,
                            );
                        }
                    }
                }
            }

            aberturas.sort((a, b) => a.inicio - b.inicio);

            let cursor = inicio;

            const criarTrecho = (trechoInicio: number, trechoFim: number,): void => {
                const comprimento = trechoFim - trechoInicio;

                if (comprimento <= 0.05) return;

                const centro = (trechoInicio + trechoFim) / 2;

                this.criarParedeDeBlocos(
                    eixo,
                    eixo === "x" ? centro : fixa,
                    eixo === "z" ? centro : fixa,
                    comprimento,
                    altura,
                    espessuraParede,
                    materialParede,
                );
            };

            for (const abertura of aberturas) {
                if (abertura.fim <= cursor) continue;

                if (abertura.inicio > cursor) {
                    criarTrecho(cursor, abertura.inicio);
                }

                cursor = Math.max(cursor, abertura.fim);

                if (cursor >= fim) break;
            }

            if (cursor < fim) {
                criarTrecho(cursor, fim);
            }
        }
    }

    public criar(): void {
        this.criarParedesMasmorra();
    }

    public destruir(): void {
        for (const objeto of this.objetosCriados) {
            this.cena.remove(objeto);

            if (objeto instanceof THREE.Mesh) {
                objeto.geometry.dispose();
            }
        }

        for (const material of this.materiaisCriados) {
            material.dispose();
        }

        this.objetosCriados.clear();
        this.materiaisCriados.clear();
    }
}

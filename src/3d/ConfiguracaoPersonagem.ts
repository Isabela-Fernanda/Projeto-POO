export type RacaPersonagem =
    | "humano"
    | "elfo"
    | "anao"
    | "goblin"
    | "goblin-arqueiro"
    | "goblin-xama"
    | "hobgoblin";

export interface ConfiguracaoPersonagem {
    raca: RacaPersonagem;
    corRoupa: string;
    corCalca: string;
    corPele: string;
    corCabelo: string;
    corBota: string;
    altura: number;
    largura: number;
    posicaoX?: number;
    posicaoZ?: number;
}


export const CONFIGURACAO_HUMANO: ConfiguracaoPersonagem = {
    raca: "humano",
    corRoupa: "#526b52",
    corCalca: "#39343b",
    corPele: "#d2a17c",
    corCabelo: "#493329",
    corBota: "#30241e",
    altura: 1,
    largura: 1,
};

export const CONFIGURACAO_ELFO: ConfiguracaoPersonagem = {
    raca: "elfo",
    corRoupa: "#315b68",
    corCalca: "#343943",
    corPele: "#e3c2a0",
    corCabelo: "#c7a75b",
    corBota: "#382c27",
    altura: 1.05,
    largura: 0.9,
    posicaoX: 5,
    posicaoZ: 23,
};

export const CONFIGURACAO_ANAO: ConfiguracaoPersonagem = {
    raca: "anao",
    corRoupa: "#795039",
    corCalca: "#42352d",
    corPele: "#c58d69",
    corCabelo: "#75432c",
    corBota: "#30241e",
    altura: 0.75,
    largura: 1.2,
    posicaoX: 7,
    posicaoZ: 23,
};

export const CONFIGURACAO_GOBLIN: ConfiguracaoPersonagem = {
    raca: "goblin",
    corRoupa: "#65513b",
    corCalca: "#383b32",
    corPele: "#82a65a",
    corCabelo: "#3c3429",
    corBota: "#30241e",
    altura: 0.75,
    largura: 0.8,
    posicaoX: 9,
    posicaoZ: 23,
};

export const CONFIGURACAO_GOBLIN_ARQUEIRO: ConfiguracaoPersonagem = {
    raca: "goblin-arqueiro",
    corRoupa: "#8a713b",
    corCalca: "#46402f",
    corPele: "#8eaf62",
    corCabelo: "#44362b",
    corBota: "#30241e",
    altura: 0.78,
    largura: 0.8,
    posicaoX: 11,
    posicaoZ: 23,
};

export const CONFIGURACAO_GOBLIN_XAMA: ConfiguracaoPersonagem = {
    raca: "goblin-xama",
    corRoupa: "#5b477c",
    corCalca: "#37313f",
    corPele: "#759c51",
    corCabelo: "#493329",
    corBota: "#30241e",
    altura: 0.8,
    largura: 0.85,
    posicaoX: 13,
    posicaoZ: 23,
};

export const CONFIGURACAO_HOBGOBLIN: ConfiguracaoPersonagem = {
    raca: "hobgoblin",
    corRoupa: "#803e32",
    corCalca: "#39343b",
    corPele: "#a66d4e",
    corCabelo: "#352820",
    corBota: "#30241e",
    altura: 1.1,
    largura: 1.05,
    posicaoX: 15,
    posicaoZ: 23,
};


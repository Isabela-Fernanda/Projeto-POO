import { Save } from "../save/save.js";

export interface ISaveManager {
    existeSave(): Promise<boolean>;

    salvar(save: Save): Promise<void>;

    carregar(): Promise<Save>;

    criarNovo(): Save;

    apagar(): Promise<void>;
}
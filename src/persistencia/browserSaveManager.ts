import { Save } from "../save/save.js";
import { ISaveManager } from "./iSaveManager.js";
import { Serializer } from "@save/serializer.js";

export class BrowserSaveManager implements ISaveManager {
    private static readonly CHAVE = "rpg-tormenta-save";

    async existeSave(): Promise<boolean> {
        return localStorage.getItem(BrowserSaveManager.CHAVE) !== null;
    }

    async salvar(save: Save): Promise<void> {
        save.ultimoSalvamento = new Date();

        const json = Serializer.serializar(save);

        this.storage.setItem(
            BrowserSaveManager.CHAVE,
            json
        );
    }

    async carregar(): Promise<Save> {
        const texto = this.storage.getItem(
            BrowserSaveManager.CHAVE
        );

        if (!texto) {
            throw new Error("Nenhum save encontrado.");
        }

        return Serializer.desserializar<Save>(texto);
    }

    criarNovo() {
        return new Save();
    }

    async apagar(): Promise<void> {
        this.storage.removeItem(
            BrowserSaveManager.CHAVE
        );
    }

    private get storage(): Storage {
        return window.localStorage;
    }
}

/* export class BrowserSaveManager implements ISaveManager {

    private readonly chave = "save";

    async existeSave() {

        return localStorage.getItem(this.chave) !== null;

    }

    async salvar(save: Save) {

        localStorage.setItem(

            this.chave,

            Serializer.serializar(save)

        );

    }

    async carregar() {

        const texto = localStorage.getItem(this.chave)!;

        return Serializer.desserializar<Save>(texto);

    }

    criarNovo() {

        return new Save();

    }

} */
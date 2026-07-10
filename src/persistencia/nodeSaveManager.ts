import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import { Save } from "../save/save.js";
import {Serializer} from "../save/serializer.js";

export class SaveManager {

    private static readonly CAMINHO = "./dados/save.json";

    static async existeSave(): Promise<boolean> {
        try {
            await access(this.CAMINHO);
            return true;
        } catch {
            return false;
        }
    }

    static async salvar(save: Save): Promise<void> {
        save.ultimoSalvamento = new Date();

        await mkdir(dirname(this.CAMINHO), { recursive: true });

        const json = Serializer.serializar(save);

        await writeFile(this.CAMINHO, json, "utf8");
    }

    static async carregar(): Promise<Save> {
        const texto = await readFile(this.CAMINHO, "utf8");

        return Serializer.desserializar<Save>(texto);
    }

    static criarNovo(): Save {
        return new Save();
    }

    static async apagar(): Promise<void> {
        if (await this.existeSave()) {
            await rm(this.CAMINHO);
        }
    }
}
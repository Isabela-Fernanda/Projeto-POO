import { BrowserSaveManager } from "./browserSaveManager.js";
import { ISaveManager } from "./iSaveManager.js";

export class SaveManagerFactory {
    static criar(): ISaveManager {
        return new BrowserSaveManager();
    }

}
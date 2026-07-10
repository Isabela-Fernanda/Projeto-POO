import { defineConfig } from "vite";
import path from "path";

export default defineConfig({

    resolve: {

        alias: {

            "@app": path.resolve(__dirname, "src/app"),
            "@combate": path.resolve(__dirname, "src/combate"),
            "@criacao": path.resolve(__dirname, "src/criacao"),
            "@inventario": path.resolve(__dirname, "src/inventario"),
            "@itens": path.resolve(__dirname, "src/itens"),
            "@mapa": path.resolve(__dirname, "src/mapa"),
            "@pericias": path.resolve(__dirname, "src/pericias"),
            "@personagens": path.resolve(__dirname, "src/personagens"),
            "@poderes": path.resolve(__dirname, "src/poderes"),
            "@save": path.resolve(__dirname, "src/save"),
            "@persistencia": path.resolve(__dirname, "src/persistencia"),
            "@ui": path.resolve(__dirname, "src/ui")

        }

    }

});
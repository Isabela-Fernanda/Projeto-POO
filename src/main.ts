import "./style.css";
import { Cena3D } from "./3d/Cena3D.js";
import { Mapa } from "./mapa/mapa.js";
import { MasmorraTutorial } from "./mapa/salas/masmorraTutoria.js";
import { CriadorPersonagemTeste } from "../src/criacao/jogadorTeste.js";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
    throw new Error("Elemento #app não encontrado no HTML.");
}

const mapa = new Mapa();
const masmorra = new MasmorraTutorial();

masmorra.construir(mapa);

const jogador = CriadorPersonagemTeste.criar();

const cena = new Cena3D(app, mapa, jogador);

// Disponibiliza a limpeza da cena para uso futuro.
if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        cena.destruir();
    });
}

import { Bootstrap } from "./bootstrap.js";
import { MenuInicial } from "@save/menuInicial.js";

Bootstrap.iniciar();

const menu = new MenuInicial();

await menu.abrir();


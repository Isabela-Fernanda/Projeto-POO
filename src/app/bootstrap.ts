import { RegistroClasses } from "../save/registroClasses.js";
import "./util/terminal.js"

export class Bootstrap {
    static iniciar() {
        RegistroClasses.registrarTudo();
    }
}
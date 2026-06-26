/* 
override usar(usuario: Personagem): boolean {

    usuario.regenerarVida(10);

    usuario.getInventario().removerItem(this);

    console.log(`${usuario.getNome()} recuperou 10 PV.`);

    return true;
}

getAcoes(personagem: Personagem): AcaoItem[] {
    return [
        {
            nome: "Beber",
            executar: () => this.usar(personagem)
        },
        {
            nome: "Examinar",
            executar: () => {
                console.log(this.getDescricao());
                return false;
            }
        },
        {
            nome: "Soltar",
            executar: () => {
                personagem.getInventario().remover(this);
                return true;
            }
        }
    ];
}
*/
import Phaser from "phaser";

export class Botao extends Phaser.GameObjects.Container {
    private fundo: Phaser.GameObjects.Rectangle;
    private texto: Phaser.GameObjects.Text;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        largura: number,
        altura: number,
        texto: string,
        callback: () => void
    ) {
        super(scene, x, y);

        this.fundo = scene.add.rectangle(
            0,
            0,
            largura,
            altura,
            0x404040
        );

        this.fundo.setStrokeStyle(2, 0xffffff);

        this.texto = scene.add.text(
            0,
            0,
            texto,
            {
                fontSize: "28px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        this.add(this.fundo);
        this.add(this.texto);

        this.setSize(largura, altura);

        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -largura / 2,
                -altura / 2,
                largura,
                altura
            ),
            Phaser.Geom.Rectangle.Contains
        );

        this.on("pointerover", () => {
            this.fundo.setFillStyle(0x606060);
        });

        this.on("pointerout", () => {
            this.fundo.setFillStyle(0x404040);
        });

        this.on("pointerdown", callback);

        scene.add.existing(this);
    }
}
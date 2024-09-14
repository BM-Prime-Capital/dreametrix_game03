import * as PIXI from "pixi.js";
import { App } from '../system/App';  
import { Scene } from "../system/Scene";

export class MathChessSelection extends Scene {
    create() {
        this.createBackground();
        this.createTitle(); // Texte "GAMES"
        this.createTopMenu(); // Les boutons All Games et Ranks
        this.createPurpleBar(); // Barre violette avec le texte
        this.createInstructions(); // Instructions sous la barre
        this.createPlayButton(); // Bouton "PLAY"
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    // Création du titre "GAMES" avec la couleur spécifiée
    createTitle() {
        const title = new PIXI.Text("GAMES", { fontSize: 32, fill: '#22ADA0', fontWeight: 'bold' });
        title.position.set(30, 20); // Position en haut à gauche
        this.container.addChild(title);
    }

    // Création du menu supérieur avec les boutons All Games et Ranks
    createTopMenu() {
        const allGamesBtn = this.createButton("All Games", 0xF164CD, 30, 70);  // Couleur F164CD
        const ranksBtn = this.createButton("Ranks", 0x75BBFF, 200, 70);        // Couleur 75BBFF

        this.container.addChild(allGamesBtn);
        this.container.addChild(ranksBtn);
    }

    // Création de la barre violette avec le texte "Math chess"
    createPurpleBar() {
        const purpleBar = new PIXI.Graphics();
        purpleBar.beginFill(0x9C27B0);  // Couleur violette
        purpleBar.drawRect(0, 0, window.innerWidth, 80);  // Barre sur toute la largeur
        purpleBar.endFill();
        purpleBar.position.set(0, 150);
        this.container.addChild(purpleBar);

        // Texte "Math chess" sur la barre violette
        const barText = new PIXI.Text("Math chess", { fontSize: 32, fill: '#ffffff', fontWeight: 'bold' });
        barText.anchor.set(0.5);
        barText.position.set(window.innerWidth / 2, 190);  // Centré sur la barre
        this.container.addChild(barText);
    }

    // Instructions sous la barre avec les couleurs spécifiques
    createInstructions() {
        // Le conteneur pour la phrase complète
        const instructionContainer = new PIXI.Container();

        // Création des différentes parties du texte
        const fillText = new PIXI.Text("Fill", { fontSize: 30, fill: '#FF0000' }); // "Fill" en rouge
        const normalText1 = new PIXI.Text(" in the following fields with the ", { fontSize: 30, fill: '#000000' }); // Texte normal en noir
        const availableText = new PIXI.Text("available elements", { fontSize: 30, fill: '#4CAF50' }); // "available elements" en vert
        const normalText2 = new PIXI.Text(".", { fontSize: 30, fill: '#000000' }); // Texte final en noir

        // Positionnement des parties
        fillText.x = 0;
        normalText1.x = fillText.width + 5;
        availableText.x = fillText.width + normalText1.width + 10;
        normalText2.x = fillText.width + normalText1.width + availableText.width + 15;

        // Ajout des parties dans le conteneur
        instructionContainer.addChild(fillText);
        instructionContainer.addChild(normalText1);
        instructionContainer.addChild(availableText);
        instructionContainer.addChild(normalText2);

        // Positionnement du conteneur
        instructionContainer.position.set(window.innerWidth / 2 - instructionContainer.width / 2, 300); // Centré horizontalement et ajusté verticalement

        this.container.addChild(instructionContainer);
    }

    // Création du bouton "PLAY"
    createPlayButton() {
        const playBtn = new PIXI.Graphics();
        playBtn.beginFill(0x42A5F5);
        playBtn.drawRoundedRect(0, 0, 200, 60, 10);
        playBtn.endFill();
    
        playBtn.position.set(window.innerWidth / 2 - 100, window.innerHeight / 2 + 100);
        playBtn.interactive = true;
        playBtn.buttonMode = true;
    
        const playText = new PIXI.Text("PLAY", { fontSize: 24, fill: '#ffffff' });
        playText.anchor.set(0.5);
        playText.position.set(playBtn.width / 2, playBtn.height / 2);
        playBtn.addChild(playText);
    
        playBtn.on('pointerdown', () => {
            console.log("PLAY button clicked");
            App.scenes.start("MathChessGame");
        });
        
    
        this.container.addChild(playBtn);
    }
        

    // Création d'un bouton standard pour le menu supérieur
    createButton(text, color, x, y) {
        const button = new PIXI.Graphics();
        button.beginFill(color);
        button.drawRoundedRect(0, 0, 150, 50, 10);  // Taille ajustée des boutons du menu
        button.endFill();

        button.position.set(x, y);
        button.interactive = true;
        button.buttonMode = true;

        const buttonText = new PIXI.Text(text, { fontSize: 18, fill: '#ffffff' });
        buttonText.anchor.set(0.5);
        buttonText.position.set(button.width / 2, button.height / 2);
        button.addChild(buttonText);

        return button;
    }
}

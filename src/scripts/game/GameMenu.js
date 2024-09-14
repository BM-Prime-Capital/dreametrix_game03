import * as PIXI from "pixi.js";
import { App } from '../system/App';  // Assurez-vous que cet import fonctionne maintenant
import { Scene } from "../system/Scene";

export class GameMenu extends Scene {
    create() {
        this.createBackground();
        this.createTitle();
        this.createTopMenu();
        this.createPinkLine();  // Ajout de la barre rose
        this.createGameOptions();
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

    // Ajout de la longue barre rose sous les boutons All Games et Ranks
    createPinkLine() {
        const pinkLine = new PIXI.Graphics();
        pinkLine.beginFill(0xFF80AB);  // Couleur rose
        pinkLine.drawRect(0, 0, window.innerWidth, 80); // Longueur totale de l'écran
        pinkLine.endFill();

        pinkLine.position.set(0, 150);  // Position de la barre juste sous les boutons
        this.container.addChild(pinkLine);
    }

    // Création des boutons des options de jeu (Quizz, Math Chess, Game 3)
    createGameOptions() {
        const offsetY = 40;
        const buttonHeight = 80;
        const quizzBtn = this.createGameButton("Quizz", 0x4caf50, window.innerWidth / 2 - 100, window.innerHeight / 2 - 80 + offsetY, '📚', 200, buttonHeight);  
        const chessBtn = this.createGameButton("Math chess", 0x1e88e5, window.innerWidth / 2 - 200, window.innerHeight / 2 + 10 + offsetY, '', 400, buttonHeight);  
        const game3Btn = this.createGameButton("Game 3", 0xe53935, window.innerWidth / 2 - 100, window.innerHeight / 2 + 100 + offsetY, '🎮', 200, buttonHeight);  
    
        // Action pour le bouton "Math chess"
        chessBtn.on('pointerdown', () => {
            App.scenes.start("MathChessSelection");
        });
    
        // Ajout des boutons sans action
        this.container.addChild(quizzBtn);  // Bouton sans action
        this.container.addChild(chessBtn);  // Bouton avec action pour "Math chess"
        this.container.addChild(game3Btn);  // Bouton sans action
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

    // Création des boutons spécifiques aux jeux avec une largeur et hauteur variable
    createGameButton(text, color, x, y, icon = '', width = 300, height = 60) {  // Largeur et hauteur variables
        const button = new PIXI.Graphics();
        button.beginFill(color);
        button.drawRoundedRect(0, 0, width, height, 15);  // Largeur et hauteur ajustées pour chaque bouton
        button.endFill();

        button.position.set(x, y);
        button.interactive = true;
        button.buttonMode = true;

        // Ajout de l'icône du bouton de jeu (s'il y en a)
        const buttonText = new PIXI.Text(`${icon} ${text}`, { fontSize: 24, fill: '#ffffff' });
        buttonText.anchor.set(0.5);
        buttonText.position.set(button.width / 2, button.height / 2);
        button.addChild(buttonText);

        return button;
    }
}

import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { Scene } from "../system/Scene";

export class MathChessGame extends Scene {
    create() {
        this.createBackground();
        this.createTitle();  // Texte "GAMES"
        this.createTopMenu();  // Les boutons All Games et Ranks
        this.createPurpleBar();  // Barre violette avec le texte
        this.createGreenBar();   // Barre verte avec les scores et coeurs
        this.createChessBoard(); // Ajout du tableau avec le contenu
        this.createDragAndDropArea(); // Zone de drag and drop
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    createTitle() {
        const title = new PIXI.Text("GAMES", { fontSize: 32, fill: '#22ADA0', fontWeight: 'bold' });
        title.position.set(30, 20);
        this.container.addChild(title);
    }

    createTopMenu() {
        const allGamesBtn = this.createButton("All Games", 0xF164CD, 30, 70);
        const ranksBtn = this.createButton("Ranks", 0x75BBFF, 200, 70);

        allGamesBtn.on('pointerdown', () => {
            App.scenes.start("GameMenu");  // Retour au menu principal
        });

        this.container.addChild(allGamesBtn);
        this.container.addChild(ranksBtn);
    }

    createPurpleBar() {
        const purpleBar = new PIXI.Graphics();
        purpleBar.beginFill(0x9C27B0);
        purpleBar.drawRect(0, 0, window.innerWidth, 80);
        purpleBar.endFill();
        purpleBar.position.set(0, 150);
        this.container.addChild(purpleBar);

        const barText = new PIXI.Text("Math chess", { fontSize: 32, fill: '#ffffff', fontWeight: 'bold' });
        barText.anchor.set(0.5);
        barText.position.set(window.innerWidth / 2, 190);
        this.container.addChild(barText);
    }

    createGreenBar() {
        const greenBar = new PIXI.Graphics();
        greenBar.beginFill(0x42A5F5);  // Couleur verte
        greenBar.drawRect(0, 0, window.innerWidth, 50);
        greenBar.endFill();
        greenBar.position.set(0, 230);
        this.container.addChild(greenBar);
    
        // Score avec un espacement supplémentaire à gauche
        const scorePaddingLeft = 50;  // Espace ajouté à gauche
        const scoreText = new PIXI.Text("Score: 256", { fontSize: 20, fill: '#ffffff' });
        scoreText.position.set(scorePaddingLeft, 245);
        this.container.addChild(scoreText);
    
        // Level
        const levelText = new PIXI.Text("Level 1", { fontSize: 20, fill: '#ffffff' });
        levelText.position.set(window.innerWidth / 2 - levelText.width / 2, 245);
        this.container.addChild(levelText);
    
        // Hearts (using heart.svg) avec espacement ajusté
        const heartTexture = App.res("heart");
        const heartsPaddingRight = 110;  // Décalage supplémentaire pour les cœurs
        if (heartTexture) {
            const heart1 = new PIXI.Sprite(heartTexture);
            const heart2 = new PIXI.Sprite(heartTexture);
            const heart3 = new PIXI.Sprite(heartTexture);
    
            heart1.position.set(window.innerWidth - heartsPaddingRight - 120, 240); // Décalé à gauche
            heart2.position.set(window.innerWidth - heartsPaddingRight - 80, 240);  // Décalé à gauche
            heart3.position.set(window.innerWidth - heartsPaddingRight - 40, 240);  // Décalé à gauche
            heart1.width = heart2.width = heart3.width = 30;
            heart1.height = heart2.height = heart3.height = 30;
    
            this.container.addChild(heart1);
            this.container.addChild(heart2);
            this.container.addChild(heart3);
        } else {
            console.error("Heart texture not found!");
        }
    
        // Ajout du point d'interrogation à droite avec plus d'espacement
        const questionMarkTexture = App.res("questionmark");
        const questionMarkPaddingRight = 80;  // Espacement supplémentaire à droite
        if (questionMarkTexture) {
            const questionMark = new PIXI.Sprite(questionMarkTexture);
            questionMark.position.set(window.innerWidth - questionMarkPaddingRight, 240);  // Décalé à droite
            questionMark.width = questionMark.height = 30;
            this.container.addChild(questionMark);
        } else {
            console.error("Question mark texture not found!");
        }
    }      
    
    createChessBoard() {
        const graphics = new PIXI.Graphics();
        const startX = window.innerWidth / 2 - 175; // Centrer horizontalement
        const startY = 300;
        const cellSize = 70;
    
        // Dessiner les lignes du tableau
        // Ligne supérieure
        graphics.lineStyle(2, 0x000000); 
        graphics.moveTo(startX, startY);
        graphics.lineTo(startX + cellSize * 5, startY);
    
        // Ligne gauche
        graphics.moveTo(startX, startY);
        graphics.lineTo(startX, startY + cellSize * 5);
    
        // Ligne droite
        graphics.moveTo(startX + cellSize * 5, startY);
        graphics.lineTo(startX + cellSize * 5, startY + cellSize * 5);
    
        // Ligne inférieure
        graphics.moveTo(startX, startY + cellSize * 5);
        graphics.lineTo(startX + cellSize * 5, startY + cellSize * 5);
    
        // Lignes horizontales du cadre
        graphics.moveTo(startX, startY + cellSize);
        graphics.lineTo(startX + cellSize * 5, startY + cellSize);
    
        graphics.moveTo(startX, startY + cellSize * 4);
        graphics.lineTo(startX + cellSize * 5, startY + cellSize * 4);
    
        // Lignes verticales du cadre
        graphics.moveTo(startX + cellSize, startY);
        graphics.lineTo(startX + cellSize, startY + cellSize * 5);
    
        graphics.moveTo(startX + cellSize * 4, startY);
        graphics.lineTo(startX + cellSize * 4, startY + cellSize * 5);
    
        // Petites lignes pour séparer les symboles en haut
        graphics.moveTo(startX + cellSize * 2, startY + cellSize);
        graphics.lineTo(startX + cellSize * 2, startY + cellSize * -0);
    
        graphics.moveTo(startX + cellSize * 3, startY + cellSize);
        graphics.lineTo(startX + cellSize * 3, startY + cellSize * -0);
    
        // Petites lignes pour séparer les symboles en bas
        graphics.moveTo(startX + cellSize * 3, startY + cellSize *4);
        graphics.lineTo(startX + cellSize * 3, startY + cellSize * 5);

        graphics.moveTo(startX + cellSize * 2, startY + cellSize *4);
        graphics.lineTo(startX + cellSize * 2, startY + cellSize * 5);

         // Petites lignes pour séparer les symboles sur la colonne Gauche
        graphics.moveTo(startX + cellSize *1, startY + cellSize *3);
        graphics.lineTo(startX + cellSize * 0, startY + cellSize * 3);

        graphics.moveTo(startX + cellSize *1, startY + cellSize *2);
        graphics.lineTo(startX + cellSize * 0, startY + cellSize * 2);

        // Petites lignes pour séparer les symboles sur la colonne Droit
        graphics.moveTo(startX + cellSize * 5, startY + cellSize *3);
        graphics.lineTo(startX + cellSize * 4, startY + cellSize * 3);

        graphics.moveTo(startX + cellSize *5, startY + cellSize *2);
        graphics.lineTo(startX + cellSize * 4, startY + cellSize * 2);

        this.container.addChild(graphics);
    
        // Définir le tableau avec les chiffres et les signes
        const symbols = [
            ['3', '-', '?', '=', '4'],  // Ligne 1
            ['+', '', '', '', '?'],      // Ligne 2
            ['1', '', '', '', '1'],      // Ligne 3
            ['=', '', '', '', '='],      // Ligne 4
            ['?', '+', '1', '=', '5']    // Ligne 5
        ];
    
        // Ajouter les symboles
        symbols.forEach((row, rowIndex) => {
            row.forEach((symbol, colIndex) => {
                const x = startX + colIndex * cellSize + cellSize / 2; // Centrer dans la case
                const y = startY + rowIndex * cellSize + cellSize / 2; // Centrer dans la case
    
                const text = this.createDraggableText(symbol, 0x000000, x, y);
                text.anchor.set(0.5); // Centrer le texte
                this.container.addChild(text);
            });
        });
    }
    
    // Fonction pour mélanger un tableau
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Échange
        }
    }
    
    // Fonction pour mélanger un tableau
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Échange
        }
    }

    createDragAndDropArea() {
        // Fond blanc avec bordure arrondie et padding augmenté
        const padding = 60;  // Espace autour de la zone blanche
        const dropAreaY = window.innerHeight - 70;  // Descendre encore plus la zone blanche
        const backgroundHeight = 50;  // Réduire encore plus la hauteur de la zone blanche
        const background = new PIXI.Graphics();
        background.beginFill(0xffffff);  // Fond blanc
        background.lineStyle(2, 0x808080);  // Bordure grise visible
        background.drawRoundedRect(padding, dropAreaY, window.innerWidth - 2 * padding, backgroundHeight, 10);  // Taille ajustée
        background.endFill();
        this.container.addChild(background);
    
        // Texte "Drag and drop :"
        const dragDropText = new PIXI.Text("Drag and drop :", { fontSize: 30, fill: '#000000' });
        dragDropText.position.set(padding + 10, dropAreaY + 10);  // Ajuster la position du texte
        this.container.addChild(dragDropText);
    
        // Draggable numbers
        const dragElementPadding = 100;  // Décalage supplémentaire pour les éléments
        const num1 = this.createDraggableText("1", 0xFF0000, padding + dragElementPadding + 250, dropAreaY + 10); // Décalé à droite
        const num4 = this.createDraggableText("4", 0xFF0000, padding + dragElementPadding + 350, dropAreaY + 10); // Décalé à droite
        const plus = this.createDraggableText("+", 0xFF0000, padding + dragElementPadding + 450, dropAreaY + 10); // Décalé à droite
    
        this.container.addChild(num1);
        this.container.addChild(num4);
        this.container.addChild(plus);
    }       
    
    createButton(text, color, x, y) {
        const button = new PIXI.Graphics();
        button.beginFill(color);
        button.drawRoundedRect(0, 0, 150, 50, 10);
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

    createDraggableText(text, color, x, y) {
        const draggable = new PIXI.Text(text, { fontSize: 30, fill: color });
        draggable.position.set(x, y);
        draggable.interactive = true;
        draggable.buttonMode = true;
        draggable.on('pointerdown', this.onDragStart);
        draggable.on('pointerup', this.onDragEnd);
        draggable.on('pointerupoutside', this.onDragEnd);
        draggable.on('pointermove', this.onDragMove);

        return draggable;
    }

    onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
    }

    onDragEnd() {
        this.dragging = false;
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
        }
    }
}
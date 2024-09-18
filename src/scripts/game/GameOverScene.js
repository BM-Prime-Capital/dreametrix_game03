import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { Scene } from "../system/Scene";

export class GameOverScene extends Scene {
    create() {
        this.createBackground();
        this.createTitle();
        this.createTopMenu();
        this.createPurpleBar();
        this.createGreenBar();
        this.createGameOverText();
        this.createRetryAndAllGamesButtons();
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
        const ranksBtn = this.createButton("Ranks", 0x75BBFF, 250, 70);

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

        const barText = new PIXI.Text("Story puzzle", { fontSize: 32, fill: '#ffffff', fontWeight: 'bold' });
        barText.anchor.set(0.5);
        barText.position.set(window.innerWidth / 2, 190);
        this.container.addChild(barText);
    }

    createGreenBar() {
        const greenBar = new PIXI.Graphics();
        greenBar.beginFill(0x42A5F5);
        greenBar.drawRect(0, 0, window.innerWidth, 50);
        greenBar.endFill();
        greenBar.position.set(0, 230);
        this.container.addChild(greenBar);

        const scorePaddingLeft = 50;
        const scoreText = new PIXI.Text(`Score: ${this.score}`, { fontSize: 20, fill: '#ffffff' });
        scoreText.position.set(scorePaddingLeft, 245);
        this.container.addChild(scoreText);

        const levelText = new PIXI.Text(`Level ${this.level}`, { fontSize: 20, fill: '#ffffff' });
        levelText.position.set(window.innerWidth / 2 - levelText.width / 2, 245);
        this.container.addChild(levelText);

        const heartTexture = App.res("heart");
        const heartsPaddingRight = 110;
        if (heartTexture) {
            const heart1 = new PIXI.Sprite(heartTexture);
            const heart2 = new PIXI.Sprite(heartTexture);
            const heart3 = new PIXI.Sprite(heartTexture);

            heart1.position.set(window.innerWidth - heartsPaddingRight - 120, 240); 
            heart2.position.set(window.innerWidth - heartsPaddingRight - 80, 240);  
            heart3.position.set(window.innerWidth - heartsPaddingRight - 40, 240);  
            heart1.width = heart2.width = heart3.width = 30;
            heart1.height = heart2.height = heart3.height = 30;

            this.container.addChild(heart1);
            this.container.addChild(heart2);
            this.container.addChild(heart3);
        } else {
            console.error("Heart texture not found!");
        }
        
        const questionMarkTexture = App.res("questionmark");
        if (questionMarkTexture) {
            const questionMark = new PIXI.Sprite(questionMarkTexture);
            questionMark.position.set(window.innerWidth - 80, 240);
            questionMark.width = questionMark.height = 30;
            this.container.addChild(questionMark);
        } else {
            console.error("Question mark texture not found!");
        }
    }

    createGameOverText() {
        const upsText = new PIXI.Text("UPS!", { fontSize: 50, fill: '#FF0000', fontWeight: 'bold' });
        upsText.anchor.set(0.5);
        upsText.position.set(window.innerWidth / 2, 370);
        this.container.addChild(upsText);

        const tryAgainText = new PIXI.Text("TRY AGAIN", { fontSize: 60, fill: '#FF0000', fontWeight: 'bold' });
        tryAgainText.anchor.set(0.5);
        tryAgainText.position.set(window.innerWidth / 2, 440);
        this.container.addChild(tryAgainText);

        const currentScoreText = new PIXI.Text(`Current Score: ${this.score}`, { fontSize: 24, fill: '#000000' });
        currentScoreText.position.set(window.innerWidth / 2 - 295, 520);
        this.container.addChild(currentScoreText);

        const currentLevelText = new PIXI.Text(`Current Level: ${this.level}`, { fontSize: 24, fill: '#000000' });
        currentLevelText.position.set(window.innerWidth / 2 - 295, 560);
        this.container.addChild(currentLevelText);

        const highScoreText = new PIXI.Text(`High Score: ${this.highScore}`, { fontSize: 24, fill: '#000000' });
        highScoreText.position.set(window.innerWidth / 2 + 50, 520);
        this.container.addChild(highScoreText);

        const highLevelText = new PIXI.Text(`High Level: ${this.highLevel}`, { fontSize: 24, fill: '#000000' });
        highLevelText.position.set(window.innerWidth / 2 + 50, 560);
        this.container.addChild(highLevelText);
    }

    createRetryAndAllGamesButtons() {
        const buttonSpacing = 100;
        const retryButton = this.createButton("Retry", 0x42A5F5, window.innerWidth / 2 - 100 - buttonSpacing, 620);
        const allGamesButton = this.createButton("All Games", 0x9C27B0, window.innerWidth / 2 + buttonSpacing - 70, 620);

        retryButton.on('pointerdown', () => {
            App.scenes.start("MathChessGame");
        });

        this.container.addChild(retryButton);
        this.container.addChild(allGamesButton);
    }

    createButton(text, color, x, y) {
        const button = new PIXI.Graphics();
        button.beginFill(color);
        button.drawRoundedRect(0, 0, 200, 60, 10);
        button.endFill();

        button.position.set(x, y);
        button.interactive = true;
        button.buttonMode = true;

        const buttonText = new PIXI.Text(text, { fontSize: 24, fill: '#ffffff' });
        buttonText.anchor.set(0.5);
        buttonText.position.set(button.width / 2, button.height / 2);
        button.addChild(buttonText);

        return button;
    }
}

/*
Explication :
-------------

    - Le gestionnaire de scènes permet de basculer entre les différentes scènes du jeu.
    - Lorsqu'une scène est démarrée via start(scene), la scène précédente est supprimée et la nouvelle est initialisée et ajoutée au conteneur.
*/
import * as PIXI from "pixi.js";
import { App } from "./App";

export class ScenesManager {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.scene = null;
    }

    start(scene) {
        if (this.scene) {
            this.scene.remove();
        }

        // Vérification si la scène existe dans la configuration
        if (!App.config.scenes[scene]) {
            console.error(`Scene "${scene}" does not exist in config.`);
            return;
        }

        // Initialisation de la nouvelle scène
        this.scene = new App.config.scenes[scene]();
        this.container.addChild(this.scene.container);
    }
}

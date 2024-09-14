/*
Explication :
-------------

    - Ce fichier représente une scène de jeu.
    - Lorsqu'une scène est créée, elle obtient un conteneur interactif (pour gérer les interactions utilisateur) et est ajoutée au ticker de PIXI pour être mise à jour à chaque frame via update().
    - La méthode remove() retire la scène du ticker et la détruit.
*/

import * as PIXI from "pixi.js";
import { App } from "./App";

export class Scene {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.create();
        App.app.ticker.add(this.update, this);
    }

    create() {}
    update() {}
    destroy() {}

    remove() {
        App.app.ticker.remove(this.update, this);
        this.destroy();
    }
}

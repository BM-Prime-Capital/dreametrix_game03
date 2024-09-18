/*
Explication :
-------------

    - Ce fichier contient la classe principale de l'application (Application).
    - La méthode run(config) :
        - Enregistre le plugin GSAP pour les animations.
        - Crée une instance PIXI qui redimensionne automatiquement selon la fenêtre.
        - Ajoute la vue du jeu (this.app.view) au document HTML.
        - Crée un ScenesManager pour gérer les différentes scènes du jeu.
        - Charge les ressources à travers un Loader et démarre le jeu une fois le chargement terminé.
    - La méthode res(key) retourne la texture d'une ressource.
    - La méthode sprite(key) crée et retourne un sprite PIXI à partir d'une ressource.
    - La méthode start() démarre la scène du jeu en appelant scenes.start("Game").
*/


import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";

class Application {
    run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.app = new PIXI.Application({ resizeTo: window });
        document.body.appendChild(this.app.view);

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        this.loader = new Loader(this.app.loader, this.config);
        this.loader.preload().then(() => this.start());
    }

    res(key) {
        const resource = this.loader.resources[key];
        if (!resource) {
            console.error(`Resource with key "${key}" not found`);
            return null;
        }
        return resource.texture;
    }
    

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }

    start() {
        //this.scenes.start("GameOverScene");
        this.scenes.start("GameMenu");
    }
}

// Exporter l'objet App pour qu'il puisse être utilisé dans d'autres fichiers
export const App = new Application();

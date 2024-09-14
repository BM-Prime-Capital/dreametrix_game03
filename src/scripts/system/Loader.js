/*
Explication :
-------------

    - Ce fichier gère le chargement des ressources (images, sons, etc.) nécessaires au jeu.
    - La méthode preload() parcourt toutes les ressources définies dans la configuration, extrait leur clé (nom de fichier sans extension), et les charge via le loader PIXI.
    - Retourne une promesse qui se résout lorsque toutes les ressources sont chargées.
*/
export class Loader {
    constructor(loader, config) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    preload() {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));

            // Ajout des fichiers .svg
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1 || asset.key.indexOf(".svg") !== -1) {
                this.loader.add(key, asset.data.default);
            }
        }

        return new Promise(resolve => {
            this.loader.load((loader, resources) => {
                console.log("Loaded resources:", resources); // Vérifier toutes les ressources chargées
                this.resources = resources;
                resolve();
            });        
        });
    }
}

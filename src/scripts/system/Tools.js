/*
Explication :
------------

    - Cette classe contient des outils utilitaires.
    - La méthode massiveRequire() permet de charger massivement des fichiers (comme des images, sons) en les récupérant dans un dossier spécifique. C'est ici que les ressources du jeu sont listées et préparées pour le chargement.
*/

export class Tools {
    static massiveRequire(req) {
        const files = [];

        req.keys().forEach(key => {
            files.push({
                key, data: req(key)
            });
        });

        console.log("Loaded files:", files);  // Ajoutez cette ligne pour vérifier les fichiers chargés
        return files;
    }
}


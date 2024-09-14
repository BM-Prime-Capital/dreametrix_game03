/*
Explication :

    - Ce fichier est le point d'entrée de l'application. Il importe deux modules :
        - App qui représente l'instance principale de l'application (gère le démarrage, les scènes, etc.).
        - Config qui contient les configurations de jeu (ex. ressources à charger, scènes, etc.).
    - La méthode App.run(Config) lance l'application en utilisant la configuration définie dans Config.
*/

import { App } from "./system/App";
import { Config } from "./game/Config";

App.run(Config);
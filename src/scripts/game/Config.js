/*
Explication :
-------------

    - Ce fichier contient la configuration du jeu.
    - Il spécifie les ressources à charger via Tools.massiveRequire et les scènes disponibles, notamment la scène "Game".
*/

import { GameMenu } from "./GameMenu";
import { MathChessSelection } from "./MathChessSelection";
import { MathChessGame } from "./MathChessGame";
import { GameOverScene } from "./GameOverScene";

import { Tools } from "../system/Tools";

export const Config = {
    loader: Tools.massiveRequire(require.context('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "GameMenu": GameMenu,
        "MathChessSelection": MathChessSelection,
        "MathChessGame": MathChessGame,
        "GameOverScene": GameOverScene
    }
};

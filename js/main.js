import Game from "./game.js";
import GameView from "./vistajuego.js";

let game = new Game()
let gameView = new GameView(document.querySelector("#app"))

//definir funciones
gameView.onTileClick = function(i) {
    game.hacerMovimiento(i);
    gameView.update(game)
};

gameView.onRestartClick = function() {
    game = new Game();
    gameView.update(game);
};

gameView.update(game)


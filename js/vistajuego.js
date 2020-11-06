export default class GameView {
    constructor(root) {
        this.root = root;

        this.root.innerHTML = `
            <div class="header">
                <div class="header__turno"></div>
                <div class="header__estado"></div>
                <button type="button" class="header__reiniciar">
                    <i class="material-icons">refresh</i>
                </button>
            </div>

            <div class="tablero">
                <div class="tablero__azulejo" data-index="0"></div>
                <div class="tablero__azulejo" data-index="1"></div>
                <div class="tablero__azulejo" data-index="2"></div>
                <div class="tablero__azulejo" data-index="3"></div>
                <div class="tablero__azulejo" data-index="4"></div>
                <div class="tablero__azulejo" data-index="5"></div>
                <div class="tablero__azulejo" data-index="6"></div>
                <div class="tablero__azulejo" data-index="7"></div>
                <div class="tablero__azulejo" data-index="8"></div>
            </div>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".tablero__azulejo").forEach(azu => {
            
            azu.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(azu.dataset.index);
                }
            });
        });

        this.root.querySelector(".header__reiniciar").addEventListener("click", () => {
            
            if (this.onRestartClick) {
                this.onRestartClick();
            } 
        });
    }

    update(game) {
        this.updateTurno(game)
        this.updateEstado(game)
        this.updateTablero(game)
    }

    updateTurno(game) {
        this.root.querySelector(".header__turno").textContent = `Turno de ${game.turno}`
    }

    updateEstado(game) {
        let estado = 'En Juego'

        if (game.buscarCombinacionGanadora()) {
            estado = `${game.turno} es el Ganador`
        } else if (!game.enProgreso()) {
            estado = 'Es un Empate'
        }

        this.root.querySelector(".header__estado").textContent = estado;
    }

    updateTablero(game) {
        const combinacionesGanadoras = game.buscarCombinacionGanadora();

        for (let i = 0; i < game.tablero.length; i++) {
            const azu = this.root.querySelector(`.tablero__azulejo[data-index="${i}"]`);

            azu.classList.remove("tablero__azulejo--ganador")
            azu.textContent = game.tablero[i];

            if (combinacionesGanadoras && combinacionesGanadoras.includes(i)) {
                azu.classList.add("tablero__azulejo--ganador")
            }
        }
    }
}
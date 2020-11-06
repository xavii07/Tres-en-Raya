export default class Game {
    constructor() {
        this.turno = "X";
        this.tablero = new Array(9).fill(null);
    }

    turnoSiguiente() {
        this.turno = this.turno === "X" ? "O" : "X";
    }

    hacerMovimiento(i) {
        if (!this.enProgreso()) {
            return;
        }

        if (this.tablero[i]) {
            return;
        }
        
        this.tablero[i] = this.turno;

        if (!this.buscarCombinacionGanadora()) {
            this.turnoSiguiente();
        }   
    }

    buscarCombinacionGanadora() {
        const combinacionesGanadoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];


        for (const combinacion of combinacionesGanadoras) {
            const [a, b, c] = combinacion;

            if (this.tablero[a] && (this.tablero[a] === this.tablero[b] && this.tablero[a] === this.tablero[c])) {
                return combinacion;
            }
        }

        return null;
    }

    enProgreso() {
        return !this.buscarCombinacionGanadora() && this.tablero.includes(null);
    }
    
}



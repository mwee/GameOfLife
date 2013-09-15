var DEAD = 0;
var ALIVE = 1;

// initialize the board object in a closure
var Board = function (MAX_X, MAX_Y) {
	var board = [];
	var next_gen = [];

	// COULD CHANGE ITERATION METHOD
	for (var i = 0; i < MAX_X; i++) {
		board[i] = []
		next_gen[i] = []
		for (j = 0; j < MAX_Y; j++) {
			if (i % 3 == j % 3) {
				board[i][j] = ALIVE; // some way of doing initial configurations ? ? ? :D
			} else {
				board[i][j] = DEAD;
			}
		}
	}

	return {
		update: function() {
			for (var i = 0; i < MAX_X; i++) {
				for (var j = 0; j < MAX_Y; j++) {
					var cell = board[i][j]					
					// check up to 8 cells around target cell
					var num_live_neighbours = 0;
					for (var a = i - 1; a <= i + 1; a++) {
						for (var b = j - 1; b <= j + 1; b++) {
							if (0 <= a && a < MAX_X && 0 <= b && b < MAX_Y && !(i === a && j === b) && board[a][b] === ALIVE) {
								num_live_neighbours++;
							}
						}
					}
						
					if (cell === ALIVE && num_live_neighbours < 2) {
						next_gen[i][j] = DEAD;
					} else if (cell === ALIVE && 2 <= num_live_neighbours && num_live_neighbours <= 3) {
						next_gen[i][j] = ALIVE;
					} else if (cell === ALIVE && num_live_neighbours > 3) {
						next_gen[i][j] = DEAD;
					} else if (cell === DEAD && num_live_neighbours === 3) {
						next_gen[i][j] = ALIVE;
					} else {
						next_gen[i][j] = cell;
					}
				}
			}

			// copy values from next_gen to board
			for (var i = 0; i < MAX_X; i++) {
				for (var j = 0; j < MAX_Y; j++) {
					board[i][j] = next_gen[i][j];
				}
			}

		},
		get_board: function() {
			return board;
		} 

	}
}



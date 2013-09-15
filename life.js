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
	}

	for (var i = 0; i < MAX_X; i++) {
		for (var j = 0; j < MAX_Y; j++) {
			board[i][j] = 0;
		}
	}


	// INITIALIZE BOARD - got idea to initialize to time from Law Smith
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();

	var timeDigits = [];
	timeDigits.push(parseInt(('' + hour).toString()[0]));
	timeDigits.push(hour % 10);
	timeDigits.push(parseInt(('' + min).toString()[0]));
	timeDigits.push(min % 10);
	
	var numbersToLines = {
		0:[1, 2, 4, 5, 6, 7],
		1:[4, 7],
		2:[1, 3, 4, 5, 6],
		3:[1, 3, 4, 6, 7],
		4:[2, 3, 4, 7],
		5:[1, 2, 3, 6, 7],
		6:[1, 2, 3, 5, 6, 7],
		7:[1, 4, 7],
		8:[1, 2, 3, 4, 5, 6, 7],
		9:[1, 2, 3, 4, 7]};

	for (var i = 0; i < timeDigits.length; i++) {

		var linesList = numbersToLines[timeDigits[i]];


		var horizontalStart = 1 + 4 * i;
		if (i > 1) {
			horizontalStart += 3;
		}

		var verticalStart = 7;

		for (var j = 0; j < linesList.length; j++) {
			var nextNum = linesList[j];
			if (nextNum === 1) {
				board[0 + horizontalStart][0 + verticalStart] = ALIVE;
				board[1 + horizontalStart][0 + verticalStart] = ALIVE;
				board[2 + horizontalStart][0 + verticalStart] = ALIVE;
			} else if (nextNum === 2) {
				board[0 + horizontalStart][0 + verticalStart] = ALIVE;
				board[0 + horizontalStart][1 + verticalStart] = ALIVE;
				board[0 + horizontalStart][2 + verticalStart] = ALIVE;
			} else if (nextNum === 3) {
				board[0 + horizontalStart][2 + verticalStart] = ALIVE;
				board[1 + horizontalStart][2 + verticalStart] = ALIVE;
				board[2 + horizontalStart][2 + verticalStart] = ALIVE;
			} else if (nextNum === 4) {
				board[2 + horizontalStart][0 + verticalStart] = ALIVE;
				board[2 + horizontalStart][1 + verticalStart] = ALIVE;
				board[2 + horizontalStart][2 + verticalStart] = ALIVE;
			} else if (nextNum === 5) {
				board[0 + horizontalStart][2 + verticalStart] = ALIVE;
				board[0 + horizontalStart][3 + verticalStart] = ALIVE;
				board[0 + horizontalStart][4 + verticalStart] = ALIVE;
			} else if (nextNum === 6) {
				board[0 + horizontalStart][4 + verticalStart] = ALIVE;
				board[1 + horizontalStart][4 + verticalStart] = ALIVE;
				board[2 + horizontalStart][4 + verticalStart] = ALIVE;
			} else if (nextNum === 7) {
				board[2 + horizontalStart][2 + verticalStart] = ALIVE;
				board[2 + horizontalStart][3 + verticalStart] = ALIVE;
				board[2 + horizontalStart][4 + verticalStart] = ALIVE;
			}
		}

		board[9][7] = ALIVE;
		board[9][8] = ALIVE;
		board[10][7] = ALIVE;
		board[10][8] = ALIVE;
		board[9][10] = ALIVE;
		board[9][11] = ALIVE;
		board[10][10] = ALIVE;
		board[10][11] = ALIVE;
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



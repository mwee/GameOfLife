// START/STOP FUNCTIONALITY - clearInterval

// DOM <-> GRID EVENT LISTENERS -> MAKE IT A TABLE
// ADD SPEED OPTION --> SET INTERVAL SPEED
// make it look nice
// refactor some code


// variable names DEAD and ALIVE for readability
var DEAD = 0;
var ALIVE = 1;

// initialize the board object in a closure
var Board = function (MAX_X, MAX_Y) {
	var board = [];
	var next_gen = [];

	// initialize the second dimension of both arrays
	for (var i = 0; i < MAX_X; i++) {
		board[i] = []
		next_gen[i] = []
	}

	// initialize everything to DEAD
	for (var i = 0; i < MAX_X; i++) {
		for (var j = 0; j < MAX_Y; j++) {
			board[i][j] = DEAD;
		}
	}

	// method to initialize board state - got idea to initialize the board to the current time from Law Smith
	var initialize_board = function() {
		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();

		// getting the 4 digits from the current time
		var time_digits = [];
		time_digits.push(parseInt(('' + hour).toString()[0]));
		time_digits.push(hour % 10);
		time_digits.push(parseInt(('' + min).toString()[0]));
		time_digits.push(min % 10);
		
		// a dictionary that maps a digit to the 7-stroke digital clock mapping
		var numbers_to_lines = {
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

		// set blocks in digits of the time to ALIVE on the grid
		for (var i = 0; i < time_digits.length; i++) {

			// grab current digit's corresponding strokes to fill in on the grid
			var lines_list = numbers_to_lines[time_digits[i]];

			// variables HORIZONTAL_START and VERTICAL_START that signify where the digit's blocks should begin
			var VERTICAL_START = 7;
			var HORIZONTAL_START = 1 + 4 * i;
			if (i > 1) {
				HORIZONTAL_START += 3;
			}

			// logic to fill in strokes of the digit one by one
			for (var j = 0; j < lines_list.length; j++) {
				var nextNum = lines_list[j];
				if (nextNum === 1) {
					board[0 + HORIZONTAL_START][0 + VERTICAL_START] = ALIVE;
					board[1 + HORIZONTAL_START][0 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][0 + VERTICAL_START] = ALIVE;
				} else if (nextNum === 2) {
					board[0 + HORIZONTAL_START][0 + VERTICAL_START] = ALIVE;
					board[0 + HORIZONTAL_START][1 + VERTICAL_START] = ALIVE;
					board[0 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
				} else if (nextNum === 3) {
					board[0 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
					board[1 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
				} else if (nextNum === 4) {
					board[2 + HORIZONTAL_START][0 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][1 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
				} else if (nextNum === 5) {
					board[0 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
					board[0 + HORIZONTAL_START][3 + VERTICAL_START] = ALIVE;
					board[0 + HORIZONTAL_START][4 + VERTICAL_START] = ALIVE;
				} else if (nextNum === 6) {
					board[0 + HORIZONTAL_START][4 + VERTICAL_START] = ALIVE;
					board[1 + HORIZONTAL_START][4 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][4 + VERTICAL_START] = ALIVE;
				} else if (nextNum === 7) {
					board[2 + HORIZONTAL_START][2 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][3 + VERTICAL_START] = ALIVE;
					board[2 + HORIZONTAL_START][4 + VERTICAL_START] = ALIVE;
				}
			}
		}
	}
	
	// setting colon blocks in the clock to ALIVE
	var set_colons = function() {
		board[9][7] = ALIVE;
		board[9][8] = ALIVE;
		board[10][7] = ALIVE;
		board[10][8] = ALIVE;
		board[9][10] = ALIVE;
		board[9][11] = ALIVE;
		board[10][10] = ALIVE;
		board[10][11] = ALIVE;
	}

	var initialize_test = function() {
		// block still life
		board[1][1] = ALIVE;
		board[1][2] = ALIVE;
		board[2][1] = ALIVE;
		board[2][2] = ALIVE;

		// beehive
		board[5][2] = ALIVE;
		board[6][1] = ALIVE;
		board[6][3] = ALIVE;
		board[7][1] = ALIVE;
		board[7][3] = ALIVE;
		board[8][2] = ALIVE;

		// loaf
		board[15][2] = ALIVE;
		board[16][1] = ALIVE;
		board[16][3] = ALIVE;
		board[17][4] = ALIVE;
		board[17][1] = ALIVE;
		board[18][2] = ALIVE;
		board[18][3] = ALIVE;

		// blinker
		board[4][8] = ALIVE;
		board[4][9] = ALIVE;
		board[4][10] = ALIVE;

		// beacon
		board[15][10] = ALIVE
		board[16][10] = ALIVE;
		board[15][11] = ALIVE;
		board[17][13] = ALIVE;
		board[18][12] = ALIVE;
		board[18][13] = ALIVE;

		// glider
		board[4][13] = ALIVE
		board[6][13] = ALIVE;
		board[5][14] = ALIVE;
		board[6][14] = ALIVE;
		board[5][15] = ALIVE;

	}

	initialize_board();
	set_colons();
	// INTIIALIZE_TEST() CONTAINS TEST CONFIGURATIONS
	//initialize_test();

	// return in the Board closure an update method and a get_board method
	return {
		// the update calculates the state of each cell on the board for the next generation, stores the values in next_gen,
		// then copies it back to the board variable to complete the update
		update: function() {
			// for each cell on the grid, compute the number of neighbours that are alive
			for (var i = 0; i < MAX_X; i++) {
				for (var j = 0; j < MAX_Y; j++) {
					var cell = board[i][j]					
					var num_live_neighbours = 0;

					// check up to 8 cells around target cell, incrementing num_live_neighbours for each live neighbour found
					for (var a = i - 1; a <= i + 1; a++) {
						for (var b = j - 1; b <= j + 1; b++) {
							if (0 <= a && a < MAX_X && 0 <= b && b < MAX_Y && !(i === a && j === b) && board[a][b] === ALIVE) {
								num_live_neighbours++;
							}
						}
					}

					// logic of the game of life based on current cell state and number of neighbours
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
		// get_board returns the board variable, most notably for the graphics library to update the user-facing board 
		get_board: function() {
			return board;
		} 

	}
}



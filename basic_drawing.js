// the main method executing the game of life, running updates, and updating the graphics
(function () {
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
	var white = Color(255, 255, 255);

	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.clear();
    
	// set constants to be able to scale to any canvas size
	var MAX_X = 20;
	var MAX_Y = 20;

 	// set the width of every cell
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;
  
  	// set the side lengths of each square
  	var SIDE_LENGTH = x_factor - 6;

  	// draw the grid lines
	var draw_grid = function() {
		// draw vertical lines
		for (var i = 1; i < MAX_X; i++) {
			pad.draw_line(Coord(i * x_factor + 1, 0), Coord(i * x_factor + 1, pad.get_height()), 1, black);
		}
		// draw horizontal lines
		for (var i = 1; i < MAX_Y; i++) {
			pad.draw_line(Coord(0, i * y_factor + 1), Coord(pad.get_width(), i * y_factor + 1), 1, black);
		}
		// draw edge lines
		pad.draw_line(Coord(401, 401), Coord(0, 401), 1, black);
		pad.draw_line(Coord(401, 401), Coord(401, 0), 1, black);
		pad.draw_line(Coord(1,1), Coord(1, 401), 1, black);
		pad.draw_line(Coord(1,1), Coord(401, 1), 1, black);
	}

	// update the user-facing board by iterating across the board variable returned by the Board closure
	var update_graphics = function(board) {
		for (var i = 0; i < MAX_X; i++) {
			for (var j = 0; j < MAX_Y; j++) {
				if (board[i][j] === ALIVE) {
					pad.draw_rectangle(Coord(i * x_factor + 4, j * y_factor + 4), SIDE_LENGTH, SIDE_LENGTH, 0, black, black);
				} else {
					pad.draw_rectangle(Coord(i * x_factor + 4, j * y_factor + 4), SIDE_LENGTH, SIDE_LENGTH, 0, white, white);
				}
			}
		}
	}

	// initialize Board
	var life = Board(MAX_X, MAX_Y);

	// the main driver loop: draw grid lines, update the graphics, update the game of life state
	setInterval(function() {
		draw_grid();
		update_graphics(life.get_board());
		life.update();
	}, 800);



}) ()
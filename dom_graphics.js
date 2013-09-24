var for_each = function(max_iter, f) {
	for (var i = 0; i < max_iter; i++) {
		for (var j = 0; j < max_iter; j++) {
			f(i,j);
		}
	}
}


var Display = function (init_board) { 
	SIDE_LENGTH = 20

	var make_row = function (j) {
		var row_name = 'row' + j
		var row = $('<div>', {id:row_name, class: 'row'});
		for (var i = 0; i < SIDE_LENGTH; i++) {
			row.append(make_cell(i,j));
		}
		return row
	}

	var make_cell = function(x, y) {
		var cell_name = x + '-' + y ;
		var cell = $('<div>', 
			{class: 'cell alive', id: cell_name, x: x, y: y})
				.attr("onClick", "dom_display.clicked(this.id)");
		console.log(init_board)
		if (init_board[x][y] == 0) {
			cell.addClass('dead').removeClass('alive');
		}
		return cell
	}

	return {
		clicked: function(cell_in) {
			cell = "#" + cell_in;
			if ($(cell).hasClass('alive')) {
				$(cell).addClass('dead').removeClass('alive');
			} else {
				$(cell).addClass('alive').removeClass('dead');
			}
		}, 

		// takes the board array from the game of life and updates the dom
		update_dom: function(board) {
			//console.log(board)
			for_each(SIDE_LENGTH, function(x, y) {
				var cell = '#' + x + '-' + y 

				if (board[x][y] == 0) {
					$(cell).addClass('dead').removeClass('alive');
				} else {
					$(cell).addClass('alive').removeClass('dead');
				}
			})
		},

		// returns a board array for the game of life logic to process
		return_board: function() {
			var new_board = [];
			for (var i = 0; i < SIDE_LENGTH; i++) {
				new_board[i] = []
			}
			for_each(SIDE_LENGTH, function(x, y) {
				var cell = "#" + x + '-' + y ;
				if ($(cell).hasClass('alive')){
					new_board[x][y] = 1;
				}  else {
					new_board[x][y] = 0;
				}
			})
			console.log(new_board);
			return new_board
		},

		setup_dom: function() {
			var canvas = $('<div>').attr({id: 'canvas', class: 'canvas'});
			for (var i = 0; i < SIDE_LENGTH; i++) {
				canvas.append(make_row(i));
			}
			$('#board').append(canvas);
		}
	}

}



// the main method executing the game of life, running updates, 
// and updating the graphics


$( "#slider" ).slider({min: 0, max: 5000});

// set the side lengths of each square
var SIDE_LENGTH = 20;

// initialize Board
var life = Board(SIDE_LENGTH, SIDE_LENGTH);
var dom_display = Display();
dom_display.setup_dom();

$( "#slider" ).slider( "value", 800 );
var interval;
var slider_val;
var startLife = function() {
	interval = setTimeout(function() {
		slider_val = $("#slider").slider("value");
		life.get_board();
		dom_display.update_dom(life.get_board());
		life.set_board(dom_display.return_board());
		life.update();
		startLife();
	}, slider_val);
}

var stop = function() { clearInterval(interval); }


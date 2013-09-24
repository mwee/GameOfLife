// the main method executing the game of life, running updates, 
// and updating the graphics

// initialize slider for speed of game, set min and max milliseconds
$( "#slider" ).slider({min: 0, max: 5000});

// set the side lengths of each square
var SIDE_LENGTH = 20;

// initialize Board with the current time
var life = Board(SIDE_LENGTH, SIDE_LENGTH);
var dom_display = Display(life.get_board());
dom_display.setup_dom();

// initialize speed to 800ms
$( "#slider" ).slider( "value", 800 );
var interval;
var slider_val;
// main loop: get the slider value, pass game of life logic the dom board, step the logic, update the dom
var startLife = function() {
	interval = setTimeout(function() {
		slider_val = $("#slider").slider("value");
		life.set_board(dom_display.return_board());
		life.update();
		dom_display.update_dom(life.get_board());
		startLife();
	}, slider_val);
}

// function to pause
var stop = function() { clearInterval(interval); }


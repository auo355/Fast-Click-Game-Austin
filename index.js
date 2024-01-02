$("#score").fadeOut();

var count = 0;
var max_count = 15;
var number_of_counts_per_game_level = 5;
var max_millisec_per_count = 4000;
var color_sequence = [];
var player_color_choices = new Array(max_count+1); // extra one provides additional space to accommodate button click lag
var array_of_colors = ["red", "blue", "green", "yellow", "black", "purple"];
var gameON = 0;
var score = 0;
var score_increment = 10;
var perfect_score = max_count * score_increment;  // initial score is zero
var game_level = 0;
var color = "grey"; //declare global variable "color" with an irrevelant initial value
	
function play_sound(color){
	var audio = new Audio("sounds/"+color+".mp3");
	audio.play();
}

function flash_object(color){
	//$("."+color).fadeOut().fadeIn();
	$("."+color).addClass("whiteshaddow").delay(50).queue(function(next){$(this).removeClass("whiteshaddow"); next();});
}


jQuery.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};


function spin_object(color){
	//$("."+color).rotate(60).delay(1000).queue(function(next){$(this).rotate(120); });
	$("."+color).rotate(120).delay(50).queue(function(){$(this).rotate(240).dequeue();}).delay(50).queue(function(){$(this).rotate(360).dequeue();});
	//queue(function(next){$(this).rotate(360); next();});
}
 
function generate_random_color(){
	var random_number = Math.floor(Math.random()*6);
    var new_color = array_of_colors[random_number];
	spin_object(new_color);
	color_sequence.push(new_color);
	};




	
async function gameLOOP(){
		gameON = 1;	
		game_level = Math.floor(count/number_of_counts_per_game_level)+1;
		$("#level-title").text('Speed Level '+game_level );
		var game_delay = max_millisec_per_count/game_level ;
	
		setTimeout(function()   {
			generate_random_color();
		
			$(".btn").click(function(){
			color = $(this).attr("id");
			flash_object(color);
			play_sound(color); 
			player_color_choices[count] = color;
			 }); 
				         
			count = count +1; 	
			if (count < max_count){
				gameLOOP(); }
			else {  
				setTimeout(function()   {
					for(var i=0; i<max_count; i++){
						if (color_sequence[i] == player_color_choices[i+1]){
							score = score + score_increment;	} }
					$("#score").text(score);
					$("#game-description").fadeOut();
					$("#score").fadeIn();
					
					if ( score < perfect_score ){
						$("#level-title").text(' !Game Over! refresh page to restart');}
					else {
						$("#level-title").text(' !Perfect Score! refresh page to restart');}
					
					
										}, max_millisec_per_count
						  )
			     }
								}, game_delay 
				    )										
};


$(document).click(function() {
if (gameON == 0){
  gameLOOP();}
  }
);






				

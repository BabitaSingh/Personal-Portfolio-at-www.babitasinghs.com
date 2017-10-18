/*
Author: Babita Singh
MiniMax Algorithm Source: https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
*/

var choose_counts=-1; //to handle multiple click events on player
var huPlayer;
var aiPlayer;
//if user choose to play first then players will be initialized and play function for user gets called
function humanStarted(){
	choose_counts++;
	if(choose_counts>0)
	{
		if(confirm("Would you like to start over?")){
			//Reset board 
			resetBoard();
			huPlayer = "X";
			aiPlayer = "O";
			choose_counts=-1; 
		}else
			alert("Game has been resumed, please play your turn");
	}else{
		huPlayer = "X";
		aiPlayer = "O";		
		human(); //Play function for user
	}	
}
//if Machine's turn, players initialized and AI's play function called
function machineStarted(){
	choose_counts++;
	if(choose_counts>0)
	{
		if(confirm("Would you like to start over?")){
			//Reset the board
			resetBoard();
			huPlayer = "O";
			aiPlayer = "X";
			choose_counts=-1;
		}else
			alert("Game has been resumed, please play your turn");		
	}else{
		huPlayer = "O";
		aiPlayer = "X";
		machine(); //play function for AI
	}	
}

//Play function for user
function human(){
	$('td').unbind('click');
	//function waits until position marked on board, Click event triggers marking
	$('td').click(function(){   
		var id = $(this).attr('id');
		id=id[id.length-1];
		var cellId="block"+id;
		var block=document.getElementById(cellId);
		if(!block.classList.contains("fa-circle") && !block.classList.contains("fa-times")){
			if(huPlayer=="O")
				block.className+=" fa-circle";
			else
				block.className+=" fa-times";
		}	
		// Play function for AI called once user's turn marked
		machine(); 
	});
	//Terminal state check to see if user is winner?
	if (winning(getBoard(), aiPlayer))
		setTimeout(function(){alert("I win!");}, 1);	
}

//Play function for AI
function machine(){
		var board=getBoard();
		var grid=minimax(board, aiPlayer); //MiniMax algorithm called, best move returned in grid as an object{index, score} pair
		var blo="block"+grid.index; //index retrieved for marking
		var block=document.getElementById(blo); 
		if(!block.classList.contains("fa-circle") && !block.classList.contains("fa-times")){ 
			if(aiPlayer=="O")
					block.className+=" fa-circle";
				else
					block.className+=" fa-times";
		}
		//Play fucntion for user called once the marking of position is done
		human();	
}

//Function to get all empty/unmarked positions on board
function availPositions(board){
  return board.filter(s => s != "O" && s != "X");
}

//Function to check winning state based on set of marked positions, Tic Tac Toe rules for win
function winning(board, player){
	if(board[0]==player && board[1]==player && board[2]==player || board[3]==player && board[4]==player && board[5]==player || board[6]==player && board[7]==player && board[8]==player || board[0]==player && board[3]==player && board[6]==player || board[1]==player && board[4]==player && board[7]==player || board[2]==player && board[5]==player && board[8]==player || board[2]==player && board[4]==player && board[6]==player || board[0]==player && board[4]==player && board[8]==player)
		return true;
	else 
		return false;
}

// MiniMax Algorithm implemented which gets called by AI player, it returns best move towards win or draw
function minimax(newBoard, player){  
  var availSpots=availPositions(newBoard);  //gets all availabale indices 
  if (winning(newBoard, huPlayer))
    return {score:-10};//returns lowest if user wins, bad move
  else if (winning(newBoard, aiPlayer))
	return {score:10}; //return highest if AI wins, best move
  else if (availSpots.length == 0)
  	return {score:0};//returns neutral if Draw, AI's second best move
  
  // Object array to collect all possible moves by players
  var moves = [];

  // loop through each available spots to choose each one as next move and call back Minimax 
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;
    /*collect the score resulted from calling minimax 
      on the opponent of the current player*/
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    // reset the spot to empty, as score already being generated
    newBoard[availSpots[i]] = move.index;

    // push the object to the array as a pair of index and score at that index
    moves.push(move);
  }

  // if it is the Machine's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score >= bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{
// else if it's User's turn then loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score <= bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
// return the chosen move (object) from the moves array
  return moves[bestMove];
}

//GetBoard function for ai's move
function getBoard(){
	var zero; var one; var two; var three; var four; var five; var six; var seven; var eight;
	var grid0=document.getElementById("block0");
	var grid1=document.getElementById("block1");
	var grid2=document.getElementById("block2");
	var grid3=document.getElementById("block3");
	var grid4=document.getElementById("block4");
	var grid5=document.getElementById("block5");
	var grid6=document.getElementById("block6");
	var grid7=document.getElementById("block7");
	var grid8=document.getElementById("block8");	
		
	if(grid0.classList.contains("fa-circle"))
		zero="O";
else if(grid0.classList.contains("fa-times"))
		zero = "X";
	else
		zero=0;	
		
	if(grid1.classList.contains("fa-circle"))
		one="O";
	else if(grid1.classList.contains("fa-times"))
		one="X";
	else
		one=1;
	
	if(grid2.classList.contains("fa-circle"))
		two="O";
	else if(grid2.classList.contains("fa-times"))
		two="X";
	else
		two=2;
	
	if(grid3.classList.contains("fa-circle"))
		three="O";
	else if(grid3.classList.contains("fa-times"))
		three="X";
	else
		three=3;
	
	if(grid4.classList.contains("fa-circle"))
		four="O";
	else if(grid4.classList.contains("fa-times"))
		four="X";
	else
		four=4;
	
	if(grid5.classList.contains("fa-circle"))
		five="O";
	else if(grid5.classList.contains("fa-times"))
		five="X";
	else
		five=5;
	
	if(grid6.classList.contains("fa-circle"))
		six="O";
	else if(grid6.classList.contains("fa-times"))
		six="X";
	else
		six=6;
	
	if(grid7.classList.contains("fa-circle"))
		seven="O";
	else if(grid7.classList.contains("fa-times"))
		seven="X";
	else
		seven=7;
	
	if(grid8.classList.contains("fa-circle"))
		eight="O";
	else if(grid8.classList.contains("fa-times"))
		eight="X";
	else
		eight=8;
	
	var orig=[zero, one, two, three, four, five, six, seven, eight];
	return orig;
}

//Clearing board, set all positions unmarked
function resetBoard(){
	var grid0=document.getElementById("block0");
	var grid1=document.getElementById("block1");
	var grid2=document.getElementById("block2");
	var grid3=document.getElementById("block3");
	var grid4=document.getElementById("block4");
	var grid5=document.getElementById("block5");
	var grid6=document.getElementById("block6");
	var grid7=document.getElementById("block7");
	var grid8=document.getElementById("block8");	
	
	if(grid0.classList.contains("fa-circle"))
		$(grid0).removeClass("fa-circle");
	else if(grid0.classList.contains("fa-times"))
		$(grid0).removeClass("fa-times");
	
	if(grid1.classList.contains("fa-circle"))
		$(grid1).removeClass("fa-circle");
	else if(grid1.classList.contains("fa-times"))
		$(grid1).removeClass("fa-times");
	
	if(grid2.classList.contains("fa-circle"))
		$(grid2).removeClass("fa-circle");
	else if(grid2.classList.contains("fa-times"))
		$(grid2).removeClass("fa-times");
	
	if(grid3.classList.contains("fa-circle"))
		$(grid3).removeClass("fa-circle");
	else if(grid3.classList.contains("fa-times"))
		$(grid3).removeClass("fa-times");
	
	if(grid4.classList.contains("fa-circle"))
		$(grid4).removeClass("fa-circle");
	else if(grid4.classList.contains("fa-times"))
		$(grid4).removeClass("fa-times");
	
	if(grid5.classList.contains("fa-circle"))
		$(grid5).removeClass("fa-circle");
	else if(grid5.classList.contains("fa-times"))
		$(grid5).removeClass("fa-times");
	
	if(grid6.classList.contains("fa-circle"))
		$(grid6).removeClass("fa-circle");
	else if(grid6.classList.contains("fa-times"))
		$(grid6).removeClass("fa-times");
	
	if(grid7.classList.contains("fa-circle"))
		$(grid7).removeClass("fa-circle");
	else if(grid7.classList.contains("fa-times"))
		$(grid7).removeClass("fa-times");
	
	if(grid8.classList.contains("fa-circle"))
		$(grid8).removeClass("fa-circle");
	else if(grid8.classList.contains("fa-times"))
		$(grid8).removeClass("fa-times");
	
}










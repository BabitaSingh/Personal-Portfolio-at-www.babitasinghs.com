var choose_counts=-1;
var huPlayer;
var aiPlayer;
function humanStarted(){
	choose_counts++;
	if(choose_counts>0)
	{
		if(confirm("Would you like to start over?")){
			//wipe out board
			resetBoard();
			huPlayer = "X";
			aiPlayer = "O";
			choose_counts=-1;
		}else
			alert("Game has been resumed, please play your turn");
			//needs
	}else{
		huPlayer = "X";
		aiPlayer = "O";		
		human();
	}	
}
function machineStarted(){
	choose_counts++;
	if(choose_counts>0)
	{
		if(confirm("Would you like to start over?")){
			//wipe out board
			resetBoard();
			huPlayer = "O";
			aiPlayer = "X";
			choose_counts=-1;
		}else
			alert("Game has been resumed, please play your turn");		
	}else{
		huPlayer = "O";
		aiPlayer = "X";
		machine();
	}	
}

function human(){
	$('td').unbind('click');
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
		machine();
	});
	if (winning(getBoard(), aiPlayer))
			alert("I win!");
}

function machine(){
		var board=getBoard();
		var grid=minimax(board, aiPlayer);
		//alert(grid.index);
		var blo="block"+grid.index;
		var block=document.getElementById(blo);
		if(!block.classList.contains("fa-circle") && !block.classList.contains("fa-times")){
			if(aiPlayer=="O")
					block.className+=" fa-circle";
				else
					block.className+=" fa-times";
		}
		human();	
		
		//if (winning(getBoard, huPlayer))
			//alert("You win!");
}

// returns list of the indexes of empty spots on the board
function emptyIndexies(board){
  return board.filter(s => s != "O" && s != "X");
}
//Function for terminal state
function winning(board, player){
	if(board[0]==player && board[1]==player && board[2]==player || board[3]==player && board[4]==player && board[5]==player || board[6]==player && board[7]==player && board[8]==player || board[0]==player && board[3]==player && board[6]==player || board[1]==player && board[4]==player && board[7]==player || board[2]==player && board[5]==player && board[8]==player || board[2]==player && board[4]==player && board[6]==player || board[0]==player && board[4]==player && board[8]==player)
		return true;
	else 
		return false;
}

// the main minimax function
function minimax(newBoard, player){  
  var availSpots=emptyIndexies(newBoard);   
  if (winning(newBoard, huPlayer))
    return {score:-10};
  else if (winning(newBoard, aiPlayer))
	return {score:10};
  else if (availSpots.length == 0)
  	return {score:0};
  
  // an array to collect all the objects
  var moves = [];

  // loop through available spots
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

    // reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
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
// else loop over the moves and choose the move with the lowest score
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










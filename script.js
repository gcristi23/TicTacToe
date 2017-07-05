var board="",j,i;
var player='x';
var obj=[],state=[];
var main = document.getElementById('main');
var congrats=document.getElementById('congrats');
var playagain=document.getElementById('playagain');
var main=document.getElementById('main');
var menu=document.getElementById('menu');
var moves=9;
var players=['O','X'];
for(i=0;i<3;i++){
	board+="<div class='row'>";
	for(j=0;j<3;j++){
		board+="<div id='b"+((i*3)+j);
		board+="' onclick='move(b"+((i*3)+j);
		board+=")' class='block normal'></div>";
	}
	board+="</div>";
}
main.innerHTML=board;
for(i=0;i<9;i++){
	obj.push(document.getElementById('b'+i));
	state.push(-1);
}

function check(){
	if(state[0]==state[1]&&
		state[1]==state[2]&&
		state[0]!=-1){
		return {
			"winner":state[0],
			"strike":[obj[0],obj[1],obj[2]]
			};
	} else if(state[0]==state[4]&&
		state[4]==state[8]&&
		state[0]!=-1){
		return {
			"winner":state[0],
			"strike":[obj[0],obj[4],obj[8]]
			};
	} else if(state[0]==state[3]&&
		state[3]==state[6]&&
		state[0]!=-1){
		return {
			"winner":state[0],
			"strike":[obj[0],obj[3],obj[6]]
			};
	} else if(state[1]==state[4]&&
		state[4]==state[7]&&
		state[1]!=-1){
		return {
			"winner":state[1],
			"strike":[obj[1],obj[4],obj[7]]
			};
	} else if(state[2]==state[5]&&
		state[5]==state[8]&&
		state[2]!=-1){
		return {
			"winner":state[2],
			"strike":[obj[2],obj[5],obj[8]]
			};
	} else if(state[2]==state[4]&&
		state[4]==state[6]&&
		state[2]!=-1){
		return {
			"winner":state[2],
			"strike":[obj[2],obj[4],obj[6]]
			};
	} else if(state[3]==state[4]&&
		state[4]==state[5]&&
		state[3]!=-1){
		return {
			"winner":state[3],
			"strike":[obj[3],obj[4],obj[5]]
			};
	} else if(state[6]==state[7]&&
		state[7]==state[8]&&
		state[6]!=-1){
		return {
			"winner":state[6],
			"strike":[obj[6],obj[7],obj[8]]
			};
	} else {
		return {"winner":-1};
	}
}



function gameOver(){
	if(moves<=0){
		congrats.innerHTML="DRAW";
		congrats.style="display:block;";
		playagain.style="display:block;";
	}
	game_over=check();
	if(game_over["winner"]!=-1){
		congrats.innerHTML=players[game_over["winner"]] + " WINS";
		congrats.style="display:block;";
		playagain.style="display:block;";
		for(i=0;i<3;i++){
			game_over["strike"][i].className="block strike";
		}
		moves=0;
	}
}

function move(id){
	if(moves){
		if(id.innerHTML==""){
			id.innerHTML=player;
			id.className="block clicked";
			moves--;
			if(player=='x'){
				player='o';
				state[id.id[1]-'0']=1;
			}
			else {
				player='x';
				state[id.id[1]-'0']=0;
			}
			gameOver();
			if(game_over["winner"]==-1&&gameMode==1){
				bot();
				moves--;
				player='x';
			}
		}
		
	}
	
}

function playAgain(){
	main.innerHTML=board;
	for(i=0;i<9;i++){
		obj[i]=document.getElementById('b'+i);
		state[i]=-1;
	}
	moves=9;
	congrats.style="display:none;";
	playagain.style="display:none;";
	player='x';
}

function start(mode){
	gameMode=mode;
	main.style="display:block;";
	menu.style="display:none;";
	
}

function bot(){
	var result,next_move;
	
	for(i=0;i<9;i++){
		if(state[i]==-1){
			state[i]=0;
			result=check();
			if(result["winner"]!=-1){
				obj[i].innerHTML="o";
				gameOver();
				return ;
			} else {
				state[i]=-1;
			}
		}
	}
	
	for(i=0;i<9;i++){
		if(state[i]==-1){
			state[i]=1;
			result=check();
			if(result["winner"]!=-1){
				state[i]=0;
				obj[i].innerHTML="o";
				obj[i].className="block clicked";
				return;
			} else {
				state[i]=-1;
			}
		}
	}
	
	
		
		if(state[4]==-1){
			state[4]=0;
			obj[4].innerHTML="o";
			obj[4].className="block clicked";
		} else if(moves>0){
			next_move=Math.floor(Math.random()*10);
			while(state[next_move]!=-1){
				next_move=Math.floor(Math.random()*10);
			}
			state[next_move]=0;
			obj[next_move].innerHTML="o";
			obj[next_move].className="block clicked";
		}
	
}

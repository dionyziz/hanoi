var move = [];
var numDoughnutsInTower = [NUM_DOUGHNUT, 0, 0];
var cnt = 0;
var HEIGHT = 250;


function computerDet(doughnut, below, end)
{
	this.doughnut = doughnut;
	this.below = below;
	this.end = end;
}


function instructions(N, start, aux, end)
{
	if(N>=0)
	{
		instructions(N-1, start, end, aux);
		move[cnt++] = new computerDet(doughnut[N], numDoughnutsInTower[end-1], end);
		--numDoughnutsInTower[start-1];
		++numDoughnutsInTower[end-1];
		instructions(N-1, aux, start, end);
	}
}


function animation(mov)
{
	var dough = mov.doughnut;
	
	
	(function moveup()
	{
		var y = H - dough.below * DOUGHNUT_HEIGHT;
		
		setTimeout(function(){
			if(y+dough.dy > HEIGHT)
			{
				dough.dy -= 2;	
				moveup();
			}
		},1);
		
	})();
	

	setTimeout(function()
	{
		(function moveLeftRight()
		{
			var x = towerX(dough.tower);
			
			setTimeout(function(){
				if(dough.tower < mov.end){
					if(x+dough.dx < towerX(mov.end)){
						dough.dx += 2;	
						moveLeftRight();
					}
				}
				
				else{
					if(x+dough.dx > towerX(mov.end)){
						dough.dx -= 2;
						moveLeftRight();
					}
				}
			},1);
			
		})();
		
	},1000);
	
	
	setTimeout(function()
	{
		(function movedown()
		{
			var prevY = DOUGHNUT_HEIGHT * (numDoughnuts(dough.tower) - 1);
			var nextY = DOUGHNUT_HEIGHT * numDoughnuts(mov.end);

			setTimeout(function(){
				if(dough.dy-prevY+nextY < 0)
				{
					dough.dy += 2;	
					movedown();
				}
			},1);	
		})();
		
	},2300);
	
	setTimeout(function(){
		dough.dx = dough.dy = 0;
		dough.below = mov.below;
		dough.tower = mov.end;
	},3300);
}


$("input").click(function(){
	
	instructions(NUM_DOUGHNUT-1,1,2,3);
	
	for(var i = 0; i < NUM_DOUGHNUT; ++i){
		doughnut[i].tower = 1;
		doughnut[i].below = NUM_DOUGHNUT - i - 1;
	}
	
	var i = 0; 
	(function solution()
	{
		setTimeout(function(){
			if(i<cnt)
			{	
				animation(move[i]);
				++i;
				
				solution();
			}
		},3500);
	})();

});

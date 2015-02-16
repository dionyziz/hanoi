var NUM_TOWERS = 3,
    NUM_DOUGHNUT = 3;
var doughnut = [];
var colors = ['red', 'green', 'blue', 'yellow', 'purple', 'grey', 'orange'];

function init() {
	for (var i = 0; i < NUM_DOUGHNUT; ++i) {
        doughnut[i] = new Doughnut(1, NUM_DOUGHNUT - i - 1, i + 1, colors[i]);
    }
	
	render();
}

function Doughnut(tower, below, size, color) {
    this.tower = tower;
    this.below = below;
    this.size = size;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
}

function smallestDoughnut(tower) {
    var min = doughnut[NUM_DOUGHNUT-1].size;
    var minDoghnut = doughnut[NUM_DOUGHNUT-1];

	if(numDoughnuts(tower) == 0)
		return null;
		
    for (var i = 0; i < NUM_DOUGHNUT; ++i) {
		if (doughnut[i].tower == tower  &&  doughnut[i].size < min) {
			min = doughnut[i].size;
			minDoghnut = doughnut[i];
		}
	}
		
    return minDoghnut;
}

function numDoughnuts(tower) {
    var c = 0;

    for (var i = 0; i < NUM_DOUGHNUT; ++i) {
        if (doughnut[i].tower == tower) {
            c++;
        }
    }
    return c;
}

function towerX(i) {
    return MARGIN_HORIZONTAL + TOWER_DISTANCE * i ;
}


function towerHitTest(x, y) {
    var min = W, min_tower = 1;

    for (var i = 1; i <= NUM_TOWERS; ++i) {
        var m = Math.abs(towerX(i) - x);

        if (m < min) {
            min = m;
            min_tower = i;
        }
    }

    return min_tower;
}

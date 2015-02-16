var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var TOWER_WIDTH = 5;
var MARGIN_HORIZONTAL = 5;
var DOUGHNUT_HEIGHT = 30;
var W = 1000, H = 600; 
var TOWER_DISTANCE = (W - 2 * MARGIN_HORIZONTAL) / (NUM_TOWERS + 1);


function render() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, W, H);

    for (var i = 1; i <= NUM_TOWERS; ++i) {
        renderTower(i);
    }
    for (var i = 0; i < NUM_DOUGHNUT; ++i) {
        renderDoughnut(doughnut[i]);
    } 
	
	if(numDoughnuts(NUM_TOWERS) == NUM_DOUGHNUT){
		return;
	}
	
    requestAnimationFrame(render);
}

function renderTower(i) {
    var x = towerX(i); 
    
    ctx.beginPath();
    ctx.lineWidth = TOWER_WIDTH;
    ctx.moveTo(x, H);
    ctx.lineTo(x, H / 2);
    ctx.stroke();
}

function renderDoughnut(doughnut) {
    var x = towerX(doughnut.tower) + doughnut.dx;
    var y = H - doughnut.below * DOUGHNUT_HEIGHT + doughnut.dy;

    doughnutWidth = 25 * doughnut.size;
    ctx.beginPath();
    ctx.moveTo(x - doughnutWidth / 2, y);
    ctx.lineTo(x + doughnutWidth / 2, y);
    ctx.lineTo(x + doughnutWidth / 2, y - DOUGHNUT_HEIGHT);
    ctx.lineTo(x - doughnutWidth / 2, y - DOUGHNUT_HEIGHT);
    ctx.closePath();
    ctx.fillStyle = doughnut.color;
    ctx.fill();
}

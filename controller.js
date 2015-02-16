(function controller() {
    var activeDoghnut = null;
    var mouseBeginX, mouseBeginY;

    canvas.onmousedown = function(e) {
        var x = e.clientX, y = e.clientY;

        mouseBeginX = x;
        mouseBeginY = y;

        var tower = towerHitTest(x, y);

        activeDoghnut = smallestDoughnut(tower);
    };

    canvas.onmouseup = function(e) {
        var x = e.clientX, y = e.clientY;

        if (activeDoghnut != null) {
            var oldTower = activeDoghnut.tower;
            var newTower = towerHitTest(x, y);
			
			activeDoghnut.tower = -1;//-1 means that it is moving in the air.
			
			if(numDoughnuts(newTower) == 0  ||  smallestDoughnut(newTower).size > activeDoghnut.size){
				activeDoghnut.below = numDoughnuts(newTower);
				activeDoghnut.tower = newTower;
			}
			else{
				activeDoghnut.below = numDoughnuts(oldTower);
				activeDoghnut.tower = oldTower;
			}
			
			activeDoghnut.dx = activeDoghnut.dy = 0;
        }
        activeDoghnut = null;
    };

    canvas.onmousemove = function(e) {
        var x = e.clientX, y = e.clientY;
        var dx = x - mouseBeginX, dy = y - mouseBeginY;

        if (activeDoghnut != null) {
            activeDoghnut.dx = dx;
            activeDoghnut.dy = dy;
        }
    };
	
	init();
})();

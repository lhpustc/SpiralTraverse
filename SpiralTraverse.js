var grid, xl, xr, ytop, ybottom, direction, x_curr, y_curr;
var x_last, y_last;
var time_ms = 200; // milisecond
var numRows = 10, numCols = 10;

function displayGrid() {
  "use strict";
  grid = new Grid({
    rows: numRows,
    cols: numCols,
    render: {
      placeholder: ".grid"
    }
  });
  reset();
  highLight();
  x_last = x_curr;
  y_last = y_curr;
  setTimeout("traverseGrid()", time_ms);
}

function traverseGrid() {
  recover(); // re-render
  highLight(); // highlight current cell
  x_last = x_curr;
  y_last = y_curr;
  nextMove();
  if (xl > xr || ybottom > ytop) reset();
  setTimeout("traverseGrid()", time_ms);
}

function nextMove() {
  if(direction == 1){
    y_curr -= 1;
    if(y_curr < ybottom){
      y_curr = ybottom;
      x_curr += 1;
      xl = x_curr;
      direction = 2;
    }
  }
  else if(direction == 2){
    x_curr += 1;
    if(x_curr > xr){
      x_curr = xr;
      y_curr += 1;
      ybottom = y_curr;
      direction = 3;
    }
  }
  else if(direction == 3){
    y_curr += 1;
    if(y_curr > ytop){
      y_curr = ytop;
      x_curr -= 1;
      xr = x_curr;
      direction = 4;
    }
  }
  else{
    x_curr -= 1;
    if(x_curr < xl){
      x_curr = xl;
      y_curr -= 1;
      ytop = y_curr;
      direction = 1;
    }
  }
}

function highLight() {
  grid.getCellAt(x_curr, y_curr).$el.css('background', 'red');
}

function recover() {
  grid.getCellAt(x_last, y_last).$el.css('background', 'white');
}

function reset() {
  xl=0;
  xr=numCols-1;
  ytop=numRows-1;
  ybottom=0;
  direction=1;
  x_curr=xl;
  y_curr=ytop;
}

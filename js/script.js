/* My Line function */

function myLine(points, drawLineCtx) {
  let X0, Y0, X1, Y1, dx, dy, steps, Xinc, Yinc, X, Y;

  points.forEach(element => {
    console.log(element);
  });

  X0 = points[0].x;
  Y0 = points[0].y;
  X1 = points[1].x;
  Y1 = points[1].y;
  console.log(`X0: ${X0} ,Y0: ${Y0} , X1: ${X1}, Y1: ${Y0}`);
  // calculate dx , dy
  dx = X1 - X0;
  dy = Y1 - Y0;
  console.log(`dx: ${dx} ,dy: ${dy}`);
  steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  console.log(`steps: ${steps}`);
  // calculate increment in x & y for each steps
  Xinc = dx / parseFloat(steps);
  Yinc = dy / parseFloat(steps);

  // Put pixel for each step
  X = X0;
  Y = Y0;
  for (let i = 0; i <= steps; i++) {
    drawLineCtx.strokeRect(X, Y, 1, 1);
    X += Xinc;
    Y += Yinc;
  }
}
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
/* My Circle function */

function myPlotCirclePoints(x_center, y_center, x, y, drawCircleCtx) {
  drawCircleCtx.fillRect(x_center + x, y_center + y, 1, 1);
  drawCircleCtx.fillRect(x_center - x, y_center + y, 1, 1);
  drawCircleCtx.fillRect(x_center + x, y_center - y, 1, 1);
  drawCircleCtx.fillRect(x_center - x, y_center - y, 1, 1);
  drawCircleCtx.fillRect(x_center + y, y_center + x, 1, 1);
  drawCircleCtx.fillRect(x_center - y, y_center + x, 1, 1);
  drawCircleCtx.fillRect(x_center + y, y_center - x, 1, 1);
  drawCircleCtx.fillRect(x_center - y, y_center - x, 1, 1);
}

function myCircle(points, drawCircleCtx) {
  // P0 = 3 - 2r
  // If (Pk < 0) => (Xk + 1, Yk) , Pk+1 = Pk + 4Xk + 6
  // If (Pk >= 0) => (Xk + 1, Yk - 1) , Pk+1 = Pk + 4(Xk - Yk) + 10

  let P0, X0, Y0, Xnext, Ynext, Pnext, xCenter, yCenter, radius;

  X0 = points[0].x;
  Y0 = points[0].y;

  radius = parseInt(
    Math.sqrt(
      Math.pow(points[0].x - points[1].x, 2) +
        Math.pow(points[0].y - points[1].y, 2)
    )
  );
  console.log(radius);

  drawCircleCtx.fillRect(X0, Y0, 1, 1);

  // find initial decision parameter
  P0 = 3 - 2 * radius;
  console.log(`find initial decision parameter = ${P0}`);

  Pnext = P0;
  Xnext = 0;
  Ynext = radius;

  while (Xnext < Ynext) {
    console.log(`Xnext = ${Xnext}  : Ynext = ${Ynext}`);
    myPlotCirclePoints(X0, Y0, Xnext, Ynext, drawCircleCtx);
    if (Pnext < 0) {
      Pnext = Pnext + 4 * Xnext + 6;
    } else {
      Pnext = Pnext + 4 * (Xnext - Ynext) + 10;
      Ynext = Ynext - 1;
    }
    Xnext = Xnext + 1;
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function relMouseCoords(ctxCanvas, event) {
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let canvasX = 0;
  let canvasY = 0;
  let currentElement = ctxCanvas;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  } while ((currentElement = currentElement.offsetParent));

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  // Fix for variable canvas width
  canvasX = Math.round(canvasX * (ctxCanvas.width / ctxCanvas.offsetWidth));
  canvasY = Math.round(canvasY * (ctxCanvas.height / ctxCanvas.offsetHeight));

  return { x: canvasX, y: canvasY };
}

window.onload = () => {
  // Draw line variables
  let drawLineDiv = document.getElementById("drawLineDiv");
  let drawLineCtx = drawLineDiv.getContext("2d");
  let drawLinectxCanvas = drawLineCtx.canvas;
  let lineCoordArray = [];
  let lineCoord;

  drawLineDiv.onclick = event => {
    lineCoord = relMouseCoords(drawLinectxCanvas, event);
    lineCoordArray.push(lineCoord);
    drawLineCtx.clearRect(lineCoord.x, lineCoord.y, 1, 1);

    if (lineCoordArray.length === 2) {
      myLine(lineCoordArray, drawLineCtx);
      lineCoordArray = [];
    }
  };

  // Draw circle variables
  let drawCircleDiv = document.getElementById("drawCircleDiv");
  let drawCircleCtx = drawCircleDiv.getContext("2d");
  let drawCirclectxCanvas = drawCircleCtx.canvas;
  let circleCoordArray = [];
  let circleCoord;

  drawCircleDiv.onclick = event => {
    circleCoord = relMouseCoords(drawCirclectxCanvas, event);
    drawCircleCtx.fillRect(circleCoord.x, circleCoord.y, 1, 1);
    circleCoordArray.push(circleCoord);

    if (circleCoordArray.length === 2) {
      myCircle(circleCoordArray, drawCircleCtx);
      circleCoordArray = [];
    }
  };
};

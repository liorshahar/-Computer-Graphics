function myLine(points, drawLineCtx) {
  let X0, Y0, X1, Y1, dx, dy, steps, Xinc, Yinc, abs, X, Y;

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
    drawLineCtx.fillRect(X, Y, 1, 1);
    X += Xinc;
    Y += Yinc;
  }
}

function myCircle(radios, drawCircleCtx) {
  // P0 = 3 - 2r
  // If (Pk < 0) => (Xk + 1, Yk) , Pk+1 = Pk + 4Xk + 6
  // If (Pk >= 0) => (Xk + 1, Yk - 1) , Pk+1 = Pk + 4(Xk - Yk) + 10

  let P0, X0, Y0, x, y, Xnext, Ynext, Pnext;
  //drawCircleCtx.fillRect(70, 70, 1, 1);
  let temp = 70;
  console.log(radios);
  X0 = x = temp + 0;
  Y0 = y = temp + radios;
  console.log(`X0 : ${X0} , Y0 : ${Y0} , x : ${x} , y : ${y}`);
  drawCircleCtx.fillRect(70, 70, 1, 1);

  // find initial decision parameter
  P0 = 3 - 2 * radios;
  drawCircleCtx.fillRect(Xnext, Ynext, 1, 1);
  console.log(`find initial decision parameter = ${P0}`);
  Pnext = P0;
  Xnext = X0;
  Ynext = Y0;

  while (Xnext < Ynext) {
    console.log(`Pnext = ${Pnext}`);
    if (Pnext < 0) {
      console.log(`Xnext = ${Xnext + 1}  : Ynext = ${Ynext}`);
      drawCircleCtx.fillRect(Xnext + 1, Ynext, 1, 1);
      Pnext = P0 + 4 * (Xnext - temp) + 6;
      P0 = Pnext;
      Xnext = Xnext + 1;
      //console.log(`x = x + 1: ${x}`);
    } else {
      console.log(`Xnext = ${Xnext + 1}  : Ynext = ${Ynext - 1}`);
      drawCircleCtx.fillRect(Xnext + 1, Ynext - 1, 1, 1);
      Pnext = P0 + 4 * (Xnext - temp - (Ynext - temp)) + 10;
      P0 = Pnext;
      Xnext = Xnext + 1;
      Ynext = Ynext - 1;
    }
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
    drawLineCtx.fillRect(lineCoord.x, lineCoord.y, 1, 1);

    if (lineCoordArray.length === 2) {
      myLine(lineCoordArray, drawLineCtx);
      lineCoordArray = [];
    }
  };

  // Draw circle variables
  let drawCircleDiv = document.getElementById("drawCircleDiv");
  let drawCircleCtx = drawCircleDiv.getContext("2d");
  let drawCirclectxCanvas = drawCircleCtx.canvas;

  drawCircleDiv.onclick = event => {
    myCircle(10, drawCircleCtx);
  };
};

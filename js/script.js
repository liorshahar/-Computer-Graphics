/* My Line function 
   -> Implement DDA Algorithm
*/
function myLine(points, drawLineCtx) {
  let X0, Y0, X1, Y1, dx, dy, steps, Xinc, Yinc, X, Y;

  // Print (X0,Y0) AND (X1,Y1)
  points.forEach(element => {
    console.log(element);
  });

  // Set the coord
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

/* My Circle function 
  -> Implement Bresenheim Algorithm
*/

// Help function to print point in all axis
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

// My Circle function
function myCircle(points, drawCircleCtx) {
  // P0 = 3 - 2r
  // If (Pk < 0) => (Xk + 1, Yk) , Pk+1 = Pk + 4Xk + 6
  // If (Pk >= 0) => (Xk + 1, Yk - 1) , Pk+1 = Pk + 4(Xk - Yk) + 10

  let P0, X0, Y0, Xnext, Ynext, Pnext, radius;

  X0 = points[0].x;
  Y0 = points[0].y;

  radius = parseInt(
    Math.sqrt(
      Math.pow(points[0].x - points[1].x, 2) +
        Math.pow(points[0].y - points[1].y, 2)
    )
  );
  console.log(radius);

  drawCircleCtx.fillRect(X0, Y0, 1.5, 1.5);

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

/* My Bezier Curves 
  -> Implement Bezier Algorithm
*/

// Create matrix for bezier curve
function curvesMatrix() {
  /* 
    ax = -x0 +3x1 -3x2 +x4
    bx = 3x0 -6x1 +3x2
    cx = -3x0 +3x1
    dx = x0
  */
  let curveMatrix = [];
  let coords = [],
    ax,
    bx,
    cx,
    dx,
    ay,
    by,
    cy,
    dy;

  console.log(`arguments ${arguments[0]}`);
  coords = arguments[0];

  ax = -coords[0].x + 3 * coords[1].x - 3 * coords[2].x + coords[3].x;
  bx = 3 * coords[0].x - 6 * coords[1].x + 3 * coords[2].x;
  cx = -(3 * coords[0].x) + 3 * coords[1].x;
  dx = coords[0].x;

  ay = -coords[0].y + 3 * coords[1].y - 3 * coords[2].y + coords[3].y;
  by = 3 * coords[0].y - 6 * coords[1].y + 3 * coords[2].y;
  cy = -(3 * coords[0].y) + 3 * coords[1].y;
  dy = coords[0].y;

  curveMatrix.push(ax);
  curveMatrix.push(bx);
  curveMatrix.push(cx);
  curveMatrix.push(dx);
  curveMatrix.push(ay);
  curveMatrix.push(by);
  curveMatrix.push(cy);
  curveMatrix.push(dy);

  return curveMatrix;
}

function myBezier() {
  console.log(arguments[0]);
  let coordArray,
    context = arguments[1],
    matrix = {},
    t = 10;

  if (arguments[0]) {
    coordArray = arguments[0];
  } else {
    console.log("Bezier curves coord is missing");
  }

  matrix = curvesMatrix(coordArray);
  console.log("matrix :" + matrix);
  context.beginPath();
  context.moveTo(coordArray[0].x, coordArray[0].y);

  for (let i = 0; i <= 1; i += 1 / t) {
    let x =
      matrix[0] * Math.pow(i, 3) +
      matrix[1] * Math.pow(i, 2) +
      matrix[2] * i +
      matrix[3];
    let y =
      matrix[4] * Math.pow(i, 3) +
      matrix[5] * Math.pow(i, 2) +
      matrix[6] * i +
      matrix[7];

    context.lineTo(x, y);
    myCircle([{ x: x, y: y }, { x: x + 3, y: y + 3 }], context);
    console.log("x:" + x + "\n" + "y:" + y);
    console.log("---------------");
  }
  context.lineWidth = 1;
  context.stroke();
}

/* ------------Utility Functions------------------------------------------------ */

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

function clearCanvas(ctxCanvas) {
  console.log(ctxCanvas.canvas);
  ctxCanvas.clearRect(0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
}

/* Window on load */

window.onload = () => {
  // Draw line variables
  let drawLineDiv = document.getElementById("drawLineDiv");
  let drawLineCtx = drawLineDiv.getContext("2d");

  let clearLineBtn = document.getElementById("clearLine");
  clearLineBtn.addEventListener("click", () => {
    if (drawLineCtx) {
      clearCanvas(drawLineCtx);
    } else {
      console.log("Can't find Line ctx");
    }
  });
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
  let clearCiecleBtn = document.getElementById("clearCircle");
  clearCiecleBtn.addEventListener("click", () => {
    if (drawCircleCtx) {
      clearCanvas(drawCircleCtx);
    } else {
      console.log("Can't find Circle ctx");
    }
  });
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

  // Draw Bezier Curves variables
  let drawBezierDiv = document.getElementById("drawBezierCurveDiv");
  let drawBezierCtx = drawBezierDiv.getContext("2d");
  let clearBezierBtn = document.getElementById("clearBezierCurve");
  clearBezierBtn.addEventListener("click", () => {
    if (drawBezierCtx) {
      clearCanvas(drawBezierCtx);
    } else {
      console.log("Can't find Bezier ctx");
    }
  });
  let drawBezierctxCanvas = drawBezierCtx.canvas;
  let bezierCoordArray = [];
  let bezierCoord;

  drawBezierDiv.onclick = event => {
    bezierCoord = relMouseCoords(drawBezierctxCanvas, event);
    //drawBezierCtx.fillRect(bezierCoord.x, bezierCoord.y, 1, 1);
    myCircle(
      [bezierCoord, { x: bezierCoord.x + 3, y: bezierCoord.y + 3 }],
      drawBezierCtx
    );
    bezierCoordArray.push(bezierCoord);

    if (bezierCoordArray.length === 4) {
      myBezier(bezierCoordArray, drawBezierCtx);
      bezierCoordArray = [];
    }
  };
};

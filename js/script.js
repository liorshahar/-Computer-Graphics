function myLine(points) {}
function point(x, y, canvas) {
  canvas.strokeRect(x, y, 3, 3);
}

window.onload = () => {
  let drowLineDiv = document.getElementById("drawLineDiv");
  var ctx = drowLineDiv.getContext("2d");
  drowLineDiv.onclick = event => {
    let points = [];
    let fitstCoord = event.offsetX;
    let secondCoord = event.offsetY;
    console.log(`(${event.offsetX} : ${event.offsetY}) `);

    ctx.fillRect(10, 10, 1, 1);
  };
};

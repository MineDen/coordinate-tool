import * as renderers from "./renderers.js";
import { Point } from "./point.js"
var canvas = document.createElement("canvas");
canvas.width = canvas.height = 1024;
var ctx = canvas.getContext("2d");
var cplane = new renderers.CoordinatePlane(ctx);

var date;
var dt = 1;
var fpscnt;

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W"];
var colors = [
    { r: 240, g: 56, b: 64 },
    { r: 235, g: 127, b: 56 },
    { r: 72, g: 215, b: 80 },
    { r: 72, g: 88, b: 225 },
    { r: 127, g: 72, b: 200 },
    { r: 25, g: 25, b: 25 }
];
var points = [];


window.onload = function () {
    var container = document.getElementById("canvas-container");
    container.appendChild(canvas);
    fpscnt = document.getElementById("fps");

    /**
     * @type {HTMLSelectElement}
     */
    var lettersel = document.getElementById("letters");
    for (var l = 0; l < letters.length; l++) {
        var ltr = document.createElement("div");
        ltr.value = l;
        ltr.innerHTML = letters[l];
        lettersel.add(ltr);
    }
    lettersel.select(0);
    /**
     * @type {HTMLDivElement}
     */
    var colorsel = document.getElementById("colors");
    for (var c = 0; c < colors.length; c++) {
        var col = document.createElement("div");
        col.style.background = "rgb(" + colors[c].r +
            ", " + colors[c].g + ", " + colors[c].b + ")";
        col.value = c;
        colorsel.add(col);
    }
    colorsel.select(5);

    container.scrollLeft = Math.round((container.scrollWidth - container.clientWidth) / 2);
    container.scrollTop = Math.round((container.scrollHeight - container.clientHeight) / 2);

    update();
    document.body.classList.remove("loading");
    document.getElementById("loader").remove();
}

async function update() {
    if (date) {
        dt = (new Date()).getTime() - date;
        date = (new Date()).getTime();
    }
    else {
        date = (new Date()).getTime();
        dt = 1;
    }
    fps.innerHTML = ((Number(fps.innerHTML) + 1000 / dt) / 2).toFixed(0);
    ctx.clearRect(0, 0, 1024, 1024);
    draw();
    requestAnimationFrame(update);
}

function draw() {
    cplane.renderCells();
    cplane.redrawPlane();
    cplane.renderMarks();
    for (var i = 0; i < points.length; i++)
        cplane.drawPoint(points[i]);
}

function createPoint(x, y, colorID, letterID) {
    points.push(new Point(x, y, colors[colorID], letterID));
}

createPoint(4, -2, 0, 0);
import * as renderers from "./renderers.js";
import { Point } from "./point.js";
var canvas = document.createElement("canvas");
canvas.width = canvas.height = 1024;
var ctx = canvas.getContext("2d");
var cplane = new renderers.CoordinatePlane(ctx);
var lines = new renderers.Lines(cplane);
var cursor = new renderers.CursorPoint(cplane);

var date;
var dt = 1;
var fpscnt;

var mx, my = undefined;

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W"];
var colors = [
    { r: 240, g: 60, b: 48 },
    { r: 255, g: 144, b: 32 },
    { r: 48, g: 200, b: 72 },
    { r: 48, g: 64, b: 250 },
    { r: 110, g: 48, b: 192 },
    { r: 25, g: 25, b: 25 }
];

/**
 * List of points (array)
 * @type {points[]}
 */
var points = [];

window.onload = function () {
    var container = document.getElementById("canvas-container");
    container.appendChild(canvas);
    fpscnt = document.getElementById("fps");

    var letter = document.getElementById("letters");
    var xElement = document.getElementById("x");
    var yElement = document.getElementById("y");
    var color = document.getElementById("colors");

    document.getElementById("export").onclick = exportJSON;

    canvas.onmousemove = function (ev) {
        var rect = canvas.getBoundingClientRect();
        cursor.mx = ev.x - rect.left;
        cursor.my = ev.y - rect.top;
        cursor.x = Math.round((ev.x - 512 - rect.left) / cplane.size);
        cursor.y = Math.round(-((ev.y - 512 - rect.top) / cplane.size));
    }

    container.onmouseleave = function () {
        cursor.mx = cursor.my = cursor.x = cursor.y = undefined;
    }

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

    document.getElementById("addpoint").onclick = function () {
        createPoint(x.value, y.value, color.getAttribute("data-value"), letter.getAttribute("data-value"));
    }

    update();
    document.body.classList.remove("loading");
    document.getElementById("loader").remove();
}

onbeforeunload = function () {
    return 1;
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
    lines.renderLines(points);
    for (var i = 0; i < points.length; i++)
        cplane.drawPoint(points[i]);
    cursor.drawNearPoint();

}

function createPoint(x, y, colorID, letterID) {
    points.push(new Point(x, y, colors[colorID], letterID));
}

function exportJSON() {
    var json = {
        points: [],
        planeSettings: {
            xres: cplane.xres,
            yres: cplane.yres,
            size: cplane.size
        },
        version: 1
    };
    for (var i = 0; i < points.length; i++)
        json.points.push({
            x: points[i].rx,
            y: points[i].ry,
            color: points[i].color,
            letterID: points[i].letterID
        });
    var a = document.createElement("a");
    var blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    a.href = URL.createObjectURL(blob);
    a.download = "coordinateplane.json";
    a.click();
}
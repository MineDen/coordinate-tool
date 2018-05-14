import { Point } from "./point.js";

var CoordinatePlaneRenderer = function (ctx) {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = ctx;
    this.xres = 10;
    this.yres = 8;
    this.size = 26;
}

CoordinatePlaneRenderer.prototype.redrawPlane = function () {
    // X Axis
    this.ctx.strokeStyle = "rgba(250, 30, 30, 0.88)";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(512 - this.xres * this.size, 512);
    this.ctx.lineTo(512 + this.xres * this.size, 512);
    this.ctx.moveTo(512 + (this.xres - 0.5) * this.size,
        512 - this.size * 0.5);
    this.ctx.lineTo(512 + this.xres * this.size,
        512);
    this.ctx.lineTo(512 + (this.xres - 0.5) * this.size,
        512 + this.size * 0.5);
    this.ctx.stroke();
    // Y Axis
    this.ctx.strokeStyle = "rgba(30, 200, 250, 0.88)";
    this.ctx.beginPath();
    this.ctx.moveTo(512, 512 + this.yres * this.size);
    this.ctx.lineTo(512, 512 - this.yres * this.size);
    this.ctx.moveTo(512 - this.size * 0.5,
        512 - (this.yres - 0.5) * this.size);
    this.ctx.lineTo(512, 512 - this.yres * this.size);
    this.ctx.lineTo(512 + this.size * 0.5,
        512 - (this.yres - 0.5) * this.size);
    this.ctx.stroke();
}

CoordinatePlaneRenderer.prototype.renderCells = function () {
    var count = 512 / this.size + 1;
    this.ctx.strokeStyle = "rgba(20, 60, 200, 0.18)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    for (var x = 0; x < count * 2; x++) {
        this.ctx.moveTo(512 - x * this.size, 0);
        this.ctx.lineTo(512 - x * this.size, 1024);
        this.ctx.moveTo(512 + x * this.size, 0);
        this.ctx.lineTo(512 + x * this.size, 1024);
        this.ctx.moveTo(0, 512 - x * this.size);
        this.ctx.lineTo(1024, 512 - x * this.size);
        this.ctx.moveTo(0, 512 + x * this.size);
        this.ctx.lineTo(1024, 512 + x * this.size);
    }
    this.ctx.stroke();
}

CoordinatePlaneRenderer.prototype.renderMarks = function () {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(20, 20, 20, 0.6)";
    this.ctx.lineWidth = 2.5;
    this.ctx.arc(512, 512, this.size * 0.45, 0, Math.PI * 2);
    for (var x = 0; x < this.xres; x++) {
        this.ctx.moveTo(512 - (x + 1) * this.size, 512 - this.size * 0.25);
        this.ctx.lineTo(512 - (x + 1) * this.size, 512 + this.size * 0.25);
        this.ctx.moveTo(512 + x * this.size, 512 - this.size * 0.25);
        this.ctx.lineTo(512 + x * this.size, 512 + this.size * 0.25);
    }
    for (var y = 0; y < this.yres; y++) {
        this.ctx.moveTo(512 - this.size * 0.25, 512 + (y + 1) * this.size);
        this.ctx.lineTo(512 + this.size * 0.25, 512 + (y + 1) * this.size);
        this.ctx.moveTo(512 - this.size * 0.25, 512 - y * this.size);
        this.ctx.lineTo(512 + this.size * 0.25, 512 - y * this.size);
    }
    this.ctx.stroke();
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.strokeStyle = "#323232";
    this.ctx.font = "700 12px sans-serif";
    for (var x = 1; x <= this.xres; x++) {
        this.ctx.fillText(-x, 512 - x * this.size, 512 + this.size, this.size);
        this.ctx.fillText(x, 512 + x * this.size, 512 - this.size, this.size);
    }
    for (var y = 1; y <= this.yres; y++) {
        this.ctx.fillText(y, 512 + this.size, 512 - y * this.size, this.size);
        this.ctx.fillText(-y, 512 - this.size, 512 + y * this.size, this.size);
    }
    this.ctx.font = "700 22px sans-serif";
    this.ctx.fillText("x", 512 + (this.xres + 0.75) * this.size, 512);
    this.ctx.fillText("y", 512, 512 - (this.yres + 0.75) * this.size);
}

/**
 * 
 * @param {Point} point 
 */
CoordinatePlaneRenderer.prototype.drawPoint = function (point) {
    this.ctx.save();
    this.ctx.fillStyle = "rgb(" + point.color.r + ", " + point.color.g + ", " + point.color.b + ")";
    this.ctx.beginPath();
    this.ctx.arc(512 + point.x * this.size, 512 - point.y * this.size, 3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
}

var LinesRenderer = function () {

}

export { CoordinatePlaneRenderer as CoordinatePlane, LinesRenderer as Lines };
var Point = function (x, y, color, letterID) {
    this.x = x;
    this.rx = x;
    this.y = y;
    this.ry = y;
    this.color = color;
    this.letter = letterID;
}

Point.prototype.interpolateX = function () {
    this.x = lerp(this.x, this.rx, 0.12);
}

Point.prototype.interpolateY = function () {
    this.y = lerp(this.y, this.ry, 0.12);
}

function lerp(val1, val2, amt) {
    if (Math.round(val1 * 10) == Math.round(val2 * 10)) return val2;
    return val1 * (1 - amt) + val2 * amt;
}

export { Point };
var isInside = function (p) {
    return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height;
};
var rotateAroundPoint = function (p, c, angle) {
    return createVector(Math.cos(angle) * (p.x - c.x) - Math.sin(angle) * (p.y - c.y) + c.x, Math.sin(angle) * (p.x - c.x) + Math.cos(angle) * (p.y - c.y) + c.y);
};
var Bird = (function () {
    function Bird() {
        this.size = createVector(15, 10);
        this.angle = 0;
        this.position = createVector(height / 2, width / 2);
    }
    Bird.prototype.draw = function () {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        triangle(this.size.x, 0, -this.size.x / 2, this.size.y, -this.size.x / 2, -this.size.y);
        pop();
        var _a = this.position, x = _a.x, y = _a.y;
        var p1 = rotateAroundPoint(createVector(x + this.size.x, y), this.position, this.angle);
        var p2 = rotateAroundPoint(createVector(x - this.size.x / 2, y + this.size.y), this.position, this.angle);
        var p3 = rotateAroundPoint(createVector(x - this.size.x / 2, y - this.size.y), this.position, this.angle);
        fill(255, 10, 10);
        circle(p1.x, p1.y, 5);
        fill(10, 255, 10);
        circle(p2.x, p2.y, 5);
        fill(10, 10, 255);
        circle(p3.x, p3.y, 5);
        fill(255);
    };
    Bird.prototype.rotate = function (angle) {
        this.angle += angle;
    };
    Bird.prototype.move = function (dir) {
        var _a = this.position, x = _a.x, y = _a.y;
        dir.rotate(this.angle);
        var p1 = rotateAroundPoint(createVector(x + this.size.x, y), this.position, this.angle);
        var p2 = rotateAroundPoint(createVector(x - this.size.x / 2, y + this.size.y), this.position, this.angle);
        var p3 = rotateAroundPoint(createVector(x - this.size.x / 2, y - this.size.y), this.position, this.angle);
        if (isInside(p1.add(dir)) &&
            isInside(p2.add(dir)) &&
            isInside(p3.add(dir))) {
            this.position.add(dir);
        }
    };
    return Bird;
}());
var bird;
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    bird = new Bird();
    rectMode(CENTER);
}
function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        bird.rotate(-PI / 40);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        bird.rotate(PI / 40);
    }
    if (keyIsDown(UP_ARROW)) {
        bird.move(createVector(5, 0));
    }
    if (keyIsDown(DOWN_ARROW)) {
        bird.move(createVector(-5, 0));
    }
    background(0);
    bird.draw();
    fill(255, 0, 0);
    circle(bird.position.x, bird.position.y, 5);
    fill(255);
}
//# sourceMappingURL=build.js.map
var isInside = function (p) {
    return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height;
};
var rotateAroundPoint = function (p, c, angle) {
    return createVector(Math.cos(angle) * (p.x - c.x) - Math.sin(angle) * (p.y - c.y) + c.x, Math.sin(angle) * (p.x - c.x) + Math.cos(angle) * (p.y - c.y) + c.y);
};
var Bird = (function () {
    function Bird() {
        this.size = createVector(15, 10);
        this.color = color(255);
        this.mass = 1;
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.acc = createVector(0, 0);
    }
    Bird.prototype.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.set(0, 0);
        this.boundPosition();
    };
    Bird.prototype.draw = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        triangle(this.size.x, 0, -this.size.x / 2, this.size.y, -this.size.x / 2, -this.size.y);
        pop();
        var _a = this.pos, x = _a.x, y = _a.y;
        var p1 = rotateAroundPoint(createVector(x + this.size.x, y), this.pos, this.vel.heading());
        var p2 = rotateAroundPoint(createVector(x - this.size.x / 2, y + this.size.y), this.pos, this.vel.heading());
        var p3 = rotateAroundPoint(createVector(x - this.size.x / 2, y - this.size.y), this.pos, this.vel.heading());
        fill(255, 10, 10);
        circle(p1.x, p1.y, 5);
        fill(10, 255, 10);
        circle(p2.x, p2.y, 5);
        fill(10, 10, 255);
        circle(p3.x, p3.y, 5);
        fill(this.color);
    };
    Bird.prototype.boundPosition = function () {
        if (this.pos.x < 0 ||
            this.pos.x > width ||
            this.pos.y < 0 ||
            this.pos.y > height) {
            this.vel.rotate(PI);
        }
    };
    return Bird;
}());
var birds = [];
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 10; i++) {
        birds.push(new Bird());
    }
    rectMode(CENTER);
}
function draw() {
    background(0);
    for (var _i = 0, birds_1 = birds; _i < birds_1.length; _i++) {
        var bird = birds_1[_i];
        bird.update();
        bird.draw();
        fill(255, 0, 0);
        fill(255);
    }
}
//# sourceMappingURL=build.js.map
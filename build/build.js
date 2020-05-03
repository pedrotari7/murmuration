var Bird = (function () {
    function Bird() {
        this.size = createVector(15, 10);
        this.angle = 0;
        this.position = createVector(20, 20);
    }
    Bird.prototype.draw = function () {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        triangle(this.size.x, 0, -this.size.x / 2, this.size.y, -this.size.x / 2, -this.size.y);
        pop();
    };
    Bird.prototype.rotate = function (angle) {
        this.angle = this.angle + angle;
    };
    Bird.prototype.move = function (dir) {
        this.position.add(dir.rotate(this.angle));
        this.position.x = constrain(this.position.x, 0, width);
        this.position.y = constrain(this.position.y, 0, height);
    };
    return Bird;
}());
var bird;
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
    return false;
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    bird = new Bird();
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
        bird.move(createVector(5, 0));
    }
    background(0);
    bird.draw();
    fill(255, 0, 0);
    circle(bird.position.x, bird.position.y, 5);
    fill(255);
}
//# sourceMappingURL=build.js.map
var isInside = function (p) {
    return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height;
};
var rotateAroundPoint = function (p, c, angle) {
    return createVector(Math.cos(angle) * (p.x - c.x) - Math.sin(angle) * (p.y - c.y) + c.x, Math.sin(angle) * (p.x - c.x) + Math.cos(angle) * (p.y - c.y) + c.y);
};
var Bird = (function () {
    function Bird(id) {
        this.mass = 1;
        this.pos = createVector(random(0, width), random(0, height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0);
        this.id = id;
        this.color = lerpColor(color(255, 0, 0), color(255, 255, 0), this.id / 600);
    }
    Bird.prototype.update = function (vLim) {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.set(0, 0);
        this.boundPosition();
        this.vel.limit(vLim);
    };
    Bird.prototype.draw = function () {
        fill(this.color);
        circle(this.pos.x, this.pos.y, 7);
        fill(255);
    };
    Bird.prototype.boundPosition = function () {
        if (this.pos.x < 100 ||
            this.pos.x > width - 100 ||
            this.pos.y < 100 ||
            this.pos.y > height - 100) {
            this.vel.rotate(PI / 50);
        }
    };
    Bird.prototype.rule1 = function (flock, m1) {
        var pc = createVector(0, 0);
        for (var _i = 0, flock_1 = flock; _i < flock_1.length; _i++) {
            var bird = flock_1[_i];
            if (bird.id !== this.id) {
                pc.add(bird.pos);
            }
        }
        pc.div(flock.length - 1);
        var v1 = pc.sub(this.pos).div(100).mult(m1);
        this.vel.add(v1);
    };
    Bird.prototype.rule2 = function (flock, m2) {
        var c = createVector(0, 0);
        for (var _i = 0, flock_2 = flock; _i < flock_2.length; _i++) {
            var bird = flock_2[_i];
            if (bird.id !== this.id) {
                var diff = p5.Vector.sub(bird.pos, this.pos);
                if (diff.mag() < 20) {
                    c.sub(diff);
                }
            }
        }
        c.div(10).mult(m2);
        this.vel.add(c);
    };
    Bird.prototype.rule3 = function (flock, m3) {
        var pv = createVector(0, 0);
        for (var _i = 0, flock_3 = flock; _i < flock_3.length; _i++) {
            var bird = flock_3[_i];
            if (bird.id !== this.id) {
                pv.add(bird.vel);
            }
        }
        pv.div(flock.length - 1);
        var v3 = pv.sub(this.vel).div(8);
        this.vel.add(v3.mult(m3));
    };
    return Bird;
}());
var m1Slider;
var m2Slider;
var m3Slider;
var vLimSlider;
var m1 = 0.1;
var m2 = 1;
var m3 = 0.7;
var vLim = 20;
var birds = [];
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function setup() {
    m1Slider = createSlider(-1, 2, m1, 0.1);
    m1Slider.position(32, 10);
    m2Slider = createSlider(-1, 2, m2, 0.1);
    m2Slider.position(32, 30);
    m3Slider = createSlider(-1, 2, m3, 0.1);
    m3Slider.position(32, 50);
    vLimSlider = createSlider(0, 150, vLim, 1);
    vLimSlider.position(32, 70);
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 600; i++) {
        birds.push(new Bird(i));
    }
    rectMode(CENTER);
}
function draw() {
    m1 = m1Slider.value();
    m2 = m2Slider.value();
    m3 = m3Slider.value();
    vLim = vLimSlider.value();
    background(0);
    text("m1", 8, 22);
    text("m2", 8, 42);
    text("m3", 8, 62);
    text("vlim", 8, 82);
    text(m1, 170, 22);
    text(m2, 170, 42);
    text(m3, 170, 62);
    text(vLim, 170, 82);
    for (var _i = 0, birds_1 = birds; _i < birds_1.length; _i++) {
        var bird = birds_1[_i];
        bird.rule1(birds, m1);
        bird.rule2(birds, m2);
        bird.rule3(birds, m3);
        bird.update(vLim);
        fill(255, 0, 0);
        fill(255);
        bird.draw();
    }
}
//# sourceMappingURL=build.js.map
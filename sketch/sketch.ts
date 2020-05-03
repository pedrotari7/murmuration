let bird: Bird;

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

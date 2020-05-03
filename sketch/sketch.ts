let bird: Bird;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  return false; // prevent default
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

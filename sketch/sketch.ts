const birds: Bird[] = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    birds.push(new Bird());
  }
  rectMode(CENTER);
}

function draw() {
  background(0);
  for (const bird of birds) {
    if (keyIsDown(LEFT_ARROW)) {
      bird.rotate(-PI / 40);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      bird.rotate(PI / 40);
    }
    if (keyIsDown(UP_ARROW)) {
      bird.move(
        createVector(5, 0),
        birds.filter(
          (b) =>
            b.position.x != bird.position.x && b.position.y != bird.position.y
        )
      );
    }
    if (keyIsDown(DOWN_ARROW)) {
      bird.move(
        createVector(-5, 0),
        birds.filter(
          (b) =>
            b.position.x != bird.position.x && b.position.y != bird.position.y
        )
      );
    }

    bird.draw();
    fill(255, 0, 0);
    fill(255);
  }
}

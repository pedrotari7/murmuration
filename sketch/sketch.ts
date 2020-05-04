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
    bird.update();
    bird.draw();
    fill(255, 0, 0);
    fill(255);
  }
}

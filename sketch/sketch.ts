let m1Slider: p5.Element;
let m2Slider: p5.Element;
let m3Slider: p5.Element;

let m1: number = 1;
let m2: number = 1;
let m3: number = 1;

const birds: Bird[] = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  m1Slider = createSlider(-1, 20, 1);
  m1Slider.position(30, 10);
  m2Slider = createSlider(-1, 20, 1);
  m2Slider.position(30, 30);
  m3Slider = createSlider(-1, 20, 1);
  m3Slider.position(30, 50);
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 100; i++) {
    birds.push(new Bird(i));
  }
  rectMode(CENTER);
}

function draw() {
  m1 = m1Slider.value() as number;
  m2 = m2Slider.value() as number;
  m3 = m3Slider.value() as number;

  background(0);
  text("m1", 15, 22);
  text("m2", 15, 42);
  text("m3", 15, 62);
  text(m1, 170, 22);
  text(m2, 170, 42);
  text(m3, 170, 62);

  for (const bird of birds) {
    bird.rule1(birds, m1);
    bird.rule2(birds, m2);
    bird.rule3(birds, m3);

    bird.update();
    fill(255, 0, 0);
    fill(255);
    bird.draw();
  }
}

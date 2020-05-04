let m1Slider: p5.Element;
let m2Slider: p5.Element;
let m3Slider: p5.Element;
let vLimSlider: p5.Element;

let m1: number = 0.1;
let m2: number = 1;
let m3: number = 0.7;
let vLim: number = 20;

const birds: Bird[] = [];

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

  for (let i = 0; i < 600; i++) {
    birds.push(new Bird(i));
  }
  rectMode(CENTER);
}

function draw() {
  m1 = m1Slider.value() as number;
  m2 = m2Slider.value() as number;
  m3 = m3Slider.value() as number;
  vLim = vLimSlider.value() as number;

  background(0);
  text("m1", 8, 22);
  text("m2", 8, 42);
  text("m3", 8, 62);
  text("vlim", 8, 82);

  text(m1, 170, 22);
  text(m2, 170, 42);
  text(m3, 170, 62);
  text(vLim, 170, 82);

  for (const bird of birds) {
    bird.rule1(birds, m1);
    bird.rule2(birds, m2);
    bird.rule3(birds, m3);

    bird.update(vLim);
    fill(255, 0, 0);
    fill(255);
    bird.draw();
  }
}

class Bird {
  private size = createVector(15, 10);
  private angle = 0;

  public position = createVector(20, 20);

  constructor() {}

  draw() {
    push();
    translate(this.position.x, this.position.y);

    rotate(this.angle);
    triangle(
      this.size.x,
      0,
      -this.size.x / 2,
      this.size.y,
      -this.size.x / 2,
      -this.size.y
    );

    pop();
  }

  rotate(angle: number) {
    this.angle = this.angle + angle;
  }

  move(dir: p5.Vector) {
    this.position.add(dir.rotate(this.angle));
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }
}

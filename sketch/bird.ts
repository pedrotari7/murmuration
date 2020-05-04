const isInside = (p: p5.Vector): boolean =>
  p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height;

const rotateAroundPoint = (
  p: p5.Vector,
  c: p5.Vector,
  angle: number
): p5.Vector => {
  return createVector(
    Math.cos(angle) * (p.x - c.x) - Math.sin(angle) * (p.y - c.y) + c.x,
    Math.sin(angle) * (p.x - c.x) + Math.cos(angle) * (p.y - c.y) + c.y
  );
};

class Bird {
  private size = createVector(15, 10);
  private color = color(255);
  public mass = 1;
  public pos = createVector(random(width), random(height));
  public vel = createVector(random(-5, 5), random(-5, 5));
  public acc = createVector(0, 0);

  constructor() {}

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.set(0, 0);

    this.boundPosition();
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    rotate(this.vel.heading());
    triangle(
      this.size.x,
      0,
      -this.size.x / 2,
      this.size.y,
      -this.size.x / 2,
      -this.size.y
    );

    pop();

    const { x, y } = this.pos;

    const p1 = rotateAroundPoint(
      createVector(x + this.size.x, y),
      this.pos,
      this.vel.heading()
    );
    const p2 = rotateAroundPoint(
      createVector(x - this.size.x / 2, y + this.size.y),
      this.pos,
      this.vel.heading()
    );
    const p3 = rotateAroundPoint(
      createVector(x - this.size.x / 2, y - this.size.y),
      this.pos,
      this.vel.heading()
    );

    fill(255, 10, 10);
    circle(p1.x, p1.y, 5);
    fill(10, 255, 10);
    circle(p2.x, p2.y, 5);
    fill(10, 10, 255);
    circle(p3.x, p3.y, 5);
    fill(this.color);
  }

  boundPosition() {
    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      this.vel.rotate(PI);
    }
  }
}

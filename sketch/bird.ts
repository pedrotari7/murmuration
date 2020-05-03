const isInside = (p: p5.Vector) =>
  p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height;

const rotateAroundPoint = (p: p5.Vector, c: p5.Vector, angle: number) => {
  return createVector(
    Math.cos(angle) * (p.x - c.x) - Math.sin(angle) * (p.y - c.y) + c.x,
    Math.sin(angle) * (p.x - c.x) + Math.cos(angle) * (p.y - c.y) + c.y
  );
};

class Bird {
  private size = createVector(15, 10);
  private angle = 0;

  public position = createVector(height / 2, width / 2);

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

    const { x, y } = this.position;

    const p1 = rotateAroundPoint(
      createVector(x + this.size.x, y),
      this.position,
      this.angle
    );
    const p2 = rotateAroundPoint(
      createVector(x - this.size.x / 2, y + this.size.y),
      this.position,
      this.angle
    );
    const p3 = rotateAroundPoint(
      createVector(x - this.size.x / 2, y - this.size.y),
      this.position,
      this.angle
    );

    fill(255, 10, 10);
    circle(p1.x, p1.y, 5);
    fill(10, 255, 10);
    circle(p2.x, p2.y, 5);
    fill(10, 10, 255);
    circle(p3.x, p3.y, 5);
    fill(255);
  }

  rotate(angle: number) {
    this.angle += angle;
  }

  move(dir: p5.Vector) {
    const { x, y } = this.position;

    dir.rotate(this.angle);

    const p1 = rotateAroundPoint(
      createVector(x + this.size.x, y),
      this.position,
      this.angle
    );
    const p2 = rotateAroundPoint(
      createVector(x - this.size.x / 2, y + this.size.y),
      this.position,
      this.angle
    );
    const p3 = rotateAroundPoint(
      createVector(x - this.size.x / 2, y - this.size.y),
      this.position,
      this.angle
    );

    if (
      isInside(p1.add(dir)) &&
      isInside(p2.add(dir)) &&
      isInside(p3.add(dir))
    ) {
      this.position.add(dir);
    }
  }
}

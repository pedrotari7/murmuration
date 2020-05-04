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
  private id: number;
  private size = createVector(15, 10);
  private color = color(255);
  public mass = 1;
  public pos = createVector(random(0, width), random(0, height));
  public vel = createVector(random(-2, 2), random(-2, 2));
  public acc = createVector(0, 0);

  constructor(id: number) {
    this.id = id;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.set(0, 0);

    this.boundPosition();
    this.limitVelocity();
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

    // const { x, y } = this.pos;

    // const p1 = rotateAroundPoint(
    //   createVector(x + this.size.x, y),
    //   this.pos,
    //   this.vel.heading()
    // );
    // const p2 = rotateAroundPoint(
    //   createVector(x - this.size.x / 2, y + this.size.y),
    //   this.pos,
    //   this.vel.heading()
    // );
    // const p3 = rotateAroundPoint(
    //   createVector(x - this.size.x / 2, y - this.size.y),
    //   this.pos,
    //   this.vel.heading()
    // );

    // fill(255, 10, 10);
    // circle(p1.x, p1.y, 5);
    // fill(10, 255, 10);
    // circle(p2.x, p2.y, 5);
    // fill(10, 10, 255);
    // circle(p3.x, p3.y, 5);
    // fill(255, 0, 0);
    // textAlign(CENTER);
    // text(this.id, this.pos.x, this.pos.y, 50, 50);
    fill(this.color);
  }

  boundPosition() {
    if (this.pos.x < 0) {
      this.vel.x = 10;
    } else if (this.pos.x > width) {
      this.vel.x = -10;
    }
    if (this.pos.y < 0) {
      this.vel.y = 10;
    } else if (this.pos.y > height) {
      this.vel.y = -10;
    }
  }

  limitVelocity() {
    this.vel.limit(5);
  }

  rule1(flock: Bird[], m1: number) {
    const pc = createVector(0, 0);

    for (const bird of flock) {
      if (bird.id !== this.id) {
        pc.add(bird.pos);
      }
    }
    pc.div(flock.length - 1);

    const v1 = pc.sub(this.pos).div(100).mult(m1);

    this.vel.add(v1);
  }

  rule2(flock: Bird[], m2: number) {
    const c = createVector(0, 0);

    for (const bird of flock) {
      if (bird.id !== this.id) {
        const diff = p5.Vector.sub(bird.pos, this.pos);
        if (diff.mag() < 50) {
          c.sub(diff);
        }
      }
    }

    c.div(10).mult(m2);
    this.vel.add(c);
  }

  rule3(flock: Bird[], m3: number) {
    const pv = createVector(0, 0);

    for (const bird of flock) {
      if (bird.id !== this.id) {
        pv.add(bird.vel);
      }
    }
    pv.div(flock.length - 1);

    const v3 = pv.sub(this.vel).div(8);

    this.vel.add(v3.mult(m3));
  }
}

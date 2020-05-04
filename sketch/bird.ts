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
  public mass = 1;
  private color: p5.Color;
  public pos = createVector(random(0, width), random(0, height));
  public vel = createVector(random(-2, 2), random(-2, 2));
  public acc = createVector(0, 0);

  constructor(id: number) {
    this.id = id;
    this.color = lerpColor(color(255, 0, 0), color(255, 255, 0), this.id / 600);
  }

  update(vLim: number) {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.set(0, 0);

    this.boundPosition();
    this.vel.limit(vLim);
  }

  draw() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, 7);
    fill(255);
  }

  boundPosition() {
    if (
      this.pos.x < 100 ||
      this.pos.x > width - 100 ||
      this.pos.y < 100 ||
      this.pos.y > height - 100
    ) {
      this.vel.rotate(PI / 50);
    }
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
        if (diff.mag() < 20) {
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

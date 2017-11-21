export class Vector2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static create(x: number, y: number): Vector2 {
    return new Vector2(x, y)
  }

  static unit(radians: number) {
    return Vector2.create(0, 1).rotate(radians)
  }

  static random(): Vector2 {
    return Vector2.create(Math.random(), Math.random())
  }

  static randomUnit(): Vector2 {
    return Vector2.unit(Math.random() * Math.PI * 2)
  }

  clear(): Vector2 {
    this.x = 0
    this.y = 0
    return this
  }

  add(vec: Vector2): Vector2 {
    this.x += vec.x
    this.y += vec.y
    return this
  }

  scale(scalar: number): Vector2 {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  magnitude(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }

  normalize(): Vector2 {
    return this.scale(1 / this.magnitude())
  }

  limit(magnitude: number): Vector2 {
    if (this.magnitude() > magnitude) {
      this.normalize().scale(magnitude)
    }
    return this
  }

  angle(): number {
    return Math.atan2(this.y, this.x)
  }

  rotate(radians: number): Vector2 {
    const [x, y] = [this.x, this.y]
    this.x = (x * Math.cos(radians)) - (y * Math.sin(radians))
    this.y = (x * Math.sin(radians)) + (y * Math.cos(radians))
    return this
  }
}

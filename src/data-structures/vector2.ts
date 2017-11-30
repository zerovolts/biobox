export default class Vector2 {
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

  static zero(): Vector2 {
    return Vector2.create(0, 0)
  }

  get magnitude(): number {
    return Math.sqrt(this.magnitudeSquared)
  }

  set magnitude(magnitude: number) {
    this.normalize().scale(magnitude)
  }

  get magnitudeSquared(): number {
    return (this.x * this.x) + (this.y * this.y)
  }

  get angle(): number {
    return Math.atan2(this.y, this.x)
  }

  set angle(radians: number) {
    const newVector = Vector2.create(this.magnitude, 0).rotate(radians)
    this.x = newVector.x
    this.y = newVector.y
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

  sub(vec: Vector2): Vector2 {
    this.x -= vec.x
    this.y -= vec.y
    return this
  }

  scale(scalar: number): Vector2 {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  div(scalar: number): Vector2 {
    this.x /= scalar
    this.y /= scalar
    return this
  }

  normalize(): Vector2 {
    return this.scale(1 / this.magnitude)
  }

  limit(magnitude: number): Vector2 {
    if (this.magnitude > magnitude) {
      this.magnitude = magnitude
    }
    return this
  }

  rotate(radians: number): Vector2 {
    const [x, y] = [this.x, this.y]
    this.x = (x * Math.cos(radians)) - (y * Math.sin(radians))
    this.y = (x * Math.sin(radians)) + (y * Math.cos(radians))
    return this
  }
}

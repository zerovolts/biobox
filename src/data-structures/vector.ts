import * as R from "ramda"

// Vector class that scales to any dimension
export default class Vector {
  dimensions: number
  components: number[]

  constructor(dimensions: number, values: number[]) {
    this.dimensions = dimensions
    this.components = values
    if (this.dimensions != this.components.length) {
      throw new Error(`Expected ${this.dimensions} values; got ${this.components.length} values.`)
    }
  }

  static create(dimensions: number): ((...components: number[]) => Vector) {
    return (
      (...components: number[]) => {
        return new Vector(dimensions, components)
      }
    )
  }

  static check(vector1: Vector, vector2: Vector) {
    if (vector1.dimensions != vector2.dimensions) {
      throw new Error(`${vector1.dimensions} dimensional and ${vector2.dimensions} dimensional vectors are not compatible`)
    }
  }

  clear() {
    this.components = this.components.map(() => 0)
  }

  get magnitude(): number {
    return Math.sqrt(this.magnitudeSquared)
  }

  get magnitudeSquared(): number {
    return R.reduce((pre: number, cur: number) => pre + (cur * cur), 0, this.components)
  }

  push(value: number): Vector {
    this.components.push(value)
    this.dimensions = this.components.length
    return this
  }

  add(vec: Vector): Vector {
    Vector.check(this, vec)
    this.components = R.zipWith(<any>R.add, this.components, vec.components)
    return this
  }

  scale(scalar: number): Vector {
    this.components = R.map((value: number) => value * scalar, this.components)
    return this
  }
}

export const Vector1 = Vector.create(1)
export const Vector2 = Vector.create(2)
export const Vector3 = Vector.create(3)

import {Vector2} from "./vector2"

export class Vehicle {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2

  constructor(x: number, y: number) {
    this.position = Vector2.create(x, y)
    this.velocity = Vector2.create(0, 0)
    this.acceleration = Vector2.create(0, 0)
  }
}

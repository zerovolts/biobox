/*
 * Handles the physics calculations related to movement of an agent.
 */

import Vector2 from "../data-structures/vector2"

interface VehicleOptions {
  mass?: number
  maxSpeed?: number
  maxForce?: number
}

export default class Vehicle {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  mass: number
  maxSpeed: number
  maxForce: number
  wrap: {min: Vector2, max: Vector2}
  wrapFlag: boolean

  constructor(x: number, y: number, options: VehicleOptions = {}) {
    this.position = Vector2.create(x, y)
    this.velocity = Vector2.create(0, 0)
    this.acceleration = Vector2.create(0, 0)
    this.mass = options.mass || 1
    this.maxSpeed = options.maxSpeed || 4
    this.maxForce = options.maxForce || 0.1
    this.wrap = {min: Vector2.create(0, 0), max: Vector2.create(0, 0)}
    this.wrapFlag = false
  }

  applyForce(force: Vector2): Vehicle {
    this.acceleration.add(force.scale(1 / this.mass)).limit(this.maxForce)
    return this
  }

  wrapPosition(min?: Vector2, max?: Vector2) {
    this.wrapFlag = true
    this.wrap.min = min || Vector2.create(0, 0)
    this.wrap.max = max || Vector2.create(100, 100)
    return this
  }

  update() {
    this.velocity.add(this.acceleration).limit(this.maxSpeed)
    this.position.add(this.velocity)
    this.acceleration.clear()

    if (this.wrapFlag) {
      if (this.position.x < this.wrap.min.x) {
        this.position.x += this.wrap.max.x
      } else if (this.position.x > this.wrap.max.x) {
        this.position.x -= this.wrap.max.x
      }

      if (this.position.y < this.wrap.min.y) {
        this.position.y += this.wrap.max.y
      } else if (this.position.y > this.wrap.max.y) {
        this.position.y -= this.wrap.max.y
      }
    }
  }
}

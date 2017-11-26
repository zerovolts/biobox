import Vehicle from "./vehicle"
import Vector2 from "./vector2"
import AgentGraphic from "./agent-graphic"

interface AgentParameters {
  pull?: number
  push?: number
  align?: number
  neighborRadius?: number
  closeNeighborRadius?: number
}

export default class Agent {
  static all: Agent[] = []
  vehicle: Vehicle
  graphic: AgentGraphic
  parameters: AgentParameters

  constructor(x: number, y: number, scene: any) {
    Agent.all.push(this)

    this.vehicle = new Vehicle(x, y)
    this.graphic = new AgentGraphic(scene)
    this.parameters = {
      pull: 1000,
      push: 200,
      align: 200,
      neighborRadius: 200,
      closeNeighborRadius: 50
    }
  }

  centerOfMass(neighbors: Vehicle[]): Vector2 {
    return neighbors
      .map((vehicle: Vehicle) => vehicle.position)
      .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.zero())
      .div(neighbors.length)
  }

  averageHeading(neighbors: Vehicle[]): Vector2 {
    return neighbors
      .map((vehicle: Vehicle) => vehicle.velocity)
      .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.zero())
      .div(neighbors.length)
      .div(this.parameters.align)
  }

  pushForce(neighbors: Vehicle[]): Vector2 {
    const centerOfMass = this.centerOfMass(neighbors)
    return Vector2.zero()
      .add(this.vehicle.position)
      .sub(centerOfMass)
      .div(this.parameters.push)
  }

  pullForce(neighbors: Vehicle[]): Vector2 {
    const centerOfMass = this.centerOfMass(neighbors)
    return Vector2.zero()
      .add(centerOfMass)
      .sub(this.vehicle.position)
      .div(this.parameters.pull)
  }

  calculateTotalForce(neighbors: Vehicle[]): Vector2 {
    const closeNeighbors = this.vehicle.neighbors(this.parameters.closeNeighborRadius)
    const farNeighbors = neighbors.filter(neighbor =>
      !(closeNeighbors as any).includes(neighbor)
    )
    const totalForce = Vector2.zero()

    totalForce.add(this.averageHeading(neighbors))

    if (closeNeighbors.length > 0) {
      totalForce.add(this.pushForce(closeNeighbors))
    }

    if (farNeighbors.length > 0) {
      totalForce.add(this.pullForce(farNeighbors))
    }

    return totalForce
  }

  update() {
    const neighbors = this.vehicle.neighbors(this.parameters.neighborRadius)

    if (neighbors.length > 0) {
      this.vehicle.applyForce(this.calculateTotalForce(neighbors))
    }

    this.vehicle.update()
  }

  draw() {
    this.graphic.update(
      this.vehicle.position.x,
      this.vehicle.position.y,
      this.vehicle.velocity.angle,
      this.vehicle.neighbors(this.parameters.neighborRadius).length
    )
  }
}

import Agent from "./agent"
import Vector2 from "./vector2"

interface BoidParameters {
  pull?: number
  push?: number
  align?: number
  neighborRadius?: number
  closeNeighborRadius?: number
}

export default class Boid extends Agent {
  parameters: BoidParameters

  constructor(x: number, y: number, scene: any) {
    super(x, y, scene)
    
    this.parameters = {
      pull: 1000,
      push: 200,
      align: 200,
      neighborRadius: 200,
      closeNeighborRadius: 50
    }
  }

  logic() {
    const neighbors = this.neighbors(this.parameters.neighborRadius)

    if (neighbors.length > 0) {
      this.vehicle.applyForce(this.calculateTotalForce(neighbors))
    }
  }

  centerOfMass(neighbors: Agent[]): Vector2 {
    return neighbors
      .map((agent: Agent) => agent.vehicle.position)
      .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.zero())
      .div(neighbors.length)
  }

  averageHeading(neighbors: Agent[]): Vector2 {
    return neighbors
      .map((agent: Agent) => agent.vehicle.velocity)
      .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.zero())
      .div(neighbors.length)
      .div(this.parameters.align)
  }

  pushForce(neighbors: Agent[]): Vector2 {
    const centerOfMass = this.centerOfMass(neighbors)
    return Vector2.zero()
      .add(this.vehicle.position)
      .sub(centerOfMass)
      .div(this.parameters.push)
  }

  pullForce(neighbors: Agent[]): Vector2 {
    const centerOfMass = this.centerOfMass(neighbors)
    return Vector2.zero()
      .add(centerOfMass)
      .sub(this.vehicle.position)
      .div(this.parameters.pull)
  }

  calculateTotalForce(neighbors: Agent[]): Vector2 {
    const closeNeighbors = this.neighbors(this.parameters.closeNeighborRadius)
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
}

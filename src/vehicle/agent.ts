import Vehicle from "./vehicle"
import Vector2 from "./vector2"
import AgentGraphic from "./agent-graphic"

export default class Agent {
  static all: Agent[] = []
  vehicle: Vehicle
  graphic: AgentGraphic
  coefficients: {pull: number, push: number, align: number}

  constructor(x: number, y: number, scene: any) {
    Agent.all.push(this)

    this.vehicle = new Vehicle(x, y)
    this.graphic = new AgentGraphic(scene)
    this.coefficients = {pull: 100, push: 100, align: 100}
  }

  update() {
    const neighbors = this.vehicle.neighbors(200)

    if (neighbors.length > 0) {
      const totalForce = Vector2.create(0, 0)
      const closeNeighbors = this.vehicle.neighbors(50)
      const farNeighbors = neighbors.filter(neighbor =>
        !(closeNeighbors as any).includes(neighbor)
      )

      const averageHeading = neighbors
        .map((vehicle: Vehicle) => vehicle.velocity)
        .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
        .div(neighbors.length)

      totalForce.add(averageHeading.div(this.coefficients.align))

      // const centerOfMass = neighbors
      //   .map((vehicle: Vehicle) => vehicle.position)
      //   .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
      //   .div(neighbors.length)

      if (closeNeighbors.length > 0) {
        // const pushAway = closeNeighbors
        //   .map((vehicle: Vehicle) => {
        //     const positionCopy = Vector2.create(this.vehicle.position.x, this.vehicle.position.y)
        //     return positionCopy.sub(vehicle.position)
        //   }).reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
        //   .div(closeNeighbors.length)
        //
        // const pushAway2 = closeNeighbors
        //   .map((vehicle: Vehicle) => vehicle.position)
        //   .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
        //   .div(closeNeighbors.length)

        const centerOfMass = closeNeighbors
          .map((vehicle: Vehicle) => vehicle.position)
          .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
          .div(closeNeighbors.length)

        const pushAway = Vector2.zero().add(this.vehicle.position).sub(centerOfMass)

        totalForce.add(pushAway.div(this.coefficients.push))
      }

      if (farNeighbors.length > 0) {
        // const pullToward = farNeighbors
        //   .map((vehicle: Vehicle) => {
        //     const positionCopy = Vector2.create(vehicle.position.x, vehicle.position.y)
        //     return positionCopy.sub(this.vehicle.position)
        //   }).reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
        //   .div(farNeighbors.length)

        const centerOfMass = neighbors
          .map((vehicle: Vehicle) => vehicle.position)
          .reduce((pre: Vector2, cur: Vector2) => pre.add(cur), Vector2.create(0, 0))
          .div(neighbors.length)

        const pullToward = Vector2.zero().add(centerOfMass).sub(this.vehicle.position)

        totalForce.add(pullToward.div(this.coefficients.pull))
      }

      this.vehicle.applyForce(totalForce)
    }

    this.vehicle.update()
  }

  draw() {
    this.graphic.update(
      this.vehicle.position.x,
      this.vehicle.position.y,
      this.vehicle.velocity.angle,
      this.vehicle.neighbors(100).length
    )
  }
}

import Vehicle from "./vehicle"
import Vector2 from "./vector2"
import AgentGraphic from "./agent-graphic"

export default class Agent {
  static all: Agent[] = []
  vehicle: Vehicle
  graphic: AgentGraphic

  constructor(x: number, y: number, scene: any) {
    Agent.all.push(this)

    this.vehicle = new Vehicle(x, y)
    this.graphic = new AgentGraphic(scene)
  }

  neighbors(radius: number): Agent[] {
    const radiusSquared = radius * radius

    return Agent.all.filter((agent: Agent) => {
      if (this == agent) {
        return false
      }
      const thisPosition = Vector2.create(this.vehicle.position.x, this.vehicle.position.y)
      const magSq = thisPosition.sub(agent.vehicle.position).magnitudeSquared

      return (magSq <= radiusSquared) ? true : false
    })
  }

  logic() {
    // override this method
  }

  update() {
    this.logic()
    this.vehicle.update()
  }

  draw() {
    this.graphic.update(
      this.vehicle.position.x,
      this.vehicle.position.y,
      this.vehicle.velocity.angle,
      //this.neighbors(this.parameters.neighborRadius).length
    )
  }
}

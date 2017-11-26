export default class AgentGraphic {
  frame: any
  body: any
  text: any

  constructor(scene: any) {
    this.frame = scene.nested()
    this.body = this.frame.polygon('0,0 32,16 0,32 4,16').attr({fill: "#f06"}).center(0, 0)
    //this.text = this.frame.text("0").center(16, 16)
    //this.line = scene.line(0, 0, 0, 0).stroke({ width: 3 })
  }

  update(x: number, y: number, angle: number, neighbors: number) {
    this.frame.transform({
      x: x,
      y: y,
    })
    this.body.transform({
      rotation: angle * (180 / Math.PI)
    })
    //this.text.text(neighbors.toString())
    // this.line.transform({
    //   x: this.vehicle.position.x,
    //   y: this.vehicle.position.y,
    //   width: (this.vehicle.position.x + this.vehicle.velocity.x) * 1000,
    //   height: (this.vehicle.position.y + this.vehicle.velocity.y) * 1000
    // })
  }
}

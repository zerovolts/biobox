import * as SVG from "svg.js"

import NeuralNetwork from "./neural-network"
import {NodeGroup, WeightNetwork} from "./neural-network/types"
import Vector2 from "./vehicle/vector2"
import Vehicle from "./vehicle/vehicle"
import Agent from "./vehicle/agent"

const inputs: NodeGroup = [0.5, 0.4, 0.5]
const weightNetwork: WeightNetwork = NeuralNetwork.weightNetworkWith(Math.random, [3, 4, 3])
const outputs: NodeGroup = NeuralNetwork.computeNetwork(inputs, weightNetwork)

console.log(outputs)
console.log(NeuralNetwork.randomWeightNetwork([3, 4, 3]))

;(window as any).vec = Vector2
;(window as any).vehicle = Vehicle
;(window as any).svg = SVG
;(window as any).agent = Agent

function startGame() {
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height
  const scene = (SVG as any)("app").size(screenWidth, screenHeight).attr({background: "#222"})

  scene.click((event: any) => {
    new Agent(event.clientX, event.clientY, scene)
  })

  ;(Array(20) as any).fill(null).map(() =>
    new Agent(
      Math.random() * screenWidth,
      Math.random() * screenHeight,
      scene
    )
  )

  Agent.all.forEach((agent: Agent) => {
    agent.vehicle.wrapPosition(Vector2.create(0, 0), Vector2.create(screenWidth, screenHeight))
    agent.vehicle.applyForce(Vector2.randomUnit().scale(4))
  })

  gameLoop()
}

function gameLoop() {
  const time = Date.now()

  Agent.all.forEach(agent => {
    agent.update()
    agent.draw()
  })

  const delta = Date.now() - time
  setTimeout(gameLoop, 32 - delta)
}

document.addEventListener("DOMContentLoaded", () => {
  startGame()
})

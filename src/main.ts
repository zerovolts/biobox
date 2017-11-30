import * as SVG from "svg.js"

import NeuralNetwork from "./neural-network/index"
import {NodeGroup, WeightNetwork} from "./neural-network/types"
import Vector2 from "./data-structures/vector2"
import Matrix2 from "./data-structures/matrix2"
import Boid from "./agent/boid"

const inputs: NodeGroup = [0.5, 0.4, 0.5]
const weightNetwork: WeightNetwork = NeuralNetwork.weightNetworkWith(Math.random, [3, 4, 3])
const outputs: NodeGroup = NeuralNetwork.computeNetwork(inputs, weightNetwork)

console.log(outputs)
console.log(NeuralNetwork.randomWeightNetwork([3, 4, 3]))

;(window as any).svg = SVG
;(window as any).Matrix2 = Matrix2

function startGame() {
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height
  const scene = (SVG as any)("app").size(screenWidth, screenHeight).attr({background: "#222"})

  scene.click((event: any) => {
    new Boid(event.clientX, event.clientY, scene)
  })

  ;(Array(20) as any).fill(null).map(() =>
    new Boid(
      Math.random() * screenWidth,
      Math.random() * screenHeight,
      scene
    )
  )

  Boid.all.forEach((boid: Boid) => {
    boid.vehicle.wrapPosition(Vector2.create(0, 0), Vector2.create(screenWidth, screenHeight))
    boid.vehicle.applyForce(Vector2.randomUnit().scale(4))
  })

  gameLoop()
}

function gameLoop() {
  const time = Date.now()

  Boid.all.forEach(boid => {
    boid.update()
    boid.draw()
  })

  const delta = Date.now() - time
  setTimeout(gameLoop, 32 - delta)
}

document.addEventListener("DOMContentLoaded", () => {
  startGame()
})

import * as R from "ramda"

import {sigmoid} from "./transfer-functions"
import {Node, NodeGroup, WeightGroup, WeightLayer, WeightNetwork} from "./types"

function computeNode(inputs: NodeGroup, weights: WeightGroup): Node {
  const weightedInputs = R.zipWith(R.multiply, inputs, weights)
  const average = R.reduce(R.add, 0, weightedInputs) / inputs.length
  return sigmoid(average)
}

function computeLayer(inputs: NodeGroup, weightLayer: WeightLayer): NodeGroup {
  return R.map((weights: WeightGroup) => computeNode(inputs, weights), weightLayer)
}

export function computeNetwork(inputs: NodeGroup, weightNetwork: WeightNetwork): NodeGroup {
  return R.reduce(computeLayer, inputs, weightNetwork)
}

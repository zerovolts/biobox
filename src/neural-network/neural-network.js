import * as R from "ramda"

import {sigmoid} from "./transfer-functions"

// output: value
function computeNode(inputs, weights) {
  const weightedInputs = R.zipWith(R.multiply, inputs, weights)
  const average = R.reduce(R.add, 0, weightedInputs) / inputs.length
  return sigmoid(average)
}

// output: Array
function computeLayer(inputs, weightLayer) {
  return R.map(weights => computeNode(inputs, weights), weightLayer)
}

// output: Array
export function computeNetwork(inputs, weightNetwork) {
  return R.reduce(computeLayer, inputs, weightNetwork)
}

import * as R from "ramda"

import {Node, NodeGroup, WeightNetwork} from "./types"

export function squaredError(output: Node, target: Node): number {
  const difference = target - output
  return Math.pow(difference, 2) / 2
}

export function computeNetworkError(outputs: NodeGroup, targets: NodeGroup): number[] {
  return R.zipWith(squaredError, outputs, targets)
}

export function applyGradient(weights: WeightNetwork, corrections: WeightNetwork) {
  return 0
}

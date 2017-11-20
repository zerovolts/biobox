import * as R from "ramda"

import {Node, NodeGroup} from "./types"

export function squaredError(output: Node, target: Node) {
  const difference = target - output
  return Math.pow(difference, 2) / 2
}

export function computeNetworkError(outputs: NodeGroup, targets: NodeGroup) {
  return R.zipWith(squaredError, outputs, targets)
}

import * as R from "ramda"
import {WeightLayer, WeightNetwork} from "./types"

function weightLayerWith(fn: () => number, inputCount: number, outputCount: number): WeightLayer {
  return R.map(() => R.map(fn, Array(inputCount)), Array(outputCount))
}

export function weightNetworkWith(fn: () => number, structure: number[]): WeightNetwork {
  return R.addIndex(R.map)((_: void, i: number) =>
    weightLayerWith(fn, structure[i], structure[i + 1]),
    Array(structure.length - 1)
  )
}

export const randomWeightNetwork = R.partial(weightNetworkWith, [Math.random])

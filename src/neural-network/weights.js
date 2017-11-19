import * as R from "ramda"

function makeWeightLayer(inputCount, outputCount, fill) {
  return Array(outputCount).fill(Array(inputCount).fill(fill))
}

export function makeWeightNetwork(structure, fill = 0.5) {
  return R.addIndex(R.map)((_, i) =>
    makeWeightLayer(structure[i], structure[i + 1], fill),
    Array(structure.length - 1)
  )
}

function weightLayerWith(fn, inputCount, outputCount) {
  return R.map(() => R.map(fn, Array(inputCount)), Array(outputCount))
}

export function weightNetworkWith(fn, structure) {
  return R.addIndex(R.map)((_, i) =>
    weightLayerWith(fn, structure[i], structure[i + 1]),
    Array(structure.length - 1)
  )
}

export const randomWeightNetwork = R.partial(weightNetworkWith, [Math.random])

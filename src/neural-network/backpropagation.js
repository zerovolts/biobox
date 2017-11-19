import * as R from "ramda"

export function squaredError(output, target) {
  const difference = target - output
  return Math.pow(difference, 2) / 2
}

export function computeNetworkError(outputs, targets) {
  return R.zipWith(squaredError, outputs, targets)
}

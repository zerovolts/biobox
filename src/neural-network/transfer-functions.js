import * as R from "ramda"

export function sigmoid(x) {
  return 1 / (1 + Math.pow(Math.E, -x))
}

export function step(x) {
  return x < 0 ? 0 : 1
}

export function rectifiedLinear(x) {
  return R.max(0, x)
}

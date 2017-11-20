import * as R from "ramda"

export function sigmoid(x: number): number {
  return 1 / (1 + Math.pow(Math.E, -x))
}

export function step(x: number): number {
  return x < 0 ? 0 : 1
}

export function rectifiedLinear(x: number): number {
  return R.max(0, x)
}

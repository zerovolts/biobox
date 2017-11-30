import * as R from "ramda"

export default class Matrix2 {
  structure: number[]
  data: any[][]

  constructor(structure: number[]) {
    this.structure = structure
    this.data = (Array(structure[0]) as any).fill(null).map(() =>
      (Array(structure[1]) as any).fill(0)
    )
  }
}

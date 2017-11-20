// a single scalar node
export type Node = number
// one layer of nodes
export type NodeGroup = Node[]

// a single scalar weight
export type Weight = number
// weights corresponding to one output node
export type WeightGroup = Weight[]
// weights corresponding to one input node group
export type WeightLayer = WeightGroup[]
// all weights in a network
export type WeightNetwork = WeightLayer[]

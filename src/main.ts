import NeuralNetwork from "./neural-network"
import {NodeGroup, WeightNetwork} from "./neural-network/types"

//window.NeuralNetwork = NeuralNetwork

const inputs: NodeGroup = [0.5, 0.4, 0.5]
const weightNetwork: WeightNetwork = NeuralNetwork.weightNetworkWith(Math.random, [3, 4, 3])
const outputs: NodeGroup = NeuralNetwork.computeNetwork(inputs, weightNetwork)

console.log(outputs)
console.log(NeuralNetwork.randomWeightNetwork([3, 4, 3]))

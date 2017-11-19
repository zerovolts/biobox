import NeuralNetwork from "./neural-network"

window.NeuralNetwork = NeuralNetwork

const inputs = [0.5, 0.4, 0.5]
const weightNetwork = NeuralNetwork.weightNetworkWith(Math.random, [3, 4, 3])
const outputs = NeuralNetwork.computeNetwork(inputs, weightNetwork)

console.log(outputs)
console.log(NeuralNetwork.randomWeightNetwork([3, 4, 3]))

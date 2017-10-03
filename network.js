const input = new synaptic.Layer(2); // Two inputs
const output = new synaptic.Layer(3); // Three outputs
const learningRate = 0.4;
let trainingData = [
    {input: [1, 0], output: [1, 0, 0]}, // Clap -> Sit
    {input: [0, 1], output: [0, 1, 0]}, // Whistle -> Run
    {input: [1, 1], output: [0, 0, 1]}, // Clap+Whistle -> Jump
];

input.project(output);

function train() {
    for(let i = 0; i < trainingData.length; i++) {
        input.activate(trainingData[i]["input"]);
        output.activate();
        output.propagate(learningRate, trainingData[i]["output"]);
    }
}

function retrain() {
    for(let i = 0; i < 1000; i++) {
        trainingData = _.shuffle(trainingData);
        train();
    }
}
 
retrain();

input.activate([1,0]);
var result = output.activate();

console.log("Sit Neuron: " + result[0] * 100 + "%");
console.log("Run Neuron: " + result[1] * 100 + "%");
console.log("Jump Neuron: " + result[2] * 100 + "%");

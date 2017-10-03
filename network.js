const hidden = document.getElementById('hidden');
const sit = document.getElementById('sit');
const run = document.getElementById('run');
const jump = document.getElementById('jump');
hidden.style.display = 'none';
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

function submit() {
    let arrayInput = document.getElementById('array-input').value;
    let userInput;
    if (!arrayInput.includes(',') || arrayInput.split(',').length > 2) {
        return alert('Please include a 0, 1, or 1, 1 or 0, 1'); 
    }
    else userInput = arrayInput.split(',');
    if(Number(userInput[0] > 1) || Number(userInput[1] > 1)) {
        return alert(`Values should consist of 1's or 0's`);
    }
    input.activate(userInput);
    const result = output.activate();
    sit.innerText = `Sit Neuron: ${result[0] * 100}%`;
    run.innerText = `Run Neuron: ${result[1] * 100}%`;
    jump.innerText = `Jump Neuron: ${result[2] * 100}%`;
    hidden.style.display = 'block';
    arrayInput = '';
}

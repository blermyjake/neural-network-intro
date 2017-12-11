const hidden = document.getElementById("hidden");
const sit = document.getElementById("sit");
const run = document.getElementById("run");
const jump = document.getElementById("jump");
const header = document.getElementById("header");
console.log(header);
let arrayInput = document.getElementById("array-input");
let learningRate = document.getElementById("learning-rate");
hidden.style.display = "none";
header.style.fontFamily = "sans-serif";

const input = new synaptic.Layer(2); // Two inputs
const output = new synaptic.Layer(3); // Three outputs
let trainingData = [
  { input: [1, 0], output: [1, 0, 0] }, // Clap -> Sit
  { input: [0, 1], output: [0, 1, 0] }, // Whistle -> Run
  { input: [1, 1], output: [0, 0, 1] }, // Clap+Whistle -> Jump
  { input: [0, 0], output: [0, 0, 0] } // do nothing
];

input.project(output);

function submit() {
  let userInput;
  if (
    !arrayInput.value.includes(",") ||
    arrayInput.value.split(",").length > 2
  ) {
    return alert("Please include a 0, 1, or 1, 1 or 0, 1 or 0, 0");
  }

  userInput = arrayInput.value.split(", ");

  if (
    isNaN(userInput[0]) ||
    isNaN(userInput[1]) ||
    !isNaN(parseFloat(learningRate))
  )
    return alert("Values should be numbers");
  else if (Number(userInput[0]) > 1 || Number(userInput[1]) > 1)
    return alert(`Values should consist of 1's or 0's`);

  input.activate(userInput);
  const result = output.activate();
  sit.innerText = `Sit Neuron: ${result[0] * 100}%`;
  run.innerText = `Run Neuron: ${result[1] * 100}%`;
  jump.innerText = `Jump Neuron: ${result[2] * 100}%`;
  hidden.style.display = "block";
  clearValue(arrayInput, learningRate);
}

function train() {
  trainingData.map(val => {
    input.activate(val["input"]);
    output.activate();
    output.propagate(learningRate.value, val["output"]);
  });
}

function retrain() {
  for (let i = 0; i < 1000; i++) {
    trainingData = _.shuffle(trainingData);
    train();
  }
}

retrain();

function clearValue(...input) {
  return input.map(val => (val.value = ""));
}

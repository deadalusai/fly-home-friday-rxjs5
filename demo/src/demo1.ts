import { Data, getDataAsync } from './api';

// Get controls from the page
let textbox = document.getElementById('input') as HTMLInputElement;
let output = document.getElementById('output') as HTMLPreElement;

// Renders our results
function updateOutput(data: Data[]) {
    output.innerText = data.map(datum => JSON.stringify(datum)).join('\n');
}

// Interesting demo code here...

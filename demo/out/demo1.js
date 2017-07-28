// Get controls from the page
let textbox = document.getElementById('input');
let output = document.getElementById('output');
// Renders our results
function updateOutput(data) {
    output.innerText = data.map(datum => JSON.stringify(datum)).join('\n');
}
// Interesting demo code here...

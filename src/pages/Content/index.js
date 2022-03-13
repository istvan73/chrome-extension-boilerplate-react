import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';
import { printLine } from './modules/print';
import { initializeWebgazer } from './modules/GazingData/webgazerEntry';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

initializeWebgazer();

// Get the element to prepend our app to. This could be any element on a specific website or even just `document.body`.
const viewport = document.body;

// Create a div to render the <App /> component to.
const app = document.createElement('div');

// Set the app element's id to `root`. This is the same as the element that create-react-app renders to by default so it will work on the local server too.
app.id = 'i-control-root';

// Prepend the <App /> component to the viewport element if it exists. You could also use `appendChild` depending on your needs.
if (viewport) viewport.appendChild(app);

// Render the <App /> component.
ReactDOM.render(<Content />, document.getElementById('i-control-root'));

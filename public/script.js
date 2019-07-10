/*
    An attempt at a rudimentary paint program utilizing vanilla JS and DOM elements directly without Canvas.
*/

const blockSize = 10;

const colorPalette = ['red', 'pink', 'orange', 'yellow', 'aquamarine', 'blue', 'purple', 'black', 'teal', 'gray', 'white'];

//default color
let canvasColor = 'blue';

function createPalette() {
    // Color Selector
    let palette = document.createElement('div');
    let paletteTitle = document.createElement('h1');
    paletteTitle.textContent    = 'Brush Color';
    for (color of colorPalette) {
        let div = document.createElement('div');
        div.setAttribute('class', 'palette-colors');

        let colorblock = document.createElement('div');
        colorblock.setAttribute('class', `palette-block ${color}`); 

        let colorText = document.createElement('p');
        colorText.setAttribute('class', 'color-text');
        colorText.textContent = color;
        div.append(colorblock, colorText);
        palette.append(div);
    }

    // Type Selector
    let typeSelector = document.createElement('div');
    typeSelector.setAttribute('class', 'type-selector');

    let drawSelector = document.createElement('p');
    drawSelector.textContent = 'Draw';
    drawSelector.setAttribute('class', 'drawSelected drawButton');

    let eraseSelector = document.createElement('p');
    eraseSelector.textContent = 'Erase';
    eraseSelector.setAttribute('class', 'eraseButton');

    let clearButton = document.createElement('p');
    clearButton.textContent = 'Clear Canvas';
    clearButton.setAttribute('class', 'clearButton');

    typeSelector.append(drawSelector, eraseSelector, clearButton);

    // Wrapping Div for Tools
    let toolbox = document.getElementsByClassName('toolbox')[0];
    toolbox.append(paletteTitle, palette, typeSelector);
}

function createCanvasSelector() {
    let canvasDiv = document.getElementsByClassName('canvas-div')[0];
    for (color of colorPalette) {
        let div = document.createElement('div');
        div.setAttribute('class', `${color} canvas-color`);
        canvasDiv.append(div);
    }
}

function fillWithDivs() {
    let gridContainer = document.getElementsByClassName('grid-container')[0];
    for (let i = 0; i <= window.screen.width / blockSize; i++) {
        for (let j = 0; j <= window.screen.height / blockSize; j++) {
            let div = document.createElement("div");
            div.setAttribute('id', `${i}-${j}`);
            div.setAttribute('class', 'color-block');
            div.style.width = String(blockSize) + 'px';
            div.style.height = String(blockSize) + 'px';
            div.style.backgroundColor = canvasColor;
            gridContainer.append(div);
        }
    }
}

function addListeners() {
    let colorBlockArr = document.getElementsByClassName('color-block');
    let mouseIsDown = false;
    let chosenColor;
    let selectionType = 'Draw';
    for (let i = 0; i < colorBlockArr.length; i++) {
        // Drawing Listeners
        let div = colorBlockArr[i];
        div.addEventListener("mouseleave", (evt) => {
            if (mouseIsDown === true && selectionType === 'Draw') {
                evt.currentTarget.style.backgroundColor = chosenColor;
            } else if (mouseIsDown === true && selectionType === 'Erase') {
                evt.currentTarget.style.backgroundColor = canvasColor;
            }
        });
        div.addEventListener("mousedown", (evt) => {
            mouseIsDown = true;
        });
        div.addEventListener("mouseup", (evt) => {
            mouseIsDown = false;
        });
    }

    // Brush Color Choice Listeners
    let colorChoices = document.getElementsByClassName('palette-colors');
    colorChoices[0].setAttribute('class', 'palette-colors selected');
    chosenColor = colorChoices[0].childNodes[1].textContent;
    for (let i = 0; i < colorChoices.length; i++) {
        let color = colorChoices[i];
        color.addEventListener('mousedown', (evt) => {
            let previousSelection = document.getElementsByClassName('selected')[0];
            previousSelection.className = 'palette-colors';
            chosenColor = evt.currentTarget.childNodes[1].textContent;
            evt.currentTarget.setAttribute('class', 'palette-colors selected');
        });
    }

    let canvasChoices = document.getElementsByClassName('canvas-color');
    for (let i = 0; i < canvasChoices.length; i++) {
        canvasChoices[i].addEventListener('mousedown', (evt) => {
            let color = evt.currentTarget.classList[0];
            changeBackground(color, false);
        })
        let color = canvasChoices[i].style.backgroundColor;
        
    }

    // Tool Listeners
    let drawSelector = document.getElementsByClassName('drawButton')[0];
    let eraseSelector = document.getElementsByClassName('eraseButton')[0];
    drawSelector.addEventListener('mousedown', (evt) => {
        selectionType = drawSelector.textContent;
        drawSelector.setAttribute('class', 'drawSelected drawButton');
        eraseSelector.setAttribute('class', 'eraseButton');
    });
    eraseSelector.addEventListener('mousedown', (evt) => {
        selectionType = eraseSelector.textContent;
        drawSelector.setAttribute('class', 'drawButton');
        eraseSelector.setAttribute('class', 'drawSelected eraseButton');
    });
    // Clear Button Listener
    let clearButton = document.getElementsByClassName('clearButton')[0];
    clearButton.addEventListener('mousedown', (evt) => {
        changeBackground(canvasColor, true);
    })
}

function changeBackground(color, clear) {
    let grid = document.getElementsByClassName('grid-container')[0].childNodes;
    let oldCanvasColor = canvasColor;
    canvasColor = color;
    for (el of grid) {
        if (el.nodeName == "DIV") {
            if (clear === true) {
                el.style.backgroundColor = color;
            } else if (clear === false && el.style.backgroundColor === oldCanvasColor) {
                el.style.backgroundColor = color;
            }
        }
    }
}

(async function main() {
    await createCanvasSelector();
    await fillWithDivs();
    await createPalette();
    addListeners();
})()
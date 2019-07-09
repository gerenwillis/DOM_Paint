/* Ideas
    1) Converting webcam images to either dom elements or p5 drawings, based on that artist DANIEL ROZIN
    2) A website whose background colors change dependent on the velocity and location of the cursor.
    3) A website that lists satellites, plots their location and tells when and where they will be visible to you.
    4) Using google earth engine to look at the expansion of the Texas Coast
*/

//Dynamically color changing background, vanilla js

const blockSize = 10;

function fillWithDivs() {
    let gridContainer = document.getElementsByClassName('grid-container')[0];
    for (let i = 0; i < window.screen.width / blockSize; i++) {
        for (let j = 0; j < window.screen.height / blockSize; j++) {
            let div = document.createElement("div");
            div.setAttribute('id', `${i}-${j}`);
            div.setAttribute('class', 'color-block');
            gridContainer.append(div);
        }
    }
}

function addListeners() {
    let colorBlockArr = document.getElementsByClassName('color-block');
    let mouseIsDown = false;
    for (let i = 0; i < colorBlockArr.length; i++) {
        let div = colorBlockArr[i];
        div.addEventListener("mouseover", (evt) => {
            if (mouseIsDown === false) {
                evt.currentTarget.style.backgroundColor = 'white';
            } else {
                evt.currentTarget.style.backgroundColor = 'black';
            }
        });
        div.addEventListener("mouseleave", (evt) => {
            if (mouseIsDown === false) {
                evt.currentTarget.style.backgroundColor = 'orange';
            } else {
                evt.currentTarget.style.backgroundColor = 'blue';
            }
        });
        div.addEventListener("mousedown", (evt) => {
            mouseIsDown = true;
        });
        div.addEventListener("mouseup", (evt) => {
            mouseIsDown = false;
        });
    }
}

(async function main() {
    await fillWithDivs();
    addListeners();
})();
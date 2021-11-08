const buttons = document.querySelectorAll("button");
const gridCell = document.querySelector(".gridCell");

let cell = ''; 
let gridsize = 50;

const makeGrid = (screenSize) => {
  for(i = 0; i < screenSize ** 2; i++) {
    cell = document.createElement('div')
    cell.classList.add("cell");
    cell.style.backgroundColor = 'white';
    gridCell.appendChild(cell);
  }
  gridCell.style.gridTemplateColumns =  `repeat(${screenSize}, auto)`;
  gridCell.style.gridTemplateRows =  `repeat(${screenSize}, auto)`;
}

makeGrid(gridsize);

const clear = function (request) {
  if(request === 'resize'){
    gridsize = prompt('please enter a new grid size of not more than 100', 50);
    if(gridsize > 100 || gridsize === null){
    gridsize = 100;
  }
  }
  gridCell.innerHTML = '';
  makeGrid(gridsize);
  selectCell();
}

let currentMode = 'black';
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'resize' || button.id === 'clear'){
      clear(button.id);
    }
    else{
      currentMode = button.id;
        clear(button.id);
    }
    });
});

const randomColor = function() {
    let color = 'rgba(';
    for(let i = 0;i< 3;i++){
    color += Math.floor(Math.random() * 255) + ',';
    }
    return color + '1)';
}


const selectCell = function() {
    let cells = document.querySelectorAll(".gridCell");
    cells.forEach(pixel => { 
    pixel.addEventListener('mouseover', function (selectedCell) {
        let crntClr = getComputedStyle(pixel, null).getPropertyValue('background-color');
        switch(currentMode){
        case 'black':
            selectedCell.target.style.backgroundColor = 'rgba(0,0,0)';
        break;
        case 'colors':
            selectedCell.target.style.backgroundColor = randomColor();
        break;
    };
    });
});
}
selectCell();
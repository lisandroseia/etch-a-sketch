const container = document.querySelector("#container");
let penColor = "black";
let n = 16;

function createGrid(n){
    for(let i = 0; i < n * n ; i++) {
    let square = document.createElement('div');
    square.className = "square";
    document.getElementById('container').appendChild(square);
    }
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseenter', function(e){
        if(penColor === "black"){
            e.target.style.backgroundColor = penColor;
            e.target.style.opacity = 1.0;
        } else if(penColor === "rainbow"){
            e.target.style.backgroundColor = getRandomColor();
            e.target.style.opacity = 1.0;
        } else if(penColor === "pencil"){
            console.log(parseFloat(e.target.style.opacity));
            let opacity;
            if(Number.isNaN(parseFloat(e.target.style.opacity))){
                e.target.style.opacity = 0.1;
            } else if(parseFloat(e.target.style.opacity) < 1.0){
                opacity = parseFloat(e.target.style.opacity) + 0.1;
                e.target.style.opacity = opacity;
            }
            e.target.style.backgroundColor = "black";
        }
    }));
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor() {
    $(".rainbow").css("background", getRandomColor());
}

function deleteGrid(){
    document.querySelectorAll('.square').forEach(function(s){
    document.getElementById('container').removeChild(s);
    })
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.addEventListener('click', function(e){
    switch (e.target.id) {
        case 'ClearGrid':
        deleteGrid();
        createGrid(n);
        break;
        case 'ResizeGrid':
        console.log(e.target.id);
        let numberSelection = prompt("Enter a number between 1 and 64");
        n = numberSelection;
        if(Number.isNaN(parseInt(numberSelection))){
            alert("Enter a valid number!");
        } else
        if(parseInt(numberSelection) < 1 || parseInt(numberSelection) > 64){
            alert("That's not within range!");
        } else{
            deleteGrid();
            createGrid(numberSelection); 
        }
        break;
        case 'Black':
            penColor = "black";
            deleteGrid();
            createGrid(n);
        break;
        case 'Rainbow':
            penColor = "rainbow";
            deleteGrid();
            createGrid(n);
        break;
        case 'pencil':
            penColor = "pencil";
            deleteGrid();
            createGrid(n);
        break;
    }
}));

createGrid(n);

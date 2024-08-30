let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5CirclesWhile();
    draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5CirclesWhile() {
    noFill();
    // fill('red');
    let x = 150;
    let y = 100; 
    let count = 0; 

    while (count < 5) {
        circle(x, y, 50);
        y += 50; // Move the y-position down for the next circle
        count++; // Increment the counter
    }
}


function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}

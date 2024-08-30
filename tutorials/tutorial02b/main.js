let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5CirclesWhile();
    draw5CirclesFor(); 
    drawNCircles(n) 
    draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5CirclesWhile() {
    console.log("Draw 5 Circles using while loop!");
    let i = 0;
    let y = 200; 

    while (i < 5) {
        circle(100, y, 50);
        y += 50; // Move the y-position down for the next circle
        i++; // Increment the counter
    }
}

// my second function using a for loop
function draw5CirclesFor() {
    console.log("Draw 5 Circles using for loop!");
    let x = 200; 
    let y = 200;

    for (let i = 0; i < 5; i++) {
        circle(x, y, 50);
        y += 50; // Move the y-position down for the next circle
    }
}

//my third function using a for loop n times
function drawNCircles(n) {
    console.log(`Draw ${n} Circles using for loop!`); 
    let x = 300; 
    let y = 100;

    for (let i = 0; i < n; i++) {
        circle(x, y, 50);
        y += 50; // Move the y-position down for the next circle
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
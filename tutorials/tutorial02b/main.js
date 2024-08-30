let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5CirclesWhile();
    draw5CirclesFor(); 
    drawNCircles(20); 
    drawNShapesFlexible(10, 40, 400, 100, "circle"); // Example call for circles
    drawNShapesFlexible(5, 50, 500, 100, "square");  // Example call for squares
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

// my third function using a for loop n times
function drawNCircles(n) {
    console.log(`Draw ${n} Circles using for loop!`); 
    let x = 300; // Different starting x-position to avoid overlap
    let y = 100; // Different starting y-position

    for (let i = 0; i < n; i++) {
        circle(x, y, 50);
        y += 50; // Move the y-position down for the next circle
    }
}

// my fourth function for flexible shape drawing
function drawNShapesFlexible(n, size, x, y, shape) {
    for (let i = 0; i < n; i++) {
        if (shape === "circle") {
            circle(x, y, size);
        } else {
            square(x, y, size);
        }
        y += size; // Move the y-position down by the size of the shape
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
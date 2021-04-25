//test
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const SLIDESPEED = 0.022;

var speed = 10;

var slideMovementHandler = new SlideMovementHandler()
var spriteHandler = new SpriteHandler();
var collisionHandler = new CollisionHandler();
var game = new Game()
var start;

function loop(timestamp) {
    //time
    if (start == undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;
    start = timestamp;

    //update
    slideMovementHandler.update(elapsed);
    game.update(elapsed);


    //draw
    game.draw();

    //recall
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);


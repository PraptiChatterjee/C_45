var ghost1_Img;
var food1_Img, food2_Img, food3_Img;
var background_Img;
var foodGroup;
var score;
var gameState = "wait";

function preload() {
    food1_Img = loadImage("images/candy.png");
    food2_Img = loadImage("images/cherry.png");
    food3_Img = loadImage("images/doughnut.png");
    background_Img = loadImage("images/background.png");
    ghost1_Img = loadImage("images/ghost_2.png");
}

function setup() {
    var canvas = createCanvas(600, 600);

    score = 0;

    ghost = createSprite(300, 300, 10, 10);
    ghost.addImage(ghost1_Img);
    ghost.scale = 0.5;

    foodGroup = createGroup();

    edges = createEdgeSprites();

}

function draw() {
    background(background_Img);

    if (keyDown(UP_ARROW)) {
        ghost.velocityY = -2;
        ghost.rotation = -180;
    }
    if (keyDown(DOWN_ARROW)) {
        ghost.velocityY = 2;
        ghost.rotation = 180;
    }
    if (keyDown(RIGHT_ARROW)) {
        ghost.velocityX = 2;
        ghost.rotation = 90;
    }
    if (keyDown(LEFT_ARROW)) {
        ghost.velocityX = -2;
        ghost.rotation = -90;
    }

    drawSprites();

    fill("lightBlue");
    textSize(20);
    text("Score: " + score, 280, 20);

    if (gameState === "wait") {
        stroke("black");
        strokeWeight(2);
        fill("pink");
        textSize(20);
        text("USE ARROW KEYS TO MOVE THE GHOST", 250, 300);
        text("PRESS 'SPACE' TO START", 250, 325);
    }

    spawnFoods();

    if (keyCode === 32 && gameState === "wait") {
        gameState = "play";
    }

    if (gameState === "play") {
        if(ghost.isTouching(foodGroup, foodtouch())){
          foodGroup.destroyEach();
        }

        if (ghost.isTouching(edges)) {
            stroke("black");
            strokeWeight(2);
            fill("white");
            textSize(30);
            text("GAME OVER!", 300, 300);
        }
    }
}

function spawnFoods() {
    if(frameCount % 100 === 0){
    var food = createSprite(100, 100, 30, 30);
    food.x = Math.round(random(100, 500));
    food.y = Math.round(random(100, 500));

    var rand = Math.round(random(1, 3));
    switch (rand) {
        case 1: food.addImage(food1_Img);
            food.scale = 0.5;
            break;

        case 2: food.addImage(food2_Img);
            food.scale = 0.2;
            break;

        case 3: food.addImage(food3_Img);
            food.scale = 0.3;
            break;

        default: break;

    }
    foodGroup.add(food);
 }
}

function foodtouch(ghost, food){
   food.remove();
   score += 1;
   
   if(ghost.velocityY < 12){
       ghost.velocityX*=1.05;
       ghost.velocityY*=1.05;
   }
}
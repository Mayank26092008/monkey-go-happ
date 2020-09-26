var monkey, monkey_running, monkey_stop;
var banana, obstacle;
var FoodGroup, obstacleGroup;
let survival_time = 0;
let score = 0;

let ground;

let PLAY = 1;
let END = 0;
let gameState = PLAY;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey_stop = loadAnimation("sprite_0.png");
  
  banana = loadImage("banana.png");
  obstacle = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width / 2;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(200, 240, 255);

  if(gameState === PLAY){
  ground.velocityX = -5 - survival_time/400;
  textSize(20);
  fill(0);
  text("Survival Time : " + survival_time, 200, 130);
  textSize(25);
  fill(0);
  text("Score : " + score, 210, 80);
    
  if (ground.x < 150) {
    ground.x = ground.width / 2;
  }
  survival_time = survival_time + Math.round(getFrameRate() / 40);
    
  if (keyDown("space") && monkey.y > 310) {
    monkey.velocityY = -14;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  Obstacles();
  Bananas();

  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }

  if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
} else if(gameState === END){
    reset();
}
  if(gameState === END && keyDown("shift")){
     gameState = PLAY;
     monkey.changeAnimation("moving", monkey_running);
     }
  
  
  monkey.collide(ground);

  drawSprites();
  
}

function Obstacles() {
  if (frameCount % 300 === 0) {
    let obs = createSprite(width, 333);
    obs.addImage(obstacle);
    obs.velocityX = -5 - survival_time/400;
    obs.scale = 0.1;
    obs.lifetime = 105;
    obstacleGroup.add(obs);
  }
}

function Bananas() {
  if (frameCount % 160 === 0) {
    let ban = createSprite(width, random(220, 300));
    ban.addImage(banana);
    ban.scale = 0.09;
    ban.velocityX = -4 - survival_time/300;
    ban.lifetime = 130;
    FoodGroup.add(ban);
  }
}

function reset(){
  textSize(30);
    fill(0);
    text("YOU LOST", 200, 100);
    text("Press 'shift' to Play Again", 170, 160);
    monkey.changeAnimation("stop",monkey_stop);
    score = 0;
    survival_time = 0;
    ground.velocityX = 0;
    monkey.velocityY = 0;
   obstacleGroup.setVelocityEach(0);
   FoodGroup.setVelocityEach(0);
}
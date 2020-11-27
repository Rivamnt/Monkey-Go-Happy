var gameState = "play";
var monkey , monkey_running;
var ground, invisibleGround;
var banana ,bananaImage; 
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(700, 450);
  
  monkey = createSprite(150, 400);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  monkey.setCollider("rectangle", 120, 0, 200, 600);

  ground = createSprite(350, 400, 1400, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(350, 405, 700, 5);
  invisibleGround.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  if(gameState === "play"){
    
    //reset ground
    if(ground.x<0){
    ground.x = ground.width/2;
    }

    //jump monkey when space key is pressed
    if (keyDown("space")) {
      monkey.velocityY = -10;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    //stop monkey from falling down
    monkey.collide(invisibleGround);

    //spwan bananas
    spawnBananas();

    //spawn rocks
    spawnObstacles();

    //make monkey eat banana
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
    
    //end game if monkey touches rocks
    if(obstacleGroup.isTouching(monkey)){
      gameState = "end";
    }
  }
  
  if(gameState === "end"){
    
    //destroy monkey, ground, food and obstacles
    monkey.visible = false;
    ground.visible = false;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    //change background to black
    background("black");
    
    //display game over text
    fill("white");
    textSize(20);
    text("Game Over", 320, 225);
  }

  drawSprites();
  
  //display survival time
  score = Math.ceil(frameCount/frameRate());
  fill("black");
  textSize(20);
  text("Survival Time : "+score, 300, 50);
}

function spawnBananas(){
  if(frameCount%150 === 0){
    banana = createSprite(710, 225, 10, 10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    
    //give random y position to bananas
    banana.y = Math.round(random(100, 250));
    
    banana.lifetime = 355; 
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(710, 350, 50, 70);
    obstacle.addImage("stones", obstacleImage);
    obstacle.scale = 0.25;
    
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 355;
    
    obstacleGroup.add(obstacle);
  }
}




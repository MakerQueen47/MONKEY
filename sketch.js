
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var fruitsGroup, obstaclesGroup;
var survivalTime;
var score = 0;

var END = 1;
var PLAY = 0;

var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(500,500);
  
  survivalTime = 0;
  
  monkey = createSprite(50,400,10,10);
  monkey.addAnimation("monk", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(250,450,1000,20);
  ground.velocityX = -5;
  ground.shapeColor = "green";
  
  fruitsGroup = new Group();
  obstaclesGroup = new Group();
  
  //monkey.debug = true;
  //monkey.setCollider("circle",-30,0,340);
  
  
}


function draw() {

  
  if(gameState === PLAY){
      background("pink");

    
    if(monkey.isTouching(fruitsGroup)){
          score = score+1;
          textSize(15);
          fill("green");
          stroke("black");
          text("Banana Score: ", 50, 50);
          text(score, 150, 50);
      
    } 
    textSize(15);
    fill("green");
    stroke("black");
    text("Banana Score: ", 50, 50);
    text(score, 150, 50);
    
    
    

      survivalTime = survivalTime + Math.round(frameRate()/frameCount + 1);
      textSize(15);
      fill("green");
      stroke("black");
      text("Survival Time: ", 350, 50);
      text(survivalTime, 455, 50);

      if(ground.x < 0){

        ground.x = 250;
      }  

      //console.log(monkey.y);

      if(keyDown("space") && monkey.y > 393  ){

        monkey.velocityY = -15;

      }  

      monkey.velocityY = monkey.velocityY + 0.5;

      monkey.collide(ground);

      if(obstaclesGroup.isTouching(monkey)){

        gameState = END;
      }   

      spawnFruits();

      spawnObstacles();

      drawSprites();

      console.log(getFrameRate());
  }else if (gameState === END){
    
    textSize(30);
    text("YOU ARE DEAD!!", width/2 - 100, height/2);
    
  }  
    
}

function spawnFruits()
{

   if (frameCount % 80 === 0) {
      var banana = createSprite(600,120,40,10);
      banana.y = Math.round(random(120,300));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -2;

       //assign lifetime to the variable
      banana.lifetime = 300;


      //add each cloud to the group
      fruitsGroup.add(banana);
   }
}  

function spawnObstacles()
{

   if (frameCount % 200 === 0) {
      var obstacle = createSprite(600,423,40,10);
      obstacle.addImage("obstacles", obstacleImage);
      obstacle.scale = 0.1;
      obstacle.velocityX = -2;

       //assign lifetime to the variable
      obstacle.lifetime = 300;


      //add each cloud to the group
      obstaclesGroup.add(obstacle);
   }
}  
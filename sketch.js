
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var ground,invisible;
var survivalTime=0;
var GameState;
var PLAY,END;
var end;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500)
  
 foodGroup=new Group();
 ObstacleGroup=new Group();
  
 monkey = createSprite(79,370,50,50)
 monkey.addAnimation("monkey",monkey_running)
 monkey.scale=0.1; 
  
  ground = createSprite(250,405,1000,10)
  ground.x=ground.width/2
  
  invisible=createSprite(250,405,1000,10)
  invisible.x= ground.width/2
}


function draw() {
  background("white")
  if(GameState===PLAY){
    
    if(ground.x < 0){
      ground.x=ground.width/2
    }
  if(invisible.x < 0){
      invisible.x=ground.width/2
  }
    invisible.velocityX=-5
    
    if(keyDown("space")&& monkey.y >= 100){
      monkey.velocityY=-20;
    }
     monkey.velocityY=monkey.velocityY +0.8;
     monkey.collide(ground);
    
    score=Math.round(frameCount/3);
    survivalTime=Math.ceil(frameCount/frameRate);
    ground.velocityX=-(5+2* score/100)
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach()
    }
   food();
   obstacles();

    if(monkey.isTouching(ObstacleGroup)){
      GameState===END;
    }
  }
  
  else if(GameState===END){
    ground.velocityX=0;
    invisible.velocityX=0;
    foodGroup.setvelocityXEach(0);
    ObstacleGroup.setvelocityXEach(0);
    
    foodGroup.setlifetimeEach(-1);
    obstacleGroup.setlifetimeEach(-1);
  }
  
  
  
  
  stroke=("red");
  textSize(20);
  fill("black");
   survivalTime=Math.ceil(frameCount/frameRate());
 text("survival Time:"+ survivalTime,20,50);
  
 drawSprites()
   
}
 function food(){
   
   if(frameCount % 80===0){
     var banana = createSprite(500,10,10,20)
     banana.addImage("banana",bananaImage)
     banana.velocityX=-(5+2*score/100)
     banana.y=Math.round(random(120,200));
     banana.scale=0.1;
     foodGroup.add(banana);
     foodGroup.setLifetimeEach(100);
     banana.setCollider("rectangle",0,0,400,400);
   }
 }
function obstacles(){
  if(frameCount % 300 === 0 ){
    var obstacle = createSprite(400,375,50,50)
    obstacle.addImage("obstacle",obstaceImage)
    obstacle.velocityX=-2;
    obstacle.lifetime=250;
    obstacle.scale=0.2
   // obstaclesGroup.add(obstacle)
  }
}

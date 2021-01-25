
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var sword,swordImage,swordCutSound;
var fruit,apricot,apple,pear,banana,fruitGroup;
var alien,alienImage,enemyGroup;
var gameOverImage,gameOversound;


function preload(){
  
  swordImage = loadImage("sword.png");
  apricot=loadImage("fruit1.png");
  apple=loadImage("fruit2.png");
  pear=loadImage("fruit3.png");
  banana=loadImage("fruit4.png");
  alienImage=loadImage("alien1.png");
  gameOverImage=loadImage("gameover.png");
  
  gameOversound=loadSound("gameover.mp3");
  swordCutSound=loadSound("knifeSwooshSound.mp3");
  
}

function setup(){
  createCanvas(400,400);
 
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  
  
}


function draw(){

  background("cyan");
  

  text("Score:"+score,300,50);
  
  if(gameState===PLAY){
  
      sword.x=World.mouseX;
      sword.y=World.mouseY;
    
      
      fruits();
      enemy();
      
 
    if(sword.isTouching(fruitGroup)){
    
      score=score+1;
      fruitGroup.destroyEach();
      swordCutSound.play();
      
    
    }
    
    if(sword.isTouching(enemyGroup)){
      gameOversound.play();
        gameState=END;
      
    }
  
  
  }
  
  else if(gameState===END){
    
 
         fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        sword.x=200;
        sword.y=200;
    sword.scale=1.5;
        sword.addImage(gameOverImage);
        
        
    
  }
  
  
  drawSprites();
}

 function fruits(){

  if(frameCount%80===0){
  
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
  
    r = Math.round(random(1,4));
    if (r===1){
  
      fruit.addImage(apricot);
      
    }
    
    else if (r===2){
    
      fruit.addImage(apple);
    }
    else if (r===3){
    
      fruit.addImage(pear);
    }
    else{
    
      fruit.addImage(banana);
    
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    position=Math.round(random(1,2));
    if (position===1){
      
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
    else if (position===2){
      
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
    }
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  
  }

 }

function enemy(){

  if(frameCount%200===0){
  
    alien=createSprite(400,200,20,20);
    alien.addImage(alienImage);
    alien.depth=fruit.depth;
    alien.y=Math.round(random(100,300));
    alien.velocityX=-(8+(score/10));
    alien.setLifetime=50;
    enemyGroup.add(alien);
    
  
  
  }

}
  
  
  
    
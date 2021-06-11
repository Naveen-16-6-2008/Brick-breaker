var bulletpaddle,bulletpaddleanimation;
var fireball,fireballanimation;
var paddle,paddleanimation;
var bulletpower,bulletpowerimg,extendedpower,extendedpowerimg,firepower,firepowerAnimation;
var tile1,tile1img,tile2,tile2img,tile3,tile3img,tile4,tile4img,tile5,tile5img,tile6,tile6img,tile7,tile7img,tile8,tile8img,tile9,tile9img,tile10,tile10img;
var ball,ballimg;
var background,backgroundimg;
var bullet,bulletimg;
var extendedpaddle,extendedpaddleAnimation;
var life,lifeimg,restart,restartimg,start,startimg;
var laser,pop;
var gameState = "serve";

function preload(){
bulletpaddleanimation = loadAnimation("Images/BulletPaddle/bulletP1.png","Images/BulletPaddle/bulletP2.png","Images/BulletPaddle/bulletP3.png");
backgroundimg = loadImage("Images/bg.png");
paddleanimation = loadAnimation("Images/NormalPaddle/paddle1.png","Images/NormalPaddle/paddle2.png","Images/NormalPaddle/paddle3.png");
extendedpaddleAnimation = loadAnimation("Images/extendPaddle.png");
ballimg = loadImage("Images/ball.png");
lifeimg = loadImage("Images/life.png");
restartimg = loadImage("Images/restart.png");
startimg = loadImage("Images/start.png");
bulletimg = loadImage("Images/bullet.png");
bulletpowerimg = loadImage("Images/power-ups/bulletpower.png");
extendedpowerimg = loadImage("Images/power-ups/extendpower.png");
firepowerAnimation = loadAnimation("Images/power-ups/firepower.png");
tile1img = loadImage("Images/tiles/tile1.png");
tile2img = loadImage("Images/tiles/tile2.png");
tile3img = loadImage("Images/tiles/tile3.png");
tile4img = loadImage("Images/tiles/tile4.png");
tile5img = loadImage("Images/tiles/tile5.png");
tile6img = loadImage("Images/tiles/tile6.png");
tile7img = loadImage("Images/tiles/tile7.png");
tile8img = loadImage("Images/tiles/tile8.png");
tile9img = loadImage("Images/tiles/tile9.png");
tile10img = loadImage("Images/tiles/tile10.png");
fireballanimation = loadAnimation("Images/Fireball/fireball.png","Images/Fireball/fireball1.png","Images/Fireball/fireball2.png")
laser = loadSound("Audio/laser.mp3");
pop = loadSound("Audio/pop.mp3");
}
function setup(){
  var canvas = createCanvas(displayWidth,displayHeight);
     ball = createSprite(width/2,height/2);
     ball.addImage(ballimg);
     ball.scale = 0.2;
     
     paddle = createSprite(width/2,height-40);
     paddle.addAnimation("bulletpaddle",bulletpaddleanimation);

     
     paddle.addAnimation("normalpaddle",paddleanimation);

     paddle.addAnimation("extendedpaddle",extendedpaddleAnimation);

    start = createSprite(width/2,height/2+100);
    start.addImage(startimg);
    start.scale = 0.7;
    start.visible = true;

    restart = createSprite(width/2,height/2+100);
    restart.addImage(restartimg);
    restart.scale = 0.7;
    restart.visible = true;

    life = createSprite(40,40);
    life.addImage(lifeimg);
    life.scale = 0.4;

    score = 0;
    
    life = 3;

    tilegroup = new Group();
    bulletgroup = new Group();
    exendedgroup = new Group();
    firegroup = new Group();
    firegroup2 = new Group();
    bulletgroup2 = new Group();
    spawntile();

}

function draw(){
  background(backgroundimg);
  if(gameState === "serve"){
start.visible = true;
restart.visible = false;
if(mousePressedOver(start)||touches.length>0){
  touches = []
gameState = "play";
ball.velocityX = -13;
ball.velocityY = 14;
}
  }
  if(gameState === "play"){
    start.visible = false;
    restart.visible = false;
    paddle.x = mouseX;
    if(ball.isTouching(paddle)){
      ball.y = ball.y-5;
      ball.velocityY = -ball.velocityY;
      
    }
    if(ball.y<=0){
      ball.velocityY = -ball.velocityY;
    }
    if(ball.x<=0){
      ball.velocityX = -ball.velocityX;
    }
    if(ball.x>=windowWidth){
      ball.velocityX = -ball.velocityX;
    }
    for(var i = 0;i<tilegroup.length;i++){
      if(tilegroup.get(i)!= null&&ball.isTouching(tilegroup.get(i))){
        tilegroup.get(i).destroy()
        ball.velocityY = -ball.velocityY;
        pop.play();
        score+=10;
      }
    }
    for(var i = 0 ;i<bulletgroup.length;i++){
      if(bulletgroup.get(i)!=null&&paddle.isTouching(bulletgroup.get(i))){
        bulletgroup.get(i).destroy();
        paddle.changeAnimation("bullet",bulletpaddleanimation);
        setTimeout(actualAnimation,2000);
        firebullet();
        Bullet.play();
      }
    }
    for(var i = 0 ;i<extendedgroup.length;i++){
      if(extendedgroup.get(i)!=null&&paddle.isTouching(extendedgroup.get(i))){
        extendedgroup.get(i).destroy();
        paddle.changeAnimation("extended",extendedpaddleAnimation);
        setTimeout(actualAnimation,2000);
      }
       }
       for(var i = 0 ;i<firegroup.length;i++){
        if(firegroup.get(i)!=null&&paddle.isTouching(firegroup.get(i))){
          firegroup.get(i).destroy();
          paddle.changeAnimation("fire",firepowerAnimation);
          setTimeout(actualAnimation,2000);
          shootfire();
         }
    }
    for(var i = 0;i<tilegroup.length;i++){
      for(j = 0;j<bulletgroup2.length;j++){
        if(tilegroup.get(i)!=null&&bulletgroup2.isTouching(tilegroup.get(i))){
          tilegroup.get(i).destroy()
          bulletgroup2.get(j).destroy()
          pop.play();
          score+=10;
        }
      }
    }

    for(var i = 0;i<tilegroup.length;i++){
      for(j = 0;j<firegroup2.length;j++){
        if(tilegroup.get(i)!=null&&firegroup2.isTouching(tilegroup.get(i))){
          tilegroup.get(i).destroy()
          firegroup2.get(j).destroy()
          pop.play();
          score+=10;
        }
      }
    }

    if(ball.y>=windowHeight+5&&ball.y<=windowHeight+20){
      lives--;
      ball.x = width/2;
      ball.y = height/2;
      if(lives === 0){
        gameState = end;
      }
    }

    for(var i = 0;i<tilegroup.length;i++){
      if(tilegroup.get(i)!= null && tilegroup.get(i).y>=windowHeight){
        gameState = "end";
        lives = 0;
      }
    }
  firepower();
  bulletpower();
  extendedpower();
  }
  else if(gameState === "end"){
    reset();
  }
 fill ("white");
 textSize(32);
 text("score"+score,windowWidth-300,50);
text(lives,80,50);
 drawSprites();

}
function reset(){
  restart.visible = true;
  if(mousePressedOver(restart)||touches.length>0){
    touches = []
    gameState = "play";
    ball.x = width/2;
    ball.y = height/2;
    ball.velocityX = -15;
    ball.velocityY = 16;
    tilegroup.destroyEach();
    spawntile();
    paddle.changeAnimation("normal",paddleanimation);
    lives = 3;
    score = 0;

  }
}

function shootfire(){
  bullet1 = createSprite(paddle.x-paddle.width/2,windowHeight-35);
  bullet1.addAnimation("s",fireballanimation);
  bullet1.scale = 0.8;
  bullet1.velocityY = -12;
  bullet2 = createSprite(paddle.x + paddle.width/2,windowHeight/-35);
  bullet2.addAnimation("s",fireballanimation);
  bullet2.scale = 0.8;
  bullet2.velocityY = -12;
firegroup2.add (bullet2);
firegroup2.add(bullet1);
bulletgroup2.setlifetimeEach = windowHeight/12;
}

function firebullet(){
  bullet1 = createSprite(paddle.x-paddle.width/2,windowHeight-35);
  bullet1 .addImage("s",bulletpower);
  bullet1.scale = 0.8;
  bullet1.velocityY = -12;
  bullet2 = createSprite(paddle.x + paddle.width/2,windowHeight/-35);
  bullet2.addImage("s",bulletpower);
  bullet2.scale = 0.8;
  bullet2.velocityY = -12;
bulletgroup2.add (bullet2);
bulletgroup2.add(bullet1);
bulletgroup2.setlifetimeEach = windowHeight/12;
}


function actualAnimation(){
  paddle.changeAnimation("normal",paddleanimation);
}

function spawntile (){
  
  for(var x = 52.5;x<windowWidth; x = x+windowWidth/30){
    for (var y = 100; y<=250;y=y+50){
      tile = createSprite(x,y);
      tile.scale = 0.25;
      tilegroup.add(tile);
    var rand = Math.round(random(1,10));
      switch (rand){
        case 1:
          tile.addImage(tile1img);
          break;
        case 2:
          tile.addImage(tile2img);
          break;
        case 3:
          tile.addImage(tile3img);
         break; 

         case 4:
          tile.addImage(tile4img);
         break; 
         
         case 5:
         tile.addImage(tile5img);
        break; 
        
        case 6:
        tile.addImage(tile6img);
       break;
        
       case 7:
       tile.addImage(tile7img);
      break; 
      
      case 8:
      tile.addImage(tile8img);
     break; 

     case 9:
        tile.addImage(tile9img);
        break;

    case 10:
    tile.addImage(tile10img);
    break;

    default:
break;
          
      }
    }
  }
  
}
    
function firepower(){
  if(frameCount%450===0){
    var rand = Math.round(random(10,windowWidth-10))
    firepower = createSprite(rand,0);
    firepower.addImage(firepowerimg);
    firepower.scale = 0.2;
    firepower.velocityY = 6;
    firegroup.add(firepower);

    
  }
}

function extendedpower(){
if(frameCount%250 ===0){
  var rand = Math.round(random(10,windowWidth-10))
  extendedpower = createSprite(rand,0);
  extendedpower.addImage(extendedpowerimg);
  extendedpower.scale = 0.2;
  extendedpower.velocityY = 6;
  extendedgroup.add(extendedpower);

}
}

function bulletpower(){
  if(frameCount%250 ===0){
    var rand = Math.round(random(10,windowWidth-10))
    bulletpower = createSprite(rand,0);
    bulletpower.addImage(bulletpowerimg);
    bulletpower.scale = 0.2;
    bulletpower.velocityY = 6;
    bulletgroup.add(bulletpower);
  }
}

function mouseDragged(){
  paddle.x = mouseX;
  
}
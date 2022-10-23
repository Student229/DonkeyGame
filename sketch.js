const speed = 10; 
var score = 0;
var life = 3;
var monkey,monkeyImg;
var platform1,platform2,platform3;
var platform4,platform5,platform6;
var platform7,platform8,platform9;
var ladderGroup, platformGroup;
var bananaImg,bananasImg;
var banana,bananas;
var barrel,barrelImg;

var ladder1,ladder2,ladder3,ladder4;
var ladder1,ladder2,ladder3,ladder4;

function preload(){
monkeyImg = loadAnimation("./assets/Monkey.png");
platformImg = loadImage("./assets/Platform.png")
ladderImg = loadImage("./assets/Ladder.png");
bananaImg = loadImage('./assets/Banana.png');
bananasImg = loadImage('./assets/Bananas.png');
barrelImg = loadImage('./assets/Barrel.png');

}

function setup(){
    createCanvas(700,1000);

    

    ladderGroup = createGroup();
    platformGroup = createGroup();
    bananaGroup = createGroup();

    invisPlatformL = createSprite(0.07 * width,500,50,height);
    //invisPlatformL.debug = true;
    invisPlatformL.visible = false;
    invisPlatformR = createSprite(0.93 * width,500,50,height);
    //invisPlatformR.debug = true;
    invisPlatformR.visible = false;
    invisPlatformU = createSprite(0.5 * width,120,width,50);
    //invisPlatformU.debug = true;
    invisPlatformU.visible = false;
    
    monkey = createSprite(250,250,10,10);
    monkey.addAnimation("moving",monkeyImg);
    monkey.scale = 0.3;

    platform1 = createSprite(350,850,50,50);
    platform1.addImage(platformImg);
    platform1.scale = 0.6;
    platform1.setCollider("rectangle",30,59,1000,20);
    
    platform2 = createSprite(350,740,50,50);
    platform2.addImage(platformImg);
    platform2.scale = 0.6;
    platform2.setCollider("rectangle",100,60,900,20);

    platform3 = createSprite(483,683,50,50);
    platform3.addImage(platformImg);
    platform3.scale = 0.25;
    platform3.setCollider("rectangle",30,60,720,20);

    platform4 = createSprite(217,683,50,50);
    platform4.addImage(platformImg);
    platform4.scale = 0.25;
    platform4.setCollider("rectangle",-100,60,720,20);

    platform5 = createSprite(350,583,50,50);
    platform5.addImage(platformImg);
    platform5.scale = 0.6;
    platform5.setCollider("rectangle",100,60,900,20);

    platform6 = createSprite(480,530,50,50);
    platform6.addImage(platformImg);
    platform6.scale = 0.25;
    platform6.setCollider("rectangle",-50,55,720,20);

    platform7 = createSprite(350,485,50,50);
    platform7.addImage(platformImg);
    platform7.scale = 0.25;
    platform7.setCollider("rectangle",-180,55,720,20);

    platform8 = createSprite(220,440,50,50);
    platform8.addImage(platformImg);
    platform8.scale = 0.25;
    platform8.setCollider("rectangle",-170,55,720,20);

    platform9 = createSprite(350,337,50,50);
    platform9.addImage(platformImg);
    platform9.scale = 0.6;
    platform9.setCollider("rectangle",30,55,720,20);

    platformGroup.add(platform1);
    platformGroup.add(platform2);
    platformGroup.add(platform3);
    platformGroup.add(platform4);
    platformGroup.add(platform5);
    platformGroup.add(platform6);
    platformGroup.add(platform7);
    platformGroup.add(platform8);
    platformGroup.add(platform9);


    ladder1 = createSprite(130,830,50,50);
    ladder1.addImage(ladderImg);
    ladder1.scale = 0.5;

    ladder2 = createSprite(393,735,50,50);
    ladder2.addImage(ladderImg);
    ladder2.scale = 0.35;

    ladder3 = createSprite(304,735,50,50);
    ladder3.addImage(ladderImg);
    ladder3.scale = 0.35;

    ladder4 = createSprite(127,660,50,50);
    ladder4.addImage(ladderImg);
    ladder4.scale = 0.35;

    ladder5 = createSprite(568,577,50,50);
    ladder5.addImage(ladderImg);
    ladder5.scale = 0.35;

    ladder6 = createSprite(400,523,50,50);
    ladder6.addImage(ladderImg);
    ladder6.scale = 0.2;

    ladder7 = createSprite(280,477,50,50);
    ladder7.addImage(ladderImg);
    ladder7.scale = 0.2;

    ladder8 = createSprite(130,415,50,50);
    ladder8.addImage(ladderImg);
    ladder8.scale = 0.35;

    ladderGroup.add(ladder1);
    ladderGroup.add(ladder2);
    ladderGroup.add(ladder3);
    ladderGroup.add(ladder4);
    ladderGroup.add(ladder5);
    ladderGroup.add(ladder6);
    ladderGroup.add(ladder7);
    ladderGroup.add(ladder8);

    monkey.debug = true;
    platform1.debug = true;
    platform2.debug = true;
    platform3.debug = true;
    platform4.debug = true;
    platform5.debug = true;
    platform6.debug = true;
    platform7.debug = true;
    platform8.debug = true;
    platform9.debug = true;

    bananaSpawn(Math.round(random(130,600)),500);
    bananaSpawn(500, 670);
    bananaSpawn(200, 670);
}

function draw(){
    background("black");

    keyPressed();

    invisPlatformL.displace(monkey);
    invisPlatformR.displace(monkey);
    invisPlatformU.displace(monkey);
    platformGroup.displace(monkey);

    barrelRain();

    /*if(monkey.isTouching(banana)){
        score += 1;
    }*/

    monkey.displace(bananaGroup, bananaRemove);

    drawSprites();
    fill('white');
    textSize(20);
    text('score:'+score,150,100);
}

function keyPressed(){
    monkey.animation.stop();

    if(keyDown(LEFT_ARROW)){
        monkey.position.x= monkey.position.x-speed;
        monkey.rotation = 180;
        monkey.animation.play();
    }
    else if(keyDown(RIGHT_ARROW)){
        monkey.position.x= monkey.position.x+speed;
        monkey.rotation = 0;
        monkey.animation.play();
    }
    else if(keyDown(UP_ARROW)){
        monkey.position.y= monkey.position.y-speed;
        monkey.rotation = -90;
        monkey.animation.play();
    }
    else if(keyDown(DOWN_ARROW)){
        monkey.position.y= monkey.position.y+speed;
        monkey.rotation = 90;
        monkey.animation.play();
    }
}

function bananaSpawn(x,y){
    banana = createSprite(x,y,10,10);
    banana.addImage(bananaImg);
    banana.scale = 0.2;
    bananaGroup.add(banana);
}

function barrelRain(){
    if(frameCount%Math.round(random(50,75))==0){
        barrel = createSprite(Math.round(random(0.1*width,0.9*width)),0);
        barrel.lifeTime = 1000;
        barrel.addImage(barrelImg);
        barrel.scale = 0.1;
        barrel.velocityY = random(10,15);
    }
   
}

function bananaRemove(sprite, banana){
    banana.remove();
    score += 1;
    //add sound
}

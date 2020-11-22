  //creating global variables
  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  var score;
  var ground
  var survivalTime = 0;

  function preload() {

    //loading monkey running animation
    monkey_running =                 loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
    
    //loading images
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
  }

  function setup() {
    createCanvas(600,600);

    //creating ground
    ground = createSprite(300,575,600,20);
    ground.shapeColor = rgb(135, 54, 0);
    ground.x = ground.width / 2;

    //adding monkey image
    monkey = createSprite(100,496,20,20);
    monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.215;

    //creating groups
    bananaGroup = new Group();
    obstacleGroup = new Group();
  }

  function draw() {
     background(rgb(229, 152, 102));

    //creating infinte scrolling ground effect
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //adding jump
    if (keyDown("space")) {
      monkey.velocityY = -15;
    }

    if (monkey.y <= 175) {
      monkey.velocityY = 7;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

     obstacles();
     bananas();
    drawSprites();

    //survival time
    fill("black");
    textFont("Alegreya");
    textSize(25);
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: " + survivalTime, 10, 30);
  }

   function bananas() {

     if (frameCount%80 === 0) {

       banana = createSprite(600,random(175,325),20,20);
       banana.addImage(bananaImage);
       banana.velocityX = -5;
       banana.scale = 0.15;
       banana.lifetime = 200;
       monkey.depth = banana.depth;
       monkey.depth = monkey.depth + 1;
       bananaGroup.add(banana);
       
     }
   }
  function obstacles() {

    if (frameCount%250 === 0) {

      obstacle = createSprite(600,510,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -(6 + survivalTime/10);
      obstacle.lifetime = 100;
      obstacle.scale = 0.3;
      obstacleGroup.add(obstacle);

    }
  }
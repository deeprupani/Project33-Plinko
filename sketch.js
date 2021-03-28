var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var particle;
var gameState = "START";
var count = 0;
var Bonus=0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);


  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }


  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }

}

function draw() {
  background("black");
  textSize(24)
  text("Score : " + score, 20, 30);
  text("Count:"+count,650,30);
  text("Bonus:"+Bonus,300,30)
  text("500", 20, 600);
  text("500", 100, 600);
  text("500", 180, 600);
  text("500", 260, 600);
  text("100", 340, 600);
  text("100", 420, 600);
  text("100", 500, 600);
  text("200", 580, 600);
  text("200", 650, 600);
  text("200", 730, 600);

  Engine.update(engine);

  //mousePressed();

  for (var i = 0; i < plinkos.length; i++) {

    plinkos[i].display();

  }
  //if(frameCount%60===0){
  //  particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  // score++;
  // }

  for (var j = 0; j < particles.length; j++) {

    particles[j].display();
  }
  for (var k = 0; k < divisions.length; k++) {

    divisions[k].display();
  }

  if (particle != null) {
    particle.display();

    if (particle.body.position.y > 760) {
       
      if(particle.body.position.x<500){
        var rand=Math.round(random(20,80));
        score=score+rand;
        Bonus=Bonus+rand;
      }
      if (particle.body.position.x < 300) {
        score = score + 500;
        particle = null;

      } else if (particle.body.position.x > 301 && particle.body.position.x < 600) {
        score = score + 100;
        particle = null;

      } else if (particle.body.position.x > 601 && particle.body.position.x < 900) {
        score = score + 200;
        particle = null;
      }

    }

  }

  if(count>=5){
    gameState="END"
  }

  if(gameState==="END"){
    textSize(48);
    fill("blue");
    text("GameOver :(",300,300);
    text("Better Luck Next Time",200,400)
  }
}

function mousePressed() {

  if (gameState !== "END") {
    particle = new Particle(mouseX, 10, 10, 10);
    // particle.velocityY = 5
    count=count+1;
    Bonus=0
  }
}
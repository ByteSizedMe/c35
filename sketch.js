var ball;
var database;
var balloon,bg;

function preload(){
    balloon = loadImage("balloon.png");
    bg = loadImage("bg2.png");

}

function setup(){
    database = firebase.database();
    createCanvas(800,800);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(balloon);
    ball.scale = 0.5
    var l = database.ref("ball/position");
    l.on("value",readOp);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x': position.x + x,
        'y': position.y + y
    })
}
function readOp(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}
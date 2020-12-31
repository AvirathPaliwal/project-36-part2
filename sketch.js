//Create variables here
var dogimage,dog1image;
var dog;
var food;
var database,mypos;
var feed,addfood;
var foodObj;
var lastFed;
function preload()
{
  //load images here
  dogimage=loadImage("Dog.png");
  dog1image=loadImage("happydog.png");
}

function setup() {
	createCanvas(900, 600);
  dog=createSprite(500,450,50,50)
  dog.addImage("d",dogimage);
  dog.scale=0.3

  foodObj =new Food()
  database=firebase.database();
     var foodStock=database.ref("Food");
     foodStock.on("value",read)

     feed=createButton("FEED THE DOG");
     feed.position(700,200);
     feed.mousePressed(feedDog);

     addfood=createButton("ADD FOOD");
     addfood.position(900,200);
     addfood.mousePressed(addfoods);
}


function draw() {  
  background("green")
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
   
}

function read(data){
   foodS=data.val(); 
   foodObj.updateFoodStock(foodS); 
}
 
function feedDog(){
  dog.addImage(dog1image);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()  // hous() is predefined to automatically get current time from your system
  })
}
function addfoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}


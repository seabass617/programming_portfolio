//============================================
// Sketch File 
//============================================

//============================================
// Sketch File 
// To do: Make it mobile friendly, detect display size and change parameters accordingly,
// Add some music!
//============================================

// let ripples = [];
// let colors = [];
// let switchInterval;
// let sound;
// let F;
// let toff,xoff,yoff;

// function windowResized() {
// 	console.log("resized");
// 	let clientHeight = document.getElementById('banner').clientHeight;
// 	let clientWidth = document.getElementById('banner').clientWidth;
// 	resizeCanvas(clientWidth, clientHeight);
// }


// function setup() {

// 	let clientHeight = document.getElementById('banner').clientHeight;
// 	let clientWidth = document.getElementById('banner').clientWidth;

// 	canvas = createCanvas (clientWidth, clientHeight);

	
// 	// canvas = createCanvas(windowWidth, windowHeight);
// 	canvas.position(0,0);
// 	canvas.style('z-index', '-10');
// 	background(0);

// 	//sound = loadSound('shiki.mp3', loaded);
// 	//f = loadSound();

// 	toff = 0;
// 	xoff = 0;
// 	yoff = 1000; 

// 	colors.push(color(255,236,25));
// 	colors.push(color(255,152,0));
// 	colors.push(color(255,65,45));

// }

// function loaded(){
// 	//sound.loop();
// }

// function draw() {
// 	background(0);

// 	switchInterval = Math.floor(map(noise(toff),0,1,2,5));
// 	//console.log(switchInterval);
	
// 	//now we need to make a perlin noise field of these, so that each frame you have anywhere between 0,2 raindrops falling down???
// 	// lets make it static first, then dynamic...
// 	//we'll start with 2 raindrops falling every second, in a perlin random location on the screen... 
	
// 	// every half second create new drops 
	
// 	if (frameCount % switchInterval == 0){ // try using perlin here within a small range for some variation?
// 		//create two new drops
// 		for (let i = 0; i < 1; i++){
// 			//choose between total randomness or perlin randomness for location
// 			//ripples.push(new Ripple(map(noise(xoff),0,1,0,width),map(noise(yoff),0,1,0,height)));
// 			ripples.push(new Ripple(random(width), random(height)));
			
// 		}

// 	}

// 	for (let i = ripples.length-1; i >= 0; i--){
// 		let ripple = ripples[i];
// 		ripple.update();
// 		ripple.display(); /// Get rid of this display
// 		if (ripple.isAlive){
// 			ripple.display();
// 		} else {
// 			ripples.splice(i,1);
// 		}

// 	 toff += 0.01;
// 	 xoff += 5;
// 	 yoff += 5;


// 	 //single ripple system

// 	};


	
// }

// class Ripple {

//   constructor(x,y,c = color(255,255,255)){
//     //What data does it have
//     this.location = new createVector(x,y);
//     this.radius = 30;
//     this.diameter = this.radius*2;
//     this.speed = 3; //pixels per frame
//     this.isAlive = true;
//     this.opacity = 0.1;
//     this.maxDiameter = 250;
//     this.color = c;
//   }

//   //What can the ripple do
//   display(){
//     noFill();
//     stroke(this.color);
//     ellipse(this.location.x, this.location.y, this.radius * 2, this.radius *2 );
//   }

//   update(){
//     //every frame we want to increase the size of the ripple by speed
//     this.radius = this.radius + this.speed;
//     //Do you want have it so that the opacity decreases as you approach death????
//     //You'll need map function so that you are slowing down proportionally...
//     //map your opacity to the radius
//     let opacity = map(this.radius*2,60,this.maxDiameter,0,255); // I want this opposite of this, right now it is giving 
//     //me 255 when we are at max diameter, and 0 at minimum diameter
//     // if we do 255-255 we get zero
//     // 255-0 = 0
//     //255 
//     this.color.setAlpha(255-opacity); 

//     this.checkState();
//   }

//   checkState(){
//     let diameter = this.radius *2;
//     if (diameter > this.maxDiameter){
//       this.isAlive = false;
//     }
//   }





//   //edge cases 
//   //if the circles diameter is greater than the width of the screen stop drawing it 

//   //edge(){

//   //}
// }

// function mouseClicked(){
// 	// if the mouse is clicked make a ripple at that location
// 	// The color of that click should be somewhere around that white yellow orange range...
// 	let dropcolor = colors[Math.floor(random(3))];
// 	console.log(dropcolor);
// 	ripples.push(new Ripple(mouseX,mouseY,dropcolor));
// 	console.log("mouse clicked");
	

// }





















//==============================================================================================================

//==============================================================================================================

let characterSize = 15;
let streams = [];
let character_array = [];

function setup() {

	let clientHeight = document.getElementById('banner').clientHeight;
	let clientWidth = document.getElementById('banner').clientWidth;

	canvas = createCanvas (clientWidth, clientHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-10');
	background(0);
	let x = 0;
	// Populate the characters array
	character_array = populate_characters_array();
	
	// Create individual streams and push it to the group 
	for (let i = 0; i <= width / characterSize; i++){
		let stream = new Stream();
		stream.generateCharacters(x, random(-1000,0));
		streams.push(stream);
		x += characterSize;
	}
	textSize(characterSize);
}

function windowResized() {
	resizeCanvas(clientWidth, clientHeight);
}

  
function draw() {
	background(0, 125);
	streams.forEach(function(stream){
		stream.render();
	});
}


class Stream {
	constructor(speed){
		this.characters = [];
		this.totalCharacters = round(random(5,20)); //<----- Total Characters
		this.speed = random(2,6); //<------ Fall Speed
	}

	generateCharacters(x, y){
		let first = round(random(0,4)) == 1; //<<-------- Coding coin toss! 
		for (let i = 0; i <= this.totalCharacters; i++){
			let character = new Character(x, y, this.speed, first);
			character.setToRandomCharacter();
			this.characters.push(character);
			y -= characterSize;
			first = false;
		}
	}

	render(){
	this.characters.forEach(function(character) {
			if (character.first) {
				fill(225,150,100);
			}else {
				fill(200,50,255);
			}
			text(character.value, character.x, character.y);
			character.setToRandomCharacter();
			character.rain();
		});
	}
}


class Character {
	constructor(x, y, fall_speed, first){
		this.x = x;
		this.y = y;
		this.value;
		this.fall_speed = fall_speed;
		this.switchInterval = round(random(10,20));
		this.first = first;
	}

	setToRandomCharacter(){
		if (frameCount % this.switchInterval == 0){
			//this.value  = String.fromCharCode(
			//	0x30A0 + round(random(0, 96))); 
			this.value = character_array[Math.floor(Math.random() * character_array.length)];
		}
	}

	rain(){
		this.y = (this.y >= height) ? 0 : this.y += this.fall_speed;
	}

}

function populate_characters_array(){
	array = [];

	for (let i = 0; i <= 96; i++){
		array.push(String.fromCharCode(0x30A0 + i));
	};

	// for (let i = 65; i <= 90; i++){
	// 	array.push(String.fromCharCode(i));
	// };

	for (let i = 0; i <= 9; i++){
		array.push(`${i}`)
	};

	return array
}


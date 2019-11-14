let shapes = [];
let circle1;
let circle2;
let circle3;
let circle4;
let loopBeat;
let bassSynth;
let osc;
let timeValue;
let width;
let height;
let counter;

function setup() {
  createCanvas(400, 400);
  //width = windowWidth;
  //height = windowHeight;
  width = 400;
  height = 400;
  counter = 0;
  circle1 = new circleSlider(50,50,75);
  circle2 = new circleSlider(150,150,75);
  circle3 = new circleSlider(250,250,75);
  circle4 = new circleSlider(350,350,75);
  shapes.push(circle1);
  shapes.push(circle2);
  shapes.push(circle3);
  shapes.push(circle4);
  //osc = new Tone.Oscillator(120, "sine").toMaster().start();
  bassSynth = new Tone.MembraneSynth().toMaster();
  
  loopBeat = new Tone.Loop(song, '16n');
  
  //Tone.Transport.bpm.value = 180;
  Tone.Transport.start();
  loopBeat.start(0);
  
}

function draw() {
  background(220);
  shapes[0].show();
  shapes[1].show();
  shapes[2].show();
  shapes[3].show();
  if(mouseIsPressed){
    shapes[0].clickedX();
    shapes[1].clickedY();
    shapes[2].clickedX(); 
    shapes[3].clickedY();
  }
  circle(width/2,height/2,timeValue);
}

function song(time){
  let currentBeat = split(Tone.Transport.position, ':');
  if(currentBeat[1] == 0){
    bassSynth.triggerAttackRelease('c2', '8n', time, 1);
  }
  console.log(currentBeat);
  timeValue = time;
  
  counter = (counter+1)%16;

}
  
class circleSlider{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getR(){
    return this.r;
  }
  show(){
    strokeWeight(0);
    circle(this.x, this.y, this.r); 
  }
  clickedX(){
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < this.r - 35 && mouseX >= 0 && mouseX <= width){
      this.x = mouseX;
    }
  }
  clickedY(){
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < this.r - 35 && mouseY >= 0 && mouseY <= height){
      this.y = mouseY;
    }
  }
  color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
    fill(this.r,this.g,this.b);
  }
  hover(){
  }
  
}

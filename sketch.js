let shapes = [];
let circle1;
let circle2;
let circle3;
let circle4;
let loopBeat;
let bassSynth, cymbalSynth;
let osc;
var phaser, synth;
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
  fill(255);
  circle1 = new circleSlider(50, 50, 75);
  circle2 = new circleSlider(150, 150, 75);
  circle3 = new circleSlider(250, 250, 75);
  circle4 = new circleSlider(350, 350, 75);
  shapes.push(circle1);
  shapes.push(circle2);
  shapes.push(circle3);
  shapes.push(circle4);
  phaser = new Tone.Phaser({
    "frequency" : 15,
    "octaves" : 5,
    "baseFrequency" : 1000
  }).toMaster();
  synth = new Tone.FMSynth().connect(phaser);
  synth.volume.value = -20;
  osc = new Tone.Oscillator(shapes[3].getY(), "sine").toMaster().start();
  osc.volume.value = shapes[3].getY()/100-20; //controls oscillator volume
  bassSynth = new Tone.MembraneSynth().toMaster();
  cymbalSynth = new Tone.MetalSynth({
    "frequency": shapes[0].getX(),
    "envelope": {
      "attack": 0.001,
      "decay": 0.5,
      "release": 0.2
    },
    "harmonicity": 5.1,
    "modulationIndex": 32,
    "resonance": 4000,
    "octaves": 1.5
  }).toMaster();
  cymbalSynth.volume.value = -100; //controls cymbalSynth volume
  bassSynth.volume.value = -100; //controls bassSynth voume
  loopBeat = new Tone.Loop(song, '16n');

  Tone.Transport.bpm.value = 140;
  Tone.Transport.start();
  loopBeat.start(0);

}

function draw() {
  background(osc.volume.value);
  if (mouseIsPressed) {
    shapes[0].clickedX();
    shapes[1].clickedY();
    shapes[2].clickedX();
    shapes[3].clickedY();
  }
  circle(width / 2, height / 2, timeValue);
  if(counter == 2 || counter == 10 || counter == 6 || counter == 14){
    fill(255,255,100);
    circle(350,50,cymbalSynth.volume.value*2);
  }
  if(shapes[1].getY()>=width/2){
    fill(20);
    triangle(width/4, height-shapes[1].getY()+200,0,400,400,400);

  }
  if(shapes[1].getY()>=width/4){
    fill(20);
    triangle(width/2, height-shapes[1].getY()+150,0,400,400,400);
  }
  shapes[0].show();
  shapes[1].show();
  shapes[2].show();
  shapes[3].show();
}

function song(time) {

  synth.triggerAttackRelease(shapes[1].getY(),"2n");
  if (counter % 4 === 0) {
    bassSynth.triggerAttackRelease('c2', '8n', time, 1);
  }
  if (counter % 8 === 0) {
    cymbalSynth.triggerAttackRelease('16n', time, 0.3);
  }
  cymbalSynth.volume.value = shapes[0].getX()/4 - 75;
  bassSynth.volume.value = shapes[2].getX()/4 - 75;

  if(shapes[3].getY() <= height/1.5){
    osc.type = 'sawtooth5'
    osc.frequency = shapes[3].getY();
    osc.volume.value = shapes[3].getY()/50 - 30;

  }
  if(shapes[3].getY() <= height/2.5){
    osc.type = 'square6'
    osc.frequency = shapes[3].getY();
    osc.volume.value = shapes[3].getY()/50 - 30;

  }

  timeValue = time;
  console.log(counter);
  counter = (counter + 1) % 16;

}

class circleSlider {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getR() {
    return this.r;
  }
  show() {
    fill(255);
    strokeWeight(0);
    circle(this.x, this.y, this.r);
  }
  clickedX() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r - 35 && mouseX >= 0 && mouseX <= width) {
      this.x = mouseX;
    }
  }
  clickedY() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r - 35 && mouseY >= 0 && mouseY <= height) {
      this.y = mouseY;
    }
  }
  color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    fill(this.r, this.g, this.b);
  }
  hover() {}
}

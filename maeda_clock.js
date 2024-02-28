// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
    // YOUR MAIN CLOCK CODE GOES HERE
    background(0); //  beige
    fill(200);
    textFont("Rubik-Regular");
    
    let maxFontSize = 200;
    // let steppedSeconds = obj.seconds % 2 == 0 ? 0 : 1000;
    let steppedSeconds = Math.floor(obj.seconds)*1000;

    let twoSeconds = obj.millis + steppedSeconds;
    let scaleFactor;
    let horizontalOffset = 200;
    
    // hour number
    scaleFactor = Math.cos((twoSeconds*(2*Math.PI)) / 4000)*0.5+0.5;
    textAlign(LEFT, CENTER);
    fill((scaleFactor*0.5+0.5)*255);
    textSize((scaleFactor*0.8+0.2) * maxFontSize);
    text(obj.hours, width/2-horizontalOffset, height/2);
    // minutes number
    scaleFactor = Math.cos((twoSeconds*(2*Math.PI)) / 4000)*-0.5+0.5;
    textAlign(RIGHT, CENTER);
    fill((scaleFactor*0.5+0.5)*255);
    textSize((scaleFactor*0.8+0.2) * maxFontSize);
    text(obj.minutes, width/2+horizontalOffset, height/2);
}
// segmented numbers
let totalColumns = 30;
let totalRows = 9;
let screenWidth = 890;
let screenHeight = 400;
let segmentLength = 10;
let segmentWidth = 7;
let segmentShear = -10;

// color palette
let colorPaletteSelected = 0;
let colorPalette = [
    { // red
        background: [55, 6, 22],
        foreground: [244, 37, 71],
        foreground2: [110, 12, 44],
        outside: [0, 0, 0]
    },
    { // green
        background: [17, 41, 5],
        foreground: [142, 195, 34],
        foreground2: [34, 83, 9],
        outside: [0, 0, 0]
    },
    { // amber
        background: [58, 21, 3],
        foreground: [232, 156, 48],
        foreground2: [97, 35, 5],
        outside: [0, 0, 0]
    },
    { // blue
        background: [18, 28, 73],
        foreground: [110, 156, 247],
        foreground2: [36, 55, 147],
        outside: [0, 0, 0]
    },
    { // white
        background: [24, 24, 37],
        foreground: [224, 212, 247],
        foreground2: [49, 49, 73],
        outside: [0, 0, 0]
    }
];

let colorOutside;
let colorBackground;
let colorForeground;
let colorForeground2;
function setColorPalette() {
    colorOutside = colorPalette[colorPaletteSelected % colorPalette.length].outside;
    colorBackground = colorPalette[colorPaletteSelected % colorPalette.length].background;
    colorForeground = colorPalette[colorPaletteSelected % colorPalette.length].foreground;
    colorForeground2 = colorPalette[colorPaletteSelected % colorPalette.length].foreground2;
}
setColorPalette();

// fireworks
let fireworksList = [];
let fireworksIndex = 0;
let fireworksFrequency = 7;
let fireworksGravity = 0; // didnt end up using this
let fireworksMaxHorizontalVelocity = 50;
let fireworksMaxVerticalVelocity = 30;
let fireworkIndex = 0;
function createFirework() {
    fireworkIndex++;
    fireworksList.push(
        {
            xPosition: width / 2,
            yPosition: -75,
            // yPosition: height / 2,
            xVelocity: lcgArray[fireworkIndex % lcgArrayLength] * fireworksMaxHorizontalVelocity - (fireworksMaxHorizontalVelocity / 2),
            yVelocity: lcgArray[(fireworkIndex + (Math.floor(lcgArrayLength / 2))) % lcgArrayLength] * fireworksMaxVerticalVelocity,
            size: 150,
            lifetime: 40,
            age: 40
        }
    );
};
function fireworkBurst() {
    for (let i = 0; i < 20; i++) {
        createFirework();
    }
    colorPaletteSelected++;
    setColorPalette();
}
// clock milestone detection variables
let firstFrame = true;
let currentHour;
let lastHour;
let currentMinute;
let lastMinute;
let currentSecond;
let lastSecond;

let string = [
    {
        type: "number",
        data: {
            position: 0,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            transition: 0
        }
    },
    {
        type: "number",
        data: {
            position: 1,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            transition: 0
        }
    },
    {
        type: "separator",
    },
    {
        type: "number",
        data: {
            position: 2,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            transition: 0
        }
    },
    {
        type: "number",
        data: {
            position: 3,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            transition: 0
        }
    },
    {
        type: "separator",
    },
    {
        type: "number",
        data: {
            position: 4,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            transition: 0
        }
    },
    {
        type: "number",
        data: {
            position: 5,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            transition: 0
        }
    },
];
let stringLength = string.length;

// typography variables
let typeSize = 190;
let typeKerning = typeSize * 0.575;
let typeYOffset = -5;
let typeTransitionFrames = 10;
let typeTransitionDistance = 100;

function draw_clock(obj) {
    // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999
    //    obj.seconds_until_alarm is:
    //        < 0 if no alarm is set
    //        = 0 if the alarm is currently going off
    //        > 0 --> the number of seconds until alarm should go off

    // keeping track of when the numbers change
    lastHour = currentHour;
    currentHour = obj.hours;
    lastMinute = currentMinute;
    currentMinute = obj.minutes;
    lastSecond = currentSecond;
    currentSecond = obj.seconds;

    background(colorOutside);
    stroke(colorOutside);
    buffer.background(colorBackground);

    // draw a firework after a certain number of frames
    if (fireworksIndex > fireworksFrequency) {
        fireworksIndex = 0;
        createFirework();
    } else {
        fireworksIndex++;
    }

    // iterate through each firework in the list and update its data
    for (let i = 0; i < fireworksList.length; i++) {
        let firework = fireworksList[i];
        firework.age -= 1;
        if (firework.age <= 0) {
            fireworksList.splice(i, 1);
        } else {
            // let fireworkRadius = firework.size * (firework.age / firework.lifetime) * ((firework.age % 5 / 5) * 0.5 + 0.5);
            let fireworkRadius = firework.size * (firework.age / firework.lifetime);
            firework.xPosition += firework.xVelocity;
            firework.yPosition += firework.yVelocity;
            firework.yVelocity += fireworksGravity;
            buffer.fill(colorForeground2);
            buffer.circle(firework.xPosition, firework.yPosition, fireworkRadius);
        }
    }

    if (lastMinute != currentMinute && firstFrame == false) {
        fireworkBurst();
    }

    // calculations for circular motion
    let radius = 10;
    let theta = (obj.seconds + obj.millis / 1000) * 2;
    let circularXOffset = radius * Math.cos(theta);
    let circularYOffset = radius * Math.sin(theta);

    let objString = {};
    if (str(obj.seconds).length == 1) {
        objString.seconds = "0" + obj.seconds;
    } else {
        objString.seconds = obj.seconds;
    }
    if (str(obj.minutes).length == 1) {
        objString.minutes = "0" + obj.minutes;
    } else {
        objString.minutes = obj.minutes;
    }
    if (str(obj.hours).length == 1) {
        objString.hours = "0" + obj.hours;
    } else {
        objString.hours = obj.hours;
    }

    let numbersString = objString.hours + objString.minutes + objString.seconds;

    lastMinute = currentMinute;
    currentMinute = obj.minutes;

    if (lastSecond != currentSecond && firstFrame == false) {

    }

    // draw text on screen
    buffer.textSize(typeSize);
    buffer.textAlign(CENTER, CENTER);
    buffer.textFont(clockTypeface);


    let textColor = color(colorForeground);
    string.forEach((element, index) => {
        if (element.type == "number") {
            element.data.numberOld = element.data.numberNew;
            element.data.numberNew = numbersString[element.data.position];
            if (element.data.numberOld != element.data.numberNew) {
                element.data.numberPrev = element.data.numberOld;
                element.data.transition = 0;
            }
            transitionSkewed = ((element.data.transition * -1 + 1) ** 3) * -1 + 1;

            textColor.setAlpha(transitionSkewed * 255);
            buffer.fill(textColor);
            buffer.text(
                element.data.numberNew,
                width / 2 + circularXOffset + (typeKerning * index) - (typeKerning * (stringLength - 1) / 2),
                height / 2 + circularYOffset + typeYOffset + (-typeTransitionDistance * transitionSkewed + typeTransitionDistance)
            );
            textColor.setAlpha(transitionSkewed * -255 + 255);
            buffer.fill(textColor);
            buffer.text(
                element.data.numberPrev,
                width / 2 + circularXOffset + (typeKerning * index) - (typeKerning * (stringLength - 1) / 2),
                height / 2 + circularYOffset + typeYOffset + (-typeTransitionDistance * transitionSkewed)
            );

            if (element.data.transition < 1) {
                element.data.transition += 1 / (typeTransitionFrames - 1);
            }
        } else if (element.type == "separator") {
            textColor.setAlpha(255);
            buffer.fill(textColor);
            buffer.text(
                ":",
                width / 2 + circularXOffset + (typeKerning * index) - (typeKerning * (stringLength - 1) / 2),
                height / 2 + circularYOffset + typeYOffset
            );
        }
    });
    // buffer.filter(BLUR, 1) // blurs the buffer, causes the segments to fade instead of blink, might use idk
    drawGrid();
    firstFrame = false;
}
function drawGrid() {
    for (let row = 0; row < totalRows; row++) {
        for (let col = 0; col < totalColumns; col++) {
            push();
            drawGridTranslateX = (width / 2) + (screenWidth / (totalColumns - 1) * col) - (screenWidth / 2);
            drawGridTranslateY = (height / 2) + (screenHeight / (totalRows - 1) * row) - (screenHeight / 2);
            translate(drawGridTranslateX, drawGridTranslateY);
            shearX(PI / 180 * segmentShear);
            drawNumber(drawGridTranslateX, drawGridTranslateY);
            pop();
        }
    }
}
function drawNumber(drawGridTranslateX, drawGridTranslateY) {
    let segmentPositions = [
        [
            {
                displaceX: 0,
                displaceY: 0,
                orientation: 0
            },
            {
                displaceX: 0,
                displaceY: -segmentLength * 2,
                orientation: 0
            },
            {
                displaceX: 0,
                displaceY: segmentLength * 2,
                orientation: 0
            },
            {
                displaceX: -segmentLength,
                displaceY: -segmentLength,
                orientation: 1
            },
            {
                displaceX: -segmentLength,
                displaceY: segmentLength,
                orientation: 1
            },
            {
                displaceX: segmentLength,
                displaceY: -segmentLength,
                orientation: 1
            },
            {
                displaceX: segmentLength,
                displaceY: segmentLength,
                orientation: 1
            }
        ],
        [
            {
                displaceX: segmentLength,
                displaceY: 0,
                orientation: 0
            },
            {
                displaceX: -segmentLength,
                displaceY: 0,
                orientation: 0
            },
            {
                displaceX: 0,
                displaceY: segmentLength,
                orientation: 1
            },
            {
                displaceX: 0,
                displaceY: -segmentLength,
                orientation: 1
            }
        ],
    ];
    segmentPositions[0].forEach(element => {
        push();
        drawNumberTranslateX = drawGridTranslateX + element.displaceX;
        drawNumberTranslateY = drawGridTranslateY + element.displaceY;
        translate(element.displaceX, element.displaceY);
        if (element.orientation == 1) {
            rotate(HALF_PI);
        }
        drawSegment(drawNumberTranslateX, drawNumberTranslateY);
        pop();
    });
}
function drawSegment(drawNumberTranslateX, drawNumberTranslateY) {
    try {
        sampledColor = buffer.get(drawNumberTranslateX, drawNumberTranslateY);
    } catch (error) {
        sampledColor = [64, 0, 0, 255];
    }
    fill(sampledColor);
    beginShape();
    vertex(-segmentLength, 0);
    vertex(-segmentLength + segmentWidth / 2, -segmentWidth / 2);
    vertex(segmentLength - segmentWidth / 2, -segmentWidth / 2);
    vertex(segmentLength, 0);
    vertex(segmentLength - segmentWidth / 2, segmentWidth / 2);
    vertex(-segmentLength + segmentWidth / 2, segmentWidth / 2);
    endShape(CLOSE);
}

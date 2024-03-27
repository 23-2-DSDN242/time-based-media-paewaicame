// segmented numbers
let totalRows = 9; // total number rows in the display
let totalColumns = 29; // total number columns in the display
let screenWidth = 880; // width of the segmented display
let screenHeight = 400; // height of the segmented display
let segmentLength = 10; // length of each segment
let segmentWidth = 8; // width of each segment
let segmentShear = -15; // segment slant, in degrees

// color palette
let colorPaletteIndex = 0; // specifies which color palette to use
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

// color palette variables to reference later
let colorOutside;
let colorBackground;
let colorForeground;
let colorForeground2;

// assign color palette variables to specified palette
function setColorPalette(inverse) {
    if (inverse) {
        colorOutside = colorPalette[colorPaletteIndex % colorPalette.length].outside;
        colorBackground = colorPalette[colorPaletteIndex % colorPalette.length].foreground;
        colorForeground = colorPalette[colorPaletteIndex % colorPalette.length].background;
        colorForeground2 = colorPalette[colorPaletteIndex % colorPalette.length].foreground2;
    } else {
        colorOutside = colorPalette[colorPaletteIndex % colorPalette.length].outside;
        colorBackground = colorPalette[colorPaletteIndex % colorPalette.length].background;
        colorForeground = colorPalette[colorPaletteIndex % colorPalette.length].foreground;
        colorForeground2 = colorPalette[colorPaletteIndex % colorPalette.length].foreground2;
    }
}
setColorPalette(false);

// firework variables
let fireworksArray = []; // stores each firework in an array
let fireworksIndex = 0; // counts up each frame, not to be confused with fireworkIndex
let fireworksFrequency = 7; // specifies how often fireworks are created
let fireworksGravity = 0; // firework gravity, didnt end up using this
let fireworksMaxHorizontalVelocity = 50; // max horizontal velocity for each firework
let fireworksMaxVerticalVelocity = 30; // max vertical velocity for each firework
let fireworkIndex = 0; // identifies each firework for random number generation, not to be confused with fireworksIndex

// create a firework and add it to the array
function fireworksCreate() {
    fireworksArray.push(
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
    fireworkIndex++;
};

// generate 20 fireworks at once and switch the color palette
function fireworksBurst() {
    for (let i = 0; i < 20; i++) {
        fireworksCreate();
    }
    colorPaletteIndex++;
    setColorPalette(false);
}

// clock milestone detection variables, stores the current and last value for tracking changes
let currentHour;
let lastHour;
let currentMinute;
let lastMinute;
let currentSecond;
let lastSecond;
let currentAlarm;
let lastAlarm;

// equals true for the first frame only, used to prevent fireworksBurst() from accidentally running on reload
let firstFrame = true;

// stores the current value, previous value, position, and transition progression for each digit of the clock
let string = [
    {
        type: "number",
        data: {
            position: 0,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            typeTransition: 0
        }
    },
    {
        type: "number",
        data: {
            position: 1,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            typeTransition: 0
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
            typeTransition: 0
        }
    },
    {
        type: "number",
        data: {
            position: 3,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            typeTransition: 0
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
            typeTransition: 0
        }
    },
    {
        type: "number",
        data: {
            position: 5,
            numberOld: "",
            numberNew: "",
            numberPrev: "",
            typeTransition: 0
        }
    },
];
let stringLength = string.length;

// typography variables
let typeSize = 190; // how large the text is
let typeKerning = typeSize * 0.575; // spacing between the characters
let typeYOffset = -5; // vertical offset
let typeTransitionFrames = 12; // duration of the number transition
let typeTransitionDistance = 140; // vertical length of the number transition

// alarm variables
let progressBarWidth = screenWidth / totalColumns * 28; // width of the progress bar, equal to 28 digits
let progressBarHeight = screenHeight / totalRows; // height of the progress bar, equal
let progressBarYPosition = 380; // vertical position of the progress bar
let progressBarTransitionFactor = 0; // variable to track progress bar transition progression
let progressBarTransitionFrames = 12; // length of the progress bar transition
let progressBarFactor; // tracks the progression of the progress bar as a number between 0 and 1
let progressBarFactorInitial; // tracks the initial duration of the alarm

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

    // keeping track of number changes
    lastHour = currentHour;
    currentHour = obj.hours;
    lastMinute = currentMinute;
    currentMinute = obj.minutes;
    lastSecond = currentSecond;
    currentSecond = obj.seconds;
    lastAlarm = currentAlarm;
    currentAlarm = obj.seconds_until_alarm;

    // set canvas backgrounds and strokes
    background(colorOutside);
    stroke(colorOutside);
    buffer.background(colorBackground);

    // draw a firework after a certain number of frames
    if (fireworksIndex > fireworksFrequency) {
        fireworksIndex = 0;
        fireworksCreate();
    } else {
        fireworksIndex++;
    }

    // iterate through each firework in the list, update its data, and draw it.
    for (let i = 0; i < fireworksArray.length; i++) {
        let firework = fireworksArray[i];
        firework.age -= 1;
        if (firework.age <= 0) {
            fireworksArray.splice(i, 1);
        } else {
            // let fireworkRadius = firework.size * (firework.age / firework.lifetime) * ((firework.age % 5 / 5) * 0.5 + 0.5);
            let fireworkRadius = firework.size * map(firework.age,0,firework.lifetime,0,1);
            firework.xPosition += firework.xVelocity;
            firework.yPosition += firework.yVelocity;
            firework.yVelocity += fireworksGravity;
            buffer.fill(colorForeground2);
            buffer.circle(firework.xPosition, firework.yPosition, fireworkRadius);
        }
    }

    // create more fireworks when the minute changes
    if (lastMinute != currentMinute && firstFrame == false) {
        fireworksBurst();
    }

    // calculations for ambient circular motion
    let theta = (obj.seconds + obj.millis / 1000) * 2;
    let circularXOffset = 10 * Math.cos(theta);
    let circularYOffset = 10 * Math.sin(theta);

    // add leading zeroes to single-digit numbers
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

    // concatenate numbers into a single string
    let numbersString = `${objString.hours}${objString.minutes}${objString.seconds}`;
    // let numbersString = "LMAOOO"

    // draw numbers on the canvas
    buffer.textSize(typeSize);
    buffer.textAlign(CENTER, CENTER);
    buffer.textFont(clockTypeface);
    let textColor = color(colorForeground);
    string.forEach((element, index) => {
        if (element.type == "number") {
            // store previous number when current number changes for transition
            element.data.numberOld = element.data.numberNew;
            element.data.numberNew = numbersString[element.data.position];
            if (element.data.numberOld != element.data.numberNew) {
                element.data.numberPrev = element.data.numberOld;
                element.data.typeTransition = 0;
            }

            // skew transition value for an easing effect
            let typeTransitionSkewed = ((element.data.typeTransition * -1 + 1) ** 3) * -1 + 1;
            
            // draw new number
            textColor.setAlpha(typeTransitionSkewed * 255);
            buffer.fill(textColor);
            buffer.text(
                element.data.numberNew,
                width / 2 + circularXOffset + (typeKerning * index) - (typeKerning * (stringLength - 1) / 2),
                height / 2 + circularYOffset + typeYOffset + (-typeTransitionDistance * typeTransitionSkewed + typeTransitionDistance)
            );
            
            // draw old number
            textColor.setAlpha(typeTransitionSkewed * -255 + 255);
            buffer.fill(textColor);
            buffer.text(
                element.data.numberPrev,
                width / 2 + circularXOffset + (typeKerning * index) - (typeKerning * (stringLength - 1) / 2),
                height / 2 + circularYOffset + typeYOffset + (-typeTransitionDistance * typeTransitionSkewed)
            );
            
            // update transitions
            if (element.data.typeTransition < 1) {
                if (element.data.typeTransition > 1) {
                    element.data.typeTransition = 1;
                } else {
                    element.data.typeTransition += 1 / (typeTransitionFrames - 1);
                }
            }
        } else if (element.type == "separator") { // draw number separators
            textColor.setAlpha(255);
            buffer.fill(textColor);
            buffer.text(
                ":",
                width / 2 + circularXOffset + (typeKerning * index) - (typeKerning * (stringLength - 1) / 2),
                height / 2 + circularYOffset + typeYOffset
            );
        }
    });

    // alarm stuff, displays a bar on the screen when the alarm is set, blinks when it goes off
    progressBarFactor = obj.seconds_until_alarm > 0 ? map(obj.seconds_until_alarm,0,progressBarFactorInitial,0,1) : 0;

    if (lastAlarm <= 0 && currentAlarm > 0) {
        progressBarFactorInitial = currentAlarm;
    }
    
    // transitions the bar in and out depending on if the alarm is set or not
    if (obj.seconds_until_alarm >= 0) {
        if (progressBarTransitionFactor > 1) {
            progressBarTransitionFactor = 1;
        } else {
            progressBarTransitionFactor += 1 / (progressBarTransitionFrames - 1);
        }
    } else {
        if (progressBarTransitionFactor < 0) {
            progressBarTransitionFactor = 0;
        } else {
            progressBarTransitionFactor -= 1 / (progressBarTransitionFrames - 1);
        }
    }
    
    // skews the transition factor for an easing effect
    let progressBarTransitionFactorSkewed = ((progressBarTransitionFactor * -1 + 1) ** 3) * -1 + 1;
    
    // makes the bar blink when the alarm goes off
    if (obj.seconds_until_alarm == 0) {
        let expression = obj.millis > 500;
        progressBarFactor = expression ? 0 : 1;
        setColorPalette(expression ? false : true);
    }

    // draw the progress bar
    if (progressBarTransitionFactor > 0) {
        buffer.strokeWeight(0);
        buffer.fill(colorForeground2);
        buffer.rect(
            (width / 2) - (progressBarWidth / 2 * progressBarTransitionFactorSkewed),
            progressBarYPosition,
            progressBarWidth * progressBarTransitionFactorSkewed,
            progressBarHeight
        );
        buffer.fill(colorForeground);
        buffer.rect(
            (width / 2) - (progressBarWidth / 2 * progressBarTransitionFactorSkewed),
            progressBarYPosition,
            progressBarWidth * progressBarFactor * progressBarTransitionFactorSkewed,
            progressBarHeight
        );
    }

    // reset the blinking animation when the alarm stops in case it doesnt for some reason lol
    if (lastAlarm >= 0 && currentAlarm < 0) {
        setColorPalette(false);
    }

    // buffer.filter(BLUR, 1) // blurs the buffer, causes the segments to fade instead of blink, might use idk
    drawGrid(); // draw the segmented display based on the buffer
    firstFrame = false;
}

// draws the entire grid
function drawGrid() {
    // iterate over a 2D array and draw a number for each grid cell
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

// draws a single number
function drawNumber(drawGridTranslateX, drawGridTranslateY) {
    let segmentPositions = [
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
    ];

    // iterate over each segment position and draw a segment
    segmentPositions.forEach(element => {
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

// draws a single segment
function drawSegment(drawNumberTranslateX, drawNumberTranslateY) {
    // sample a color from the offscreen buffer to color the segment
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
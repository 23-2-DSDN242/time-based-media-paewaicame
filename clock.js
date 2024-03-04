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
    background(0);
    buffer.background(64,0,0,255);
    buffer.fill(255,64,64,255);
    buffer.textSize(220);
    buffer.textAlign(LEFT, CENTER);
    buffer.textFont("Fraunces");

    let radius = 20;
    let theta = (obj.seconds + obj.millis/1000) * 2
    let xOffset = radius * Math.cos(theta)
    let yOffset = radius * Math.sin(theta)

    // let objString = {};
    // if (obj.seconds.length == 1) {
    //     objString.seconds = obj.seconds + "0";
    //     console.log("yippee")
    // } else {
    //     objString.seconds = obj.seconds;
    //     console.log("nosiree")
    // }
    // if (obj.minutes.length == 1) {
    //     objString.minutes = obj.minutes + "0";
    // } else {
    //     objString.minutes = obj.minutes;
    // }
    // if (obj.hours.length == 1) {
    //     objString.hours = obj.hours + "0";
    // } else {
    //     objString.hours = obj.hours;
    // }

    // let string = objString.hours + ":" + objString.minutes + ":" + objString.seconds;
    let string = obj.hours + ":" + obj.minutes + ":" + obj.seconds;
    buffer.text(string, 50 + xOffset, height / 2 + yOffset);

    let totalColumns = 32;
    let totalRows = 9;
    let screenWidth = 890;
    let screenHeight = 400;
    let segmentLength = 10;
    let segmentWidth = 6;

    function drawGrid() {
        for (let row = 0; row < totalRows; row++) {
            for (let col = 0; col < totalColumns; col++) {
                push();
                drawGridTranslateX = (width / 2) + (screenWidth / (totalColumns - 1) * col) - (screenWidth / 2);
                drawGridTranslateY = (height / 2) + (screenHeight / (totalRows - 1) * row) - (screenHeight / 2);
                translate(drawGridTranslateX, drawGridTranslateY);
                drawNumber(drawGridTranslateX, drawGridTranslateY);
                pop();
            }
        }
    }
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
            },
        ];
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
    function drawSegment(drawNumberTranslateX, drawNumberTranslateY) {
        try {
            sampledColor = buffer.get(drawNumberTranslateX, drawNumberTranslateY);
        } catch (error) {
            sampledColor = [64,0,0,255]
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
    drawGrid();
}
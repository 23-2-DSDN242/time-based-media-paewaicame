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

    var buffer = createGraphics(width, height);
    buffer.background(0);
    buffer.fill(255);
    buffer.textSize(250);
    buffer.textAlign(CENTER, CENTER);
    buffer.textFont("Fraunces");
    let string = obj.hours + ":" + obj.minutes + ":" + obj.seconds;
    buffer.text(string, width / 2, height / 2);

    let totalColumns = 45;
    let totalRows = 13;
    let screenWidth = 890;
    let screenHeight = 400;
    let segmentLength = 7;
    let segmentWidth = 5;
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
        sampledColor = buffer.get(drawNumberTranslateX, drawNumberTranslateY);
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
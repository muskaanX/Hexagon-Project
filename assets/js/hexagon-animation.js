let hexSize = 340;
let progress = 0;
let vertices = [];
let midpoints = [];
let innerLines = [];
let innerIntersections = [];
let extendedLines = [];
let centerNode;

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent('hexAnimation');
    strokeWeight(5);
    calculatePoints();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    // Draw the outer hexagon
    stroke(255);
    noFill();
    drawHexagon();

    // Draw vertices, midpoints, intersections, and extended lines
    stroke(255); // Set stroke color to white for the ellipses
    fill(255);  // Set fill color to white for the ellipses
    drawVerticesAndMidpoints();

    // Draw inner lines
    stroke(255); // color for the inner lines
    drawInnerLines();

    // Draw extended lines
    stroke(255); // color for the extended lines
    drawExtendedLines();

    // Draw the tracing path
    stroke(253, 254, 2); // Neon color for the path
    drawTracingPath();
    
    // Draw the center node
    stroke(255); // Set stroke color to white for the ellipses
    fill(255);  // Set fill color to white for the ellipses
    drawCenterNode();

    // Update progress
    progress += 0.005;
    if (progress > 6) {
        progress = 0;
    }
}

function calculatePoints() {
    vertices = [];
    midpoints = [];
    innerLines = [];
    innerIntersections = [];
    extendedLines = [];

    for (let i = 0; i < 6; i++) {
        let angle = PI / 2 + i * TWO_PI / 6;  // Rotate 90 degrees by adding PI / 2
        let x = cos(angle) * hexSize;
        let y = sin(angle) * hexSize;
        vertices.push(createVector(x, y));

        let nextAngle = PI / 2 + ((i + 1) % 6) * TWO_PI / 6;
        let nextX = cos(nextAngle) * hexSize;
        let nextY = sin(nextAngle) * hexSize;
        let midX = (x + nextX) / 2;
        let midY = (y + nextY) / 2;
        midpoints.push(createVector(midX, midY));

        // Calculate inner lines
        let lineLength = hexSize / 2;
        let angle1 = angle + PI; // 180 degrees to the right
        let angle2 = angle + 4 * PI / 3; // 240 degrees to the right
        let endPoint1 = createVector(midX + cos(angle1) * lineLength, midY + sin(angle1) * lineLength);
        let endPoint2 = createVector(midX + cos(angle2) * lineLength, midY + sin(angle2) * lineLength);
        innerLines.push([createVector(midX, midY), endPoint1]);
        innerLines.push([createVector(midX, midY), endPoint2]);

        // Add inner points for intersection
        innerIntersections.push(endPoint1);
        innerIntersections.push(endPoint2);
    }

    // Calculate the extended lines from the inner intersection points to the center
    for (let intersection of innerIntersections) {
        let angle = atan2(-intersection.y, -intersection.x); // Angle towards the center (0,0)
        let lineLength = hexSize / 2;
        let endPoint = createVector(intersection.x + cos(angle) * lineLength, intersection.y + sin(angle) * lineLength);
        extendedLines.push([intersection, endPoint]);
    }

    // Define the center node
    centerNode = createVector(0, 0);
}

function drawHexagon() {
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);
}

function drawTracingPath() {
    let currentSegment = floor(progress);
    let segmentProgress = progress % 1;

    stroke(253, 254, 2); // Neon color for the path
    strokeWeight(5);
    noFill();

    // Always draw completed segments
    beginShape();
    for (let i = 0; i < min(currentSegment, 6); i++) {
        vertex(midpoints[i].x, midpoints[i].y);
        vertex(vertices[(i + 1) % 6].x, vertices[(i + 1) % 6].y);
        vertex(midpoints[(i + 1) % 6].x, midpoints[(i + 1) % 6].y);
    }
    endShape();

    // Draw completed inner lines
    beginShape();
    for (let i = 0; i < min(currentSegment - 6, 12); i++) {
        let line = innerLines[i];
        vertex(line[0].x, line[0].y);
        vertex(line[1].x, line[1].y);
    }
    endShape();

    // Draw completed extended lines
    beginShape();
    for (let i = 0; i < min(currentSegment - 18, 12); i++) {
        let line = extendedLines[i];
        vertex(line[0].x, line[0].y);
        vertex(line[1].x, line[1].y);
    }
    endShape();

    // Draw current segment
    if (currentSegment < 6) {
        let start = midpoints[currentSegment];
        let middle = vertices[(currentSegment + 1) % 6];
        let end = midpoints[(currentSegment + 1) % 6];
        if (segmentProgress < 0.5) {
            drawPartialLine(start, middle, segmentProgress * 2);
        } else {
            drawLine(start, middle);
            drawPartialLine(middle, end, (segmentProgress - 0.5) * 2);
        }
    } else if (currentSegment < 18) {
        let line = innerLines[currentSegment - 6];
        drawPartialLine(line[0], line[1], segmentProgress);
    } else if (currentSegment < 30) {
        let line = extendedLines[currentSegment - 18];
        drawPartialLine(line[0], line[1], segmentProgress);
    }
}

function drawLine(start, end) {
    line(start.x, start.y, end.x, end.y);
}

function drawPartialLine(start, end, progress) {
    let point = p5.Vector.lerp(start, end, progress);
    line(start.x, start.y, point.x, point.y);
}

function drawVerticesAndMidpoints() {
    for (let v of vertices) {
        ellipse(v.x, v.y, 10, 10); // Draw vertex
    }
    for (let m of midpoints) {
        ellipse(m.x, m.y, 10, 10); // Draw midpoint
    }
    for (let i of innerIntersections) {
        ellipse(i.x, i.y, 10, 10); // Draw intersection point
    }
}

function drawInnerLines() {
    for (let innerLine of innerLines) {
        line(innerLine[0].x, innerLine[0].y, innerLine[1].x, innerLine[1].y);
    }
}

function drawExtendedLines() {
    for (let extendedLine of extendedLines) {
        line(extendedLine[0].x, extendedLine[0].y, extendedLine[1].x, extendedLine[1].y);
    }
}

function drawCenterNode() {
    fill(255);
    ellipse(centerNode.x, centerNode.y, 10, 10); // Draw the center node
}

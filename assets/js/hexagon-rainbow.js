let hexSize = 250;
let progress = 0;
let vertices = [];
let midpoints = [];
let innerLines = [];
let innerIntersections = [];
let extendedLines = [];
let centerNode;

function setup() {
    let canvas = createCanvas(650, 650);
    canvas.parent('hexRainbow');
    strokeWeight(2);
    calculatePoints();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    // Draw the outer hexagon
    stroke(255);
    noFill();
    drawHexagon();

    // Draw inner lines
    stroke(255); // color for the inner lines
    drawInnerLines();

    // Draw extended lines
    stroke(255); // color for the extended lines
    drawExtendedLines();
    
    // Draw the tracing path in RGB Rainbow
    drawTracingPath();

    // Draw vertices, midpoints, intersections, and extended lines
    stroke(255); // Set stroke color to white for the ellipses
    fill(255);  // Set fill color to white for the ellipses
    drawVerticesAndMidpoints();

    // Draw the center node
    drawCenterNode();

    // Update progress
    progress += 0.001; // Adjust speed as needed
    progress %= 1; // Ensure smooth looping
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
    let totalLength = calculateTotalLength();
    let currentLength = progress * totalLength;

    colorMode(HSB, 360, 100, 100);
    strokeWeight(5);
    noFill();

    let drawnLength = 0;
    let segmentStart = 0;

    // Outer hexagon
    for (let i = 0; i < 6; i++) {
        let start = midpoints[i];
        let middle = vertices[(i + 1) % 6];
        let end = midpoints[(i + 1) % 6];
        
        let len1 = p5.Vector.dist(start, middle);
        let len2 = p5.Vector.dist(middle, end);
        
        drawGradientLine(start, middle, segmentStart, len1 / totalLength);
        drawGradientLine(middle, end, segmentStart + len1 / totalLength, len2 / totalLength);
        
        drawnLength += len1 + len2;
        segmentStart += (len1 + len2) / totalLength;
    }

    // Inner lines
    for (let line of innerLines) {
        let start = line[0];
        let end = line[1];
        let len = p5.Vector.dist(start, end);
        drawGradientLine(start, end, segmentStart, len / totalLength);
        drawnLength += len;
        segmentStart += len / totalLength;
    }

    // Extended lines
    for (let line of extendedLines) {
        let start = line[0];
        let end = line[1];
        let len = p5.Vector.dist(start, end);
        drawGradientLine(start, end, segmentStart, len / totalLength);
        drawnLength += len;
        segmentStart += len / totalLength;
    }

    colorMode(RGB);
}

function drawGradientLine(start, end, gradientStart, gradientLength) {
    let steps = 50; // Increase for smoother gradient
    for (let i = 0; i < steps; i++) {
        let t1 = i / steps;
        let t2 = (i + 1) / steps;
        let p1 = p5.Vector.lerp(start, end, t1);
        let p2 = p5.Vector.lerp(start, end, t2);
        let hue1 = (gradientStart + t1 * gradientLength + progress * 5) * 720 % 360; // More color cycles
        let hue2 = (gradientStart + t2 * gradientLength + progress * 5) * 720 % 360;
        stroke(hue1, 100, 100);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}

function calculateTotalLength() {
    let total = 0;
    for (let i = 0; i < 6; i++) {
        total += p5.Vector.dist(midpoints[i], vertices[(i + 1) % 6]);
        total += p5.Vector.dist(vertices[(i + 1) % 6], midpoints[(i + 1) % 6]);
    }
    for (let line of innerLines) {
        total += p5.Vector.dist(line[0], line[1]);
    }
    for (let line of extendedLines) {
        total += p5.Vector.dist(line[0], line[1]);
    }
    return total;
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
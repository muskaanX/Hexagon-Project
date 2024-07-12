let hexSize = 340;
let progress = 0;
let vertices = [];
let midpoints = [];
let innerLines = [];
let innerIntersections = [];
let extendedLines = [];
let centerNode;
let allPaths = [];
let totalLength = 0;

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent('hexFadeOut');
    strokeWeight(5);
    calculatePoints();
    createPaths();
    totalLength = calculateTotalLength();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    drawStaticElements();
    drawAnimatedElements();
    drawNodes();

    progress += 0.001;
    if (progress > 1) progress -= 1;
}

function calculatePoints() {
    vertices = [];
    midpoints = [];
    innerLines = [];
    innerIntersections = [];
    extendedLines = [];

    centerNode = createVector(0, 0);

    for (let i = 0; i < 6; i++) {
        let angle = PI / 2 + i * TWO_PI / 6;
        let x = cos(angle) * hexSize;
        let y = sin(angle) * hexSize;
        vertices.push(createVector(x, y));

        let nextAngle = PI / 2 + ((i + 1) % 6) * TWO_PI / 6;
        let nextX = cos(nextAngle) * hexSize;
        let nextY = sin(nextAngle) * hexSize;
        let midX = (x + nextX) / 2;
        let midY = (y + nextY) / 2;
        midpoints.push(createVector(midX, midY));

        let lineLength = hexSize / 2;
        let angle1 = angle + PI;
        let angle2 = angle + 4 * PI / 3;
        let endPoint1 = createVector(midX + cos(angle1) * lineLength, midY + sin(angle1) * lineLength);
        let endPoint2 = createVector(midX + cos(angle2) * lineLength, midY + sin(angle2) * lineLength);
        innerLines.push([endPoint1, createVector(midX, midY)]);
        innerLines.push([endPoint2, createVector(midX, midY)]);

        innerIntersections.push(endPoint1);
        innerIntersections.push(endPoint2);
    }

    for (let intersection of innerIntersections) {
        extendedLines.push([centerNode, intersection]);
    }
}

function createPaths() {
    allPaths = [];
    for (let i = 0; i < 6; i++) {
        let path1 = [];
        let path2 = [];
        path1.push(centerNode);
        path2.push(centerNode);
        path1.push(innerIntersections[i*2]);
        path2.push(innerIntersections[i*2+1]);
        path1.push(midpoints[i]);
        path2.push(midpoints[i]);
        path1.push(vertices[i]);
        path2.push(vertices[(i+1)%6]);
        allPaths.push(path1);
        allPaths.push(path2);
    }
}

function drawStaticElements() {
    stroke(255);
    noFill();
    drawHexagon();
    drawInnerLines();
    drawExtendedLines();
}

function drawAnimatedElements() {
    colorMode(HSB, 360, 100, 100);
    
    for (let path of allPaths) {
        drawGradientPath(path);
    }
}

function drawGradientPath(path) {
    let totalPathLength = calculatePathLength(path);
    let currentLength = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        let start = path[i];
        let end = path[i+1];
        let segmentLength = p5.Vector.dist(start, end);
        let gradientStart = currentLength / totalPathLength;
        let gradientLength = segmentLength / totalPathLength;
        drawGradientLine(start, end, gradientStart, gradientLength);
        currentLength += segmentLength;
    }
}

function drawGradientLine(start, end, gradientStart, gradientLength) {
    let steps = 50;
    for (let i = 0; i < steps; i++) {
        let t1 = i / steps;
        let t2 = (i + 1) / steps;
        let p1 = p5.Vector.lerp(start, end, t1);
        let p2 = p5.Vector.lerp(start, end, t2);
        let hue1 = calculateHue(gradientStart + t1 * gradientLength - progress);
        let hue2 = calculateHue(gradientStart + t2 * gradientLength - progress);
        stroke(hue1, 100, 100);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}

function calculateHue(value) {
    // Ensure value is between 0 and 1
    value = value - Math.floor(value);
    // Map 0-1 to 0-360 for hue, but reverse the direction
    return 360 - (value * 360);
}

function calculatePathLength(path) {
    let length = 0;
    for (let i = 0; i < path.length - 1; i++) {
        length += p5.Vector.dist(path[i], path[i+1]);
    }
    return length;
}

function calculateTotalLength() {
    return allPaths.reduce((total, path) => total + calculatePathLength(path), 0);
}

function drawHexagon() {
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);
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

function drawNodes() {
    stroke(255);
    fill(255);
    for (let v of vertices) {
        ellipse(v.x, v.y, 10, 10);
    }
    for (let m of midpoints) {
        ellipse(m.x, m.y, 10, 10);
    }
    for (let i of innerIntersections) {
        ellipse(i.x, i.y, 10, 10);
    }
    ellipse(centerNode.x, centerNode.y, 10, 10);
}
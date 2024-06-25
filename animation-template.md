---
layout: default
title: Animation
nav_order: 7
---

## Hexagon Animations

<button id="start-dfs">Start DFS</button>
<button id="start-bfs">Start BFS</button>
<button id="breathe">Breathe In and Out</button>
<button id="spirals">End to End Spirals</button>

<svg id="hexagon-animation" width="600" height="600" style="border:1px solid black;"></svg>

<script src="https://d3js.org/d3.v6.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Select the SVG element
    const svg = d3.select("#hexagon-animation");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Define the hexagon coordinates and paths
    const hexagonData = {
      nodes: [
        { x: width / 2, y: height / 4 },   // Top node
        { x: width / 4, y: height / 2 },   // Left node
        { x: 3 * width / 4, y: height / 2 }, // Right node
        { x: width / 2, y: 3 * height / 4 }  // Bottom node
      ],
      paths: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 1, target: 3 },
        { source: 2, target: 3 },
        { source: 1, target: 2 },
        { source: 0, target: 3 }
      ]
    };

    // Draw the hexagon
    const links = svg.selectAll("line")
      .data(hexagonData.paths)
      .enter().append("line")
      .attr("x1", d => hexagonData.nodes[d.source].x)
      .attr("y1", d => hexagonData.nodes[d.source].y)
      .attr("x2", d => hexagonData.nodes[d.target].x)
      .attr("y2", d => hexagonData.nodes[d.target].y)
      .attr("stroke", "black");

    const nodes = svg.selectAll("circle")
      .data(hexagonData.nodes)
      .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 10)
      .attr("fill", "red");

    // Define animations
    function depthFirstSearch(startNode) {
      // Implement DFS animation
    }

    function breadthFirstSearch(startNode) {
      // Implement BFS animation
    }

    function breatheInOut() {
      // Implement breathing animation
    }

    function endToEndSpirals() {
      // Implement spirals animation
    }

    // Add event listeners for animation controls
    document.getElementById("start-dfs").addEventListener("click", () => depthFirstSearch(0));
    document.getElementById("start-bfs").addEventListener("click", () => breadthFirstSearch(0));
    document.getElementById("breathe").addEventListener("click", breatheInOut);
    document.getElementById("spirals").addEventListener("click", endToEndSpirals);
  });
</script>
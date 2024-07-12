---
layout: default
title: Simulation
nav_order: 7
---

# Hexagon Simulation
<br>
<p>In order to display the various patterns on the hexagon structure, a digital simulation is being made use of to allow the user to simply create a configuration on their system and uploading the same. The visualisation is a programmable grid with various pixels mapped out to form the diagram of the hexagon, with the default view displaying a clear white version of the whole structure.</p>
<p>The pixels in white in the default version are reprogrammed to represent different colors by uploading configurations containing varied hexcodes to demonstrate specific patterns. Once this is uploaded, the middleware processes the same to send instructions to the hardware to display the same.</p>

<div id="hexAnimation"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
<script src="./assets/js/hexagon-animation.js"></script>
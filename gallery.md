---
layout: page
title: Gallery
nav_order: 7
---

# Project Gallery
<br>
This section will comprise of various photographs of the model designed, providing a clear view of what the end product looks like.
<br>
<!-- Include Magnific Popup CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css">

<div class="video-grid">
  <div class="grid-item buzz">
    <a class="popup-video" href="#video-buzz">
      <video src="./assets/videos/buzz.mp4" autoplay muted loop></video>
    </a>
    <div id="video-buzz" class="mfp-hide">
      <video src="./assets/videos/buzz.mp4" controls style="width:100%; height:auto;"></video>
    </div>
  </div>
  <div class="grid-item french">
    <a class="popup-video" href="#video-french">
      <video src="./assets/videos/french_salute.mp4" autoplay muted loop></video>
    </a>
    <div id="video-french" class="mfp-hide">
      <video src="./assets/videos/french_salute.mp4" controls style="width:100%; height:auto;"></video>
    </div>
  </div>
  <div class="grid-item genshin">
    <a class="popup-video" href="#video-genshin">
      <video src="./assets/videos/genshin_theme.mp4" autoplay muted loop></video>
    </a>
    <div id="video-genshin" class="mfp-hide">
      <video src="./assets/videos/genshin_theme.mp4" controls style="width:100%; height:auto;"></video>
    </div>
  </div>
  <div class="grid-item white">
    <a class="popup-video" href="#video-white">
      <video src="./assets/videos/white_rgb_hue.mp4" autoplay muted loop></video>
    </a>
    <div id="video-white" class="mfp-hide">
      <video src="./assets/videos/white_rgb_hue.mp4" controls style="width:100%; height:auto;"></video>
    </div>
  </div>
  <div class="grid-item quick">
    <a class="popup-video" href="#video-quick">
      <video src="./assets/videos/quick_ants.mp4" autoplay muted loop></video>
    </a>
    <div id="video-quick" class="mfp-hide">
      <video src="./assets/videos/quick_ants.mp4" controls style="width:100%; height:auto;"></video>
    </div>
  </div>
  <div class="grid-item grid-item--width2 grid-item--height2 unison">
    <a class="popup-video" href="#video-unison">
      <video src="./assets/videos/unison.mp4" autoplay muted loop></video>
    </a>
    <div id="video-unison" class="mfp-hide">
      <video src="./assets/videos/unison.mp4" controls style="width:100%; height:auto;"></video>
    </div>
  </div>
</div>

<!-- Include jQuery and Magnific Popup JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>

<script>
  $(document).ready(function() {
      $('.popup-video').magnificPopup({
          type: 'inline',
          mainClass: 'mfp-fade',
          preloader: true,
          removalDelay: 300,
          fixedContentPos: false
      });
  });
</script>

<style>
body {
  font-family: sans-serif;
  position: relative;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  grid-gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-item {
  background-color: #000;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
}

.buzz {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

.french {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}

.genshin {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}

.white {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
}

.quick {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
}

.unison {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 5;
}

.grid-item--width2 {
  grid-column: span 2;
}

.grid-item--height2 {
  grid-row: span 2;
}

.grid-item video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mfp-hide {
  display: none;
}
</style>
---
title: 'Bedsprings'
tag: 'art'
labels: ['Generative art', 'Processing']
excerpt: 'Experimentation with Processing JS to develop noise-based line grids. The noise is affecting the the amplitude of each line, as well as the rotation of the grid.'
coverImage: '/assets/art/art-bedsprings_1.jpg'
artist: 'Common Origin'
date: '2025-02-05T05:35:07.322Z'
author:
  name: 'Ollie'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/art/art-bedsprings_1.jpg'
---

![Experiments with noise to create line grids which bend and rotate](/assets/art/art-bedsprings_2.jpg "Experiments with noise to create line grids which bend and rotate")
![Experiments with noise to create line grids which bend and rotate](/assets/art/art-bedsprings_3.jpg "Experiments with noise to create line grids which bend and rotate")
![Experiments with noise to create line grids which bend and rotate](/assets/art/art-bedsprings_4.jpg "Experiments with noise to create line grids which bend and rotate")
![Experiments with noise to create line grids which bend and rotate](/assets/art/art-bedsprings_5.jpg "Experiments with noise to create line grids which bend and rotate")
![Experiments with noise to create line grids which bend and rotate](/assets/art/art-bedsprings_6.jpg "Experiments with noise to create line grids which bend and rotate")

## Example code
```javascript
let time = 0; // Add this line at the top of your code
let amplitude;
let frequency;

function setup() {
  createCanvas(1920, 1920, WEBGL);
  background(0);
  amplitude = random(10, 30); // Change 50 and 150 to adjust the range of the amplitude
  frequency = random(0.025, 0.06); // Change 0.005 and 0.015 to adjust the range of the frequency
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  let rowHeight = random(2,20); // Adjust this value to make the rows smaller
  let inset = 100; // Adjust this value to increase the view area
  rotateX(PI / 4); // Add this line to rotate the canvas in 3D
  rotateY(PI / 4); // Add this line to rotate the canvas in 3D
  for (let rowY = -height / 2 + inset; rowY <= height / 2 - inset; rowY += rowHeight) {
    strokeWeight(2);
    let colorValue = map(rowY, -height / 2 + inset, height / 2 - inset, 0, 255); // Map rowY to a range of 0 to 255
    stroke(colorValue, colorValue, colorValue); // Set the color
    beginShape();
    for (let x = -width / 2 + inset; x <= width / 2 - inset; x++) {
      let y = sin(x * frequency) * (amplitude + rowY * 0.01); // Change 0.1 to adjust the rate of increase
      vertex(x, y + rowY);
    }
    endShape();
    rotateX(PI / 4); // Add this line to rotate the canvas in 3D
    rotateY(PI / 4); // Add this line to rotate the canvas in 3D
  }
  for (let rowY = -height / 2 + inset; rowY <= height / 2 - inset; rowY += rowHeight) {
    strokeWeight(1);
    let colorValue = map(rowY, -height / 2 + inset, height / 2 - inset, 0, 255); // Map rowY to a range of 0 to 255
    stroke(colorValue, colorValue, colorValue); // Set the color
    beginShape();
    for (let x = -width / 2 + inset; x <= width / 2 - inset; x++) {
      let y = sin(x * frequency) * (amplitude + rowY * 0.5); // Change 0.1 to adjust the rate of increase
      vertex(x, y + rowY);
    }
    endShape();
    rotateX(PI / 4); // Add this line to rotate the canvas in 3D
    rotateY(PI / 4); // Add this line to rotate the canvas in 3D
  }
  // Draw the inverse mask
  // Draw the inverse mask
  // fill(0); // Set the color of the mask
  noStroke(); // Remove the stroke
  let maskSize = width / 1.75; // Define the size of the mask
  rect(-width / 2, -height / 2, width, (height - maskSize) / 2); // Draw the top part of the mask
  rect(-width / 2, height / 2 - (height - maskSize) / 2, width, (height - maskSize) / 2); // Draw the bottom part of the mask
  rect(-width / 2, -height / 2 + (height - maskSize) / 2, (width - maskSize) / 2, maskSize); // Draw the left part of the mask
  rect(width / 2 - (width - maskSize) / 2, -height / 2 + (height - maskSize) / 2, (width - maskSize) / 2, maskSize); // Draw the right part of the mask
  noLoop();
}
```
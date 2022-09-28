//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.

import { Runner } from "./graphics/runner";

//
(function entry() {
  // start running assignment.

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  new Runner(document.getElementById("root") as HTMLDivElement, {
    fov: 75,
    screenDimension: { width: screenWidth, height: screenHeight },
    aspectRatio: screenWidth / screenHeight,
    nearFar: { near: 0.1, far: 400 }
  }).init();
})();

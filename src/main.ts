//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.
//

import { MeshLambertMaterial, SphereGeometry } from "three";
import { Camera } from "./graphics/camera";
import { Runner } from "./graphics/runner";
import { Sun, Earth, Moon } from "./object";

(function entry() {
  // start running assignment.

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  new Runner(
    document.getElementById("root") as HTMLDivElement,
    Camera.Builder.setPerspectiveCameraData({
      fov: 75,
      screenDimension: { width: screenWidth, height: screenHeight },
      nearFar: { near: 0.1, far: 400 }
    }).build()
  )
    .initWithAdditionalArguments({})
    .add(
      new Sun().addablify(
        new SphereGeometry(1, 1, 1),
        new MeshLambertMaterial({ color: 0xff0000 })
      ),
      new Earth().addablify(
        new SphereGeometry(1, 1, 1),
        new MeshLambertMaterial({ color: 0xff0000 })
      ),
      new Moon().addablify(
        new SphereGeometry(1, 1, 1),
        new MeshLambertMaterial({ color: 0xff0000 })
      )
    );
})();

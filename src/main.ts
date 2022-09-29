//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.
//

import "resetcss/reset.min.css";

import { MeshStandardMaterial } from "three";
import { Camera } from "./lib/camera";
import { Runner } from "./playground/runner/runner";
import { Sun, Earth, Moon } from "./playground/entity";
import { checkWebGLCompatibility } from "./lib/util/WebGLCompatibilityCheck";
import { SUN_EMISSIVE_COLOR, SUN_EMISSIVE_INTENSITY } from "./playground/const";
import { loadResourcesAsync } from "./loadResources";

(async function entry() {
  if (!checkWebGLCompatibility()) {
    return;
  }

  // start running assignment.
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const {
    sunGeometry,
    sunEmissiveTexture,
    earthGeometry,
    earthDiffuseTexture,
    earthNormalTexture,
    moonGeometry,
    moonDiffuseTexture,
    skyboxTexture1
  } = await loadResourcesAsync();

  // start a scene and simulate the solar system.
  new Runner(
    Camera.Builder.setPerspectiveCameraData({
      fov: 75,
      screenDimension: { width: screenWidth, height: screenHeight },
      nearFar: { near: 0.1, far: 5000 }
    }).build()
  )
    .setSkybox(skyboxTexture1)
    .setEntities(
      new Sun(
        sunGeometry,
        new MeshStandardMaterial({
          emissive: SUN_EMISSIVE_COLOR,
          emissiveIntensity: SUN_EMISSIVE_INTENSITY,
          emissiveMap: sunEmissiveTexture
        })
      ),
      new Earth(
        earthGeometry,
        new MeshStandardMaterial({
          map: earthDiffuseTexture,
          normalMap: earthNormalTexture
        })
      ),
      new Moon(moonGeometry, new MeshStandardMaterial({ map: moonDiffuseTexture }))
    )
    // .enableAxesHelper()
    .enableDebugGUI()
    .enableOrbitControls()
    .start()
    .run();
})();

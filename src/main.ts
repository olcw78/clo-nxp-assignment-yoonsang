//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.
//

import { MeshBasicMaterial, SphereGeometry } from "three";
import { Camera } from "./lib/camera";
import { Runner } from "./playground/runner";
import { Sun, Earth, Moon } from "./playground/entity";
import { WebGLCompatibilityCheck } from "./lib/util/WebGLCompatibilityCheck";
import { MeshBuilder } from "./lib/object/MeshBuilder";

(async function entry() {
  if (!WebGLCompatibilityCheck.isWebGLAvailable()) {
    document.body.appendChild(WebGLCompatibilityCheck.getWebGLErrorMessage());
    return;
  }

  if (!WebGLCompatibilityCheck.isWebGL2Available()) {
    document.body.appendChild(WebGLCompatibilityCheck.getWebGL2ErrorMessage());
    return;
  }

  // start running assignment.
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  MeshBuilder.init();

  const sunInitializerObject = await MeshBuilder.build("asset/sun/geometry.drc", [
    "asset/sun/diffuse.png"
  ]);

  const earthInitializerObject = await MeshBuilder.build(
    "asset/earth/geometry.drc",
    ["asset/earth/diffuse.png", "asset/earth/normal.png"]
  );

  const moonInitializerObject = await MeshBuilder.build("asset/moon/geometry.drc", [
    "asset/moon/diffuse.png"
  ]);

  new Runner(
    Camera.Builder.setPerspectiveCameraData({
      fov: 75,
      screenDimension: { width: screenWidth, height: screenHeight },
      nearFar: { near: 0.1, far: 400 }
    }).build()
  )
    .setEntities(
      new Sun(
        sunInitializerObject.loadedGeometry,
        sunInitializerObject.loadedMaterials
      ), // new SphereGeometry(0.1), new MeshBasicMaterial({ color: 0xff0000 })
      new Earth(
        earthInitializerObject.loadedGeometry,
        earthInitializerObject.loadedMaterials
      ),
      new Moon(
        moonInitializerObject.loadedGeometry,
        moonInitializerObject.loadedMaterials
      )
    )
    .start()
    .run();
})();

//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.
//

import {
  Color,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader
} from "three";
import { Camera } from "./lib/camera";
import { FluentRunner } from "./playground/fluent-runner";
import { Sun, Earth, Moon } from "./playground/entity";
import { checkWebGLCompatibility } from "./lib/util/WebGLCompatibilityCheck";
import { ResourcesLoader } from "./lib/object/ResourcesLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { SUN_EMISSIVE_COLOR } from "./playground/const";

(async function entry() {
  if (!checkWebGLCompatibility()) return;

  // start running assignment.
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // load all the required resources.
  ResourcesLoader.init();

  const { geometry: sunGeometry, emissiveTexture: sunEmissiveTexture } =
    await ResourcesLoader.LoadSunResources(
      "asset/sun/geometry.drc",
      "asset/sun/diffuse.png"
    );

  const {
    geometry: earthGeometry,
    diffuseTexture: earthDiffuseTexture,
    normalTexture: earthNormalTexture
  } = await ResourcesLoader.LoadEarthResources(
    "asset/earth/geometry.drc",
    "asset/earth/diffuse.png",
    "asset/earth/normal.png"
  );

  const { geometry: moonGeometry, diffuseTexture: moonDiffuseTexture } =
    await ResourcesLoader.LoadMoonResources(
      "asset/moon/geometry.drc",
      "asset/moon/diffuse.png"
    );

  // start a scene and simulate the solar system.
  new FluentRunner(
    Camera.Builder.setPerspectiveCameraData({
      fov: 75,
      screenDimension: { width: screenWidth, height: screenHeight },
      nearFar: { near: 0.1, far: 5000 }
    }).build()
  )
    .setEntities(
      new Sun(
        sunGeometry,
        new MeshStandardMaterial({
          emissive: SUN_EMISSIVE_COLOR,
          emissiveIntensity: 1.5,
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
    .enableOrbitControls()
    .start()
    .run();
})();

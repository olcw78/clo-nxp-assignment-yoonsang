//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.
//

import {
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  SphereGeometry,
  TextureLoader
} from "three";
import { Camera } from "./lib/camera";
import { Runner } from "./playground/runner";
import { Sun, Earth, Moon } from "./playground/entity";
import { WebGLCompatibilityCheck } from "./lib/util/WebGLCompatibilityCheck";
import { ResourcesLoader } from "./lib/object/ResourcesLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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

  ResourcesLoader.init();

  // const { geometry: sunGeometry, materials: sunMaterials } = await ResourcesLoader.build(
  //   "asset/sun/geometry.drc",
  //   ["asset/sun/diffuse.png"]
  // );

  // const { geometry: earthGeometry, materials: earthMaterials } =
  //   await ResourcesLoader.build("asset/earth/geometry.drc", [
  //     "asset/earth/diffuse.png",
  //     "asset/earth/normal.png"
  //   ]);

  // const { geometry: moonGeometry, materials: moonMaterials } =
  //   await ResourcesLoader.build("asset/moon/geometry.drc", ["asset/moon/diffuse.png"]);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderConfig({ type: "js" });
  dracoLoader.setDecoderPath("/js/libs/draco/");
  // dracoLoader.setDecoderPath(
  //   "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
  // );
  dracoLoader.preload();
  const textureLoader = new TextureLoader();

  const earthGeometry = await dracoLoader.loadAsync("asset/earth/geometry.drc");
  const earthDiffuseTex = await textureLoader.loadAsync("asset/earth/diffuse.png");
  const earthNormalTex = await textureLoader.loadAsync("asset/earth/normal.png");

  const sunGeometry = await dracoLoader.loadAsync("asset/sun/geometry.drc");
  const sunDiffuseTex = await textureLoader.loadAsync("asset/sun/diffuse.png");

  const moonGeometry = await dracoLoader.loadAsync("asset/moon/geometry.drc");
  const moonDiffuseTex = await textureLoader.loadAsync("asset/moon/diffuse.png");

  new Runner(
    Camera.Builder.setPerspectiveCameraData({
      fov: 75,
      screenDimension: { width: screenWidth, height: screenHeight },
      nearFar: { near: 0.1, far: 100000 }
    }).build()
  )
    .setEntities(
      new Sun(sunGeometry, new MeshLambertMaterial({ map: sunDiffuseTex })),
      new Earth(
        earthGeometry,
        new MeshLambertMaterial({ map: earthDiffuseTex, normalMap: earthNormalTex })
      ),
      new Moon(moonGeometry, new MeshLambertMaterial({ map: moonDiffuseTex }))
    )
    .start()
    .run();
})();

import { MeshStandardMaterial } from "three";
import { Camera } from "../lib/camera";
import { Runner } from "./runner/runner";
import { Sun, Earth, Moon } from "./entity";
import { SUN_EMISSIVE_COLOR, SUN_EMISSIVE_INTENSITY } from "./const";
import { loadResourcesAsync } from "./loadResources";

export async function run() {
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
      screenDimension: { width: window.innerWidth, height: window.innerHeight },
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
    .effect.select.unrealBloomEffect()
    .finishSelect()
    .mod.enableDebugGUI()
    .mod.enableOrbitControls()
    .mod.enableRenderFrameDebugDisplay()
    // .mod.enableAxesHelper()
    .start()
    .run();
}

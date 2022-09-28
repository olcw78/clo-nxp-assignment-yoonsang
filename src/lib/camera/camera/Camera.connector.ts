import { Scene, Camera as ThreeCamera } from "three";

export class CameraConnector {
  public static connect(scene: Scene, camera: ThreeCamera) {
    scene.add(camera);
  }
}

import {
  Camera as ThreeCamera,
  PerspectiveCamera as ThreePerspectiveCamera,
  OrthographicCamera as ThreeOrthographicCamera
} from "three";
import { ICameraData } from "./camera data/CameraData.interface";

export class CameraBuildable<CameraDataT extends ICameraData> {
  public constructor(private readonly _cameraData: CameraDataT) {}

  public build(): ThreeCamera {
    switch (this._cameraData.implementedType) {
      case "orthographicCamera":
        return new ThreeOrthographicCamera();

      case "perspectiveCamera":
        return new ThreePerspectiveCamera();
    }
  }
}

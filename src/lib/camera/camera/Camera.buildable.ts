import {
  Camera as ThreeCamera,
  PerspectiveCamera as ThreePerspectiveCamera,
  OrthographicCamera as ThreeOrthographicCamera
} from "three";
import { ICameraData } from "./Camera.interface";

export class CameraBuildable<CameraDataT extends ICameraData> {
  public constructor(private readonly _cameraData: CameraDataT) {}

  public build() {
    switch (this._cameraData.implementedType) {
      case "orthographicCamera":
        return {
          camera: new ThreeOrthographicCamera(),
          cameraData: this._cameraData
        };

      case "perspectiveCamera":
        return {
          camera: new ThreePerspectiveCamera(),
          cameraData: this._cameraData
        };
    }
  }
}

import {
  PerspectiveCamera as ThreePerspectiveCamera,
  OrthographicCamera as ThreeOrthographicCamera
} from "three";
import { ICameraData } from "./Camera.interface";
import { PerspectiveCameraData } from "../perspective/PerspectiveCamera.data";
import { OrthographicCameraData } from "../orthographic/OrthographicCamera.data";

export class CameraBuildable<CameraDataT extends ICameraData> {
  public constructor(private readonly _cameraData: Required<CameraDataT>) {}

  public build() {
    const { nearFar } = this._cameraData;

    switch (this._cameraData.implementedType) {
      case "orthographicCamera":
        const { cameraFrustumDimensions } = this
          ._cameraData as OrthographicCameraData;
        return {
          camera: new ThreeOrthographicCamera(
            cameraFrustumDimensions!.left,
            cameraFrustumDimensions!.right,
            cameraFrustumDimensions!.top,
            cameraFrustumDimensions!.bottom,
            nearFar!.near,
            nearFar!.far
          ),
          cameraData: this._cameraData
        };

      case "perspectiveCamera":
        const { fov, screenDimension } = this._cameraData as PerspectiveCameraData;
        return {
          camera: new ThreePerspectiveCamera(
            fov!,
            screenDimension?.width! / screenDimension?.height!,
            nearFar?.near!,
            nearFar?.far!
          ),
          cameraData: this._cameraData
        };
    }
    return undefined;
  }
}

import { ICameraData } from "../camera/Camera.interface";

export interface OrthographicCameraData extends ICameraData {
  cameraFrustumDimensions?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

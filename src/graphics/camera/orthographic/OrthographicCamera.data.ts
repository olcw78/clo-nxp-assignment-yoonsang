import { ICameraData } from "../camera data/CameraData.interface";

export interface OrthographicCameraData extends ICameraData {
  cameraFrustumDimensions?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

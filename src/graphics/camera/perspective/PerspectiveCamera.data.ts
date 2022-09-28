import { ICameraData } from "../camera data/CameraData.interface";

export interface PerspectiveCameraData extends ICameraData {
  fov?: number;
  screenDimension?: { width: number; height: number };
  aspectRatio?: number;
}

export type TPickedPerspectiveCameraData = Pick<
  PerspectiveCameraData & ICameraData,
  "fov" | "screenDimension" | "nearFar"
>;

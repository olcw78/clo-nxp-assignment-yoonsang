export type CameraActualType = "orthographicCamera" | "perspectiveCamera";

export interface ICameraData {
  nearFar?: { near: number; far: number };
  implementedType: CameraActualType;
}

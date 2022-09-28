import { CameraBuilder } from "./Camera.builder";

export class Camera {
  private constructor() {} /** delete ctor */
  public static Builder = CameraBuilder;
}

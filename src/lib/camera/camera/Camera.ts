import { CameraBuilder } from "./Camera.builder";

export class Camera {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {} /** delete ctor */
  public static Builder = CameraBuilder;
}

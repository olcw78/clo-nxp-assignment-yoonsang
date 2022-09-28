import { CameraBuilder } from "./Camera.builder";
import { CameraConnector } from "./Camera.connector";

export class Camera {
  private constructor() {} /** delete ctor */
  public static Builder = CameraBuilder;
  public static Connect = CameraConnector;
}

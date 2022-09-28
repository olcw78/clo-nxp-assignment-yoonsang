import { CameraBuilder } from "./Camera.builder";
import { CameraConnector } from "./Camera.connector";

export class Camera {
  public static Builder = CameraBuilder;
  public static Connect = CameraConnector;
}

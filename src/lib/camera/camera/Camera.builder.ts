import { CameraBuildable as CameraBuildable } from "./Camera.buildable";
import { OrthographicCameraData } from "../orthographic/OrthographicCamera.data";
import {
  PerspectiveCameraData,
  TPickedPerspectiveCameraData
} from "../perspective/PerspectiveCamera.data";

export class CameraBuilder {
  public static setPerspectiveCameraData(
    data: TPickedPerspectiveCameraData
  ): CameraBuildable<Required<PerspectiveCameraData>> {
    const { screenDimension } = data;

    return new CameraBuildable({
      ...data,
      aspectRatio: (screenDimension?.width ?? 16) / (screenDimension?.height ?? 9),
      implementedType: "perspectiveCamera"
    } as Required<PerspectiveCameraData>);
  }

  public static setOrthographicCameraData(
    data: OrthographicCameraData
  ): CameraBuildable<Required<OrthographicCameraData>> {
    return new CameraBuildable({
      ...data,
      implementedType: "orthographicCamera"
    } as Required<OrthographicCameraData>);
  }
}

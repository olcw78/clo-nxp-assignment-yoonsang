import { CameraBuildable as CameraBuildable } from "../Camera.buildable";
import { OrthographicCameraData } from "../orthographic/OrthographicCamera.data";
import {
  PerspectiveCameraData,
  TPickedPerspectiveCameraData
} from "../perspective/PerspectiveCamera.data";

export class CameraDataBuilder {
  public static setPerspectiveCameraData(
    data: TPickedPerspectiveCameraData
  ): CameraBuildable<Required<PerspectiveCameraData>> {
    const { screenDimension } = data;

    return new CameraBuildable({
      ...data,
      aspectRatio: (screenDimension?.width ?? 16) / (screenDimension?.height ?? 9)
    } as Required<PerspectiveCameraData>);
  }

  public static setOrthographicCameraData(
    data: OrthographicCameraData
  ): CameraBuildable<Required<OrthographicCameraData>> {
    return new CameraBuildable({ ...data } as Required<OrthographicCameraData>);
  }
}

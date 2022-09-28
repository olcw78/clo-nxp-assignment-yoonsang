import { PerspectiveCamera } from "three";
import { PerspectiveCameraData } from "./PerspectiveCamera.data";

export class PerspectiveCameraHelper {
  private constructor() {} /** delete ctor */

  // #region default

  private static readonly _defaultFov = 75;
  private static readonly _defaultAspectRatio = 16 / 9;
  private static readonly _defaultScreenDimension = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  private static readonly _defaultNearFar = { near: 0.1, far: 300 };

  /**
   * make default perspective camera data.
   * @returns Required
   */
  private static defaultPerspectiveCameraData(): Required<PerspectiveCameraData> {
    return {
      fov: this._defaultFov,
      screenDimension: this._defaultScreenDimension,
      aspectRatio: this._defaultAspectRatio,
      nearFar: this._defaultNearFar
    };
  }

  /**
   * get default Perspective camera data.
   * @param  {PerspectiveCameraData} data? perspective camera 초기화에 쓰이는 temporary data.
   * @returns Required of TPerspectiveCameraData
   */
  public static getDataOrDefault(
    data?: PerspectiveCameraData
  ): Required<PerspectiveCameraData> {
    const {
      fov: defaultFov,
      screenDimension: defaultScreenDimension,
      aspectRatio: defaultAspectRatio,
      nearFar: defaultNearFar
    } = this.defaultPerspectiveCameraData();

    return {
      fov: data?.fov ?? defaultFov,
      screenDimension: data?.screenDimension ?? defaultScreenDimension,
      aspectRatio: data?.aspectRatio ?? defaultAspectRatio,
      nearFar: data?.nearFar ?? defaultNearFar
    } as Required<PerspectiveCameraData>;
  }

  // #endregion default

  /**
   * build a three perspective camera.
   * @param  {Required<PerspectiveCameraData>} _perspectiveCameraDataOverride
   * @returns PerspectiveCamera
   */
  public static build(
    _perspectiveCameraDataOverride: Required<PerspectiveCameraData>
  ): PerspectiveCamera {
    const {
      fov,
      aspectRatio,
      nearFar: { near, far }
    } = _perspectiveCameraDataOverride;

    return new PerspectiveCamera(fov, aspectRatio, near, far);
  }
}

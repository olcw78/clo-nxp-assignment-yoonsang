import { PerspectiveCamera } from "three";

export type TPerspectiveCameraData = {
  fov?: number;
  screenDimension?: { width: number; height: number };
  aspectRatio?: number;
  nearFar?: { near: number; far: number };
};

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

  public static defaultPerspectiveData(): Required<TPerspectiveCameraData> {
    return {
      fov: this._defaultFov,
      screenDimension: this._defaultScreenDimension,
      aspectRatio: this._defaultAspectRatio,
      nearFar: this._defaultNearFar
    };
  }

  /**
   * get default Perspective camera data.
   * @param  {TPerspectiveCameraData} data? perspective camera 초기화에 쓰이는 temporary data.
   * @returns Required of TPerspectiveCameraData
   */
  public static getDataOrDefault(
    data?: TPerspectiveCameraData
  ): Required<TPerspectiveCameraData> {
    const {
      fov: defaultFov,
      screenDimension: defaultScreenDimension,
      aspectRatio: defaultAspectRatio,
      nearFar: defaultNearFar
    } = this.defaultPerspectiveData();

    return {
      fov: data?.fov ?? defaultFov,
      screenDimension: data?.screenDimension ?? defaultScreenDimension,
      aspectRatio: data?.aspectRatio ?? defaultAspectRatio,
      nearFar: data?.nearFar ?? defaultNearFar
    } as Required<TPerspectiveCameraData>;
  }

  // #endregion default

  /**
   * build a three perspective camera.
   * @param  {TPerspectiveCameraData} _perspectiveCameraDataOverride?
   * @returns PerspectiveCamera
   */
  public static build(
    _perspectiveCameraDataOverride?: TPerspectiveCameraData
  ): PerspectiveCamera {
    const {
      fov,
      aspectRatio,
      nearFar: { near, far }
    } = this.getDataOrDefault(_perspectiveCameraDataOverride);

    return new PerspectiveCamera(fov, aspectRatio, near, far);
  }
}

import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {
  PerspectiveCameraHelper,
  type TPerspectiveCameraData
} from "../camera/PerspectiveCamera.data";

export class Runner {
  private readonly _scene: Scene;
  private readonly _camera: PerspectiveCamera;
  private readonly _renderer: WebGLRenderer;

  public constructor(
    private readonly _rootElement: HTMLElement,
    private readonly _perspectiveCameraData: TPerspectiveCameraData
  ) {
    // init three scene.
    this._scene = new Scene();
    this._camera = PerspectiveCameraHelper.build(_perspectiveCameraData);
    this._renderer = new WebGLRenderer();

    // attach dom canvas.
    _rootElement.appendChild(this._renderer.domElement);
  }

  public init(): Runner {
    // set renderer screen dimension.
    const { screenDimension } =
      this._perspectiveCameraData ??
      PerspectiveCameraHelper.defaultPerspectiveData();
    this._renderer.setSize(screenDimension!.width, screenDimension!.height);

    return this;
  }
}

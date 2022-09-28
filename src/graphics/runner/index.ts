import { SceneAddable } from "src/object/SceneAddable";
import { Camera as ThreeCamera, Scene, WebGLRenderer } from "three";

export class Runner {
  public constructor(
    private readonly _rootElement: HTMLElement,
    private readonly _camera: ThreeCamera
  ) {
    // init three scene.
    this._scene = new Scene();
    this._renderer = new WebGLRenderer();

    // attach dom canvas.
    _rootElement.appendChild(this._renderer.domElement);
  }

  // #region behaviour

  public init(): Runner {
    return this;
  }

  public initWithAdditionalArguments({}: any): Runner {
    // set renderer screen dimension.
    // this._renderer.setSize(this._camera.width, height);

    return this;
  }

  public add(...sceneAddableObjects: SceneAddable[]) {
    for (let obj of sceneAddableObjects) {
      obj.addToScene(this._scene);
    }
  }

  // public enableSceneHandle()

  // #endregion behaviour

  // #region data

  public get rootElement(): HTMLElement {
    return this._rootElement;
  }

  private readonly _scene: Scene;
  public get scene(): Scene {
    return this._scene;
  }

  public get camera(): ThreeCamera {
    return this._camera;
  }

  private readonly _renderer: WebGLRenderer;
  public get renderer(): WebGLRenderer {
    return this._renderer;
  }

  // #endregion data
}

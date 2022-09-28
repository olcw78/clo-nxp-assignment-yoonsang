import { ICameraData } from "src/lib/camera/camera/Camera.interface";
import { OrthographicCameraData } from "src/lib/camera/orthographic/OrthographicCamera.data";
import { PerspectiveCameraData } from "src/lib/camera/perspective/PerspectiveCamera.data";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { LifecycleManager } from "src/lib/object/lifecycle/LifecycleManager";
import { thisbind } from "src/shared/decorator/thisbind";
import { Camera as ThreeCamera, Scene, WebGLRenderer } from "three";
import { Entity } from "../../lib/object/entitiy";

export class Runner {
  // #region data
  private readonly _scene: Scene;
  private readonly _camera: ThreeCamera;
  private readonly _renderer: WebGLRenderer;

  private readonly _cameraData: ICameraData;
  public get cameraDataAsPerspective(): PerspectiveCameraData {
    return this._cameraData as PerspectiveCameraData;
  }
  public get cameraDataAsOrthographic(): OrthographicCameraData {
    return this._cameraData as OrthographicCameraData;
  }

  private readonly _lifecycleManager: LifecycleManager = new LifecycleManager();

  // #endregion data

  public constructor(cameraIntializer: {
    camera: ThreeCamera;
    cameraData: ICameraData;
  }) {
    // init three scene.
    this._scene = new Scene();

    // connect camera.
    const { camera, cameraData } = cameraIntializer;
    this._camera = camera;
    this._cameraData = cameraData;
    // Camera.Connect.connect(, this._camera);
    this._scene.add(this._camera);
    this._camera.position.z = 5;

    // set renderer.
    this._renderer = new WebGLRenderer();
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    // attach dom canvas.
    // _rootElement.body(this._renderer.domElement);
    document.body.appendChild(this._renderer.domElement);
  }

  // #region behaviour

  public start(): Runner {
    this._lifecycleManager.loopStartables();
    return this;
  }

  public add(...sceneEntities: Entity[]) {
    if (sceneEntities.length === 0) return this;

    for (let e of sceneEntities) {
      this._lifecycleManager.startables.push(e as unknown as IStartable);
      this._scene.add(e);
    }

    return this;
  }

  // public enableSceneHandle()

  @thisbind
  public run(): void {
    console.log("runner runs!");

    this._lifecycleManager.loopUpdatables(0);

    requestAnimationFrame(this.run);
    this._renderer.render(this._scene, this._camera);

    this._lifecycleManager.loopLateUpdatables(0);
  }

  // #endregion behaviour
}

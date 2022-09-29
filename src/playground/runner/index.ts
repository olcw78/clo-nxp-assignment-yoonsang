import { ICameraData } from "src/lib/camera/camera/Camera.interface";
import { OrthographicCameraData } from "src/lib/camera/orthographic/OrthographicCamera.data";
import { PerspectiveCameraData } from "src/lib/camera/perspective/PerspectiveCamera.data";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { LifecycleManager } from "src/lib/object/lifecycle/LifecycleManager";
import { thisbind } from "src/shared/decorator/thisbind";
import {
  Camera as ThreeCamera,
  Object3D,
  Scene,
  WebGLRenderer
} from "three";

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
    this._scene.add(this._camera);
    this._camera.position.z = 3;

    // set renderer.
    this._renderer = new WebGLRenderer();
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    // attach dom canvas.
    document.body.appendChild(this._renderer.domElement);
    // const mesh = new Mesh(new SphereGeometry(0.5), new MeshBasicMaterial());
    // this._scene.add(mesh);
    document.body.addEventListener("resize", this.resize);
  }

  @thisbind
  resize(): void {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // #region behaviour

  public start(): Runner {
    this._lifecycleManager.loopStartables();
    return this;
  }

  public setEntities(...sceneObjects: Object3D[]): Runner {
    if (sceneObjects.length === 0) return this;

    for (let i of sceneObjects) {
      this._lifecycleManager.startables.push(i as unknown as IStartable);
      this._scene.add(i);
    }

    return this;
  }

  // public enableSceneHandle()

  @thisbind
  public run(): void {
    console.log("runner runs!");

    // this._lifecycleManager.loopUpdatables(0);

    requestAnimationFrame(this.run);
    this._renderer.render(this._scene, this._camera);

    // this._lifecycleManager.loopLateUpdatables(0);
  }

  // #endregion behaviour
}

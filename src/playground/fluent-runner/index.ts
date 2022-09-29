import { ICameraData } from "src/lib/camera/camera/Camera.interface";
import { OrthographicCameraData } from "src/lib/camera/orthographic/OrthographicCamera.data";
import { PerspectiveCameraData } from "src/lib/camera/perspective/PerspectiveCamera.data";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { LifecycleManager } from "src/lib/object/lifecycle/LifecycleManager";
import { thisbind } from "src/shared/decorator/thisbind";
import { Camera as ThreeCamera, Clock, Object3D, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class FluentRunner {
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

  private _orbitControl?: OrbitControls;
  private _orbitControlsEnabled: boolean = false;

  private readonly _clock: Clock = new Clock();

  // #endregion data

  public constructor(cameraIntializer: {
    camera: ThreeCamera;
    cameraData: ICameraData;
  }) {
    // init three scene.
    this._scene = new Scene();

    // init camera and its properties.
    const { camera, cameraData } = cameraIntializer;
    this._camera = camera;
    this._cameraData = cameraData;
    this._scene.add(this._camera);
    this._camera.position.z = 800;

    // set renderer.
    this._renderer = new WebGLRenderer({ antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    // attach dom canvas.
    document.body.appendChild(this._renderer.domElement);
    document.body.addEventListener("resize", this.resize);
  }

  // #region behaviour

  @thisbind
  resize(): void {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public start(): FluentRunner {
    this._lifecycleManager.loopStartables();
    this._clock.autoStart = true;
    return this;
  }

  public showRenderFrameDebug(): FluentRunner {
    console.log(this._renderer.domElement.toDataURL());
    return this;
  }

  public setEntities(...sceneObjects: Object3D[]): FluentRunner {
    if (sceneObjects.length === 0) return this;

    for (let i of sceneObjects) {
      this._lifecycleManager.startables.push(i as unknown as IStartable);
      this._lifecycleManager.updatables.push(i as unknown as IUpdatable);
      this._scene.add(i);
    }

    return this;
  }

  public enableOrbitControls(): this {
    // connect orbit controls.
    this._orbitControl = new OrbitControls(this._camera, this._renderer.domElement);
    this._orbitControl.update();
    this._orbitControlsEnabled = true;
    return this;
  }

  // public enableSceneHandle()

  @thisbind
  public run(): void {
    const dt = this._clock.getDelta();
    console.log("current delta time: " + dt);

    // update updatable
    this._lifecycleManager.loopUpdatables(dt);

    requestAnimationFrame(this.run);

    if (this._orbitControlsEnabled) {
      this._orbitControl!.update();
    }

    this._renderer.render(this._scene, this._camera);

    // update late updatable
    this._lifecycleManager.loopLateUpdatables(dt);
  }

  // #endregion behaviour
}

import { ICameraData } from "src/lib/camera/camera/Camera.interface";
import { OrthographicCameraData } from "src/lib/camera/orthographic/OrthographicCamera.data";
import { PerspectiveCameraData } from "src/lib/camera/perspective/PerspectiveCamera.data";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { LifecycleManager } from "src/lib/object/lifecycle/LifecycleManager";
import { thisbind } from "src/shared/decorator/thisbind";
import {
  Camera as ThreeCamera,
  DirectionalLight,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Scene,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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

  private _orbitControl?: OrbitControls;
  private _orbitControlsEnabled: boolean = false;

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
    this._camera.position.z = 800;

    // const color = 0xffffff;
    // const intensity = 3;
    // const light1 = new DirectionalLight(color, intensity);
    // light1.position.set(0, 10, 0);
    // light1.target.position.set(-5, 0, 0);
    // this._scene.add(light1);
    // this._scene.add(light1.target);

    // set renderer.
    this._renderer = new WebGLRenderer();
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

  public start(): Runner {
    this._lifecycleManager.loopStartables();
    return this;
  }

  public showRenderFrameDebug(): Runner {
    console.log(this._renderer.domElement.toDataURL());
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
    // console.log("runner runs!");

    this._lifecycleManager.loopUpdatables(0);

    requestAnimationFrame(this.run);

    if (this._orbitControlsEnabled) {
      this._orbitControl!.update();
    }

    this._renderer.render(this._scene, this._camera);

    this._lifecycleManager.loopLateUpdatables(0);
  }

  // #endregion behaviour
}

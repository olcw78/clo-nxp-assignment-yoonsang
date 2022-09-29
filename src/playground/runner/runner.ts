import { ICameraData } from "src/lib/camera/camera/Camera.interface";
import { OrthographicCameraData } from "src/lib/camera/orthographic/OrthographicCamera.data";
import { PerspectiveCameraData } from "src/lib/camera/perspective/PerspectiveCamera.data";
import { LifecycleManager } from "src/lib/object/lifecycle/LifecycleManager";
import { thisbind } from "src/shared/decorator/thisbind";
import {
  Camera as ThreeCamera,
  Clock,
  CubeTexture,
  Object3D,
  Scene,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as lil from "lil-gui";
import { RunnerEventListener } from "./runner.eventListener";
import { RunnerModifier } from "./runner.modifier";

type TCameraInitializer = {
  camera: ThreeCamera;
  cameraData: ICameraData;
};

export class Runner {
  public constructor(cameraIntializer: TCameraInitializer | undefined) {
    if (!cameraIntializer) {
      throw new Error("Fail to intialize the camera!");
    }

    new RunnerEventListener(this);
    this._mod = new RunnerModifier(this);

    // init three scene.
    Runner._scene = new Scene();

    // init camera and its properties.
    const { camera, cameraData } = cameraIntializer;
    this._camera = camera;
    this._cameraData = cameraData;
    Runner._scene.add(this._camera);

    this._camera.position.y = 150;
    this._camera.position.z = 800;

    // set renderer.
    this._renderer = new WebGLRenderer({ antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // attach dom canvas.
    document.body.appendChild(this._renderer.domElement);

    this._orbitControl = new OrbitControls(this._camera, this._renderer.domElement);
  }

  // #region static data

  private static _scene: Scene;
  public static get scene(): Scene {
    return Runner._scene;
  }

  private static _gui: lil.GUI;
  public static get gui(): lil.GUI {
    return Runner._gui;
  }
  public static set gui(value: lil.GUI) {
    Runner._gui = value;
  }

  // #endregion static data

  // #region data

  private readonly _camera: ThreeCamera;
  public get camera(): ThreeCamera {
    return this._camera;
  }

  private readonly _renderer: WebGLRenderer;
  public get renderer(): WebGLRenderer {
    return this._renderer;
  }

  private readonly _cameraData: ICameraData;
  public get cameraDataAsPerspective(): PerspectiveCameraData {
    return this._cameraData as PerspectiveCameraData;
  }
  public get cameraDataAsOrthographic(): OrthographicCameraData {
    return this._cameraData as OrthographicCameraData;
  }

  private readonly _lifecycleManager: LifecycleManager = new LifecycleManager();

  private readonly _orbitControl?: OrbitControls;
  public get orbitControl(): OrbitControls | undefined {
    return this._orbitControl;
  }

  private readonly _clock = new Clock();

  private readonly _mod: RunnerModifier;
  public get mod(): RunnerModifier {
    return this._mod;
  }

  // #endregion data

  // #region behaviour

  public start(): this {
    // start lifecycles.
    this._lifecycleManager.loopStartables();
    if (this._mod.debugGUIenabled) {
      this._lifecycleManager.loopGUIables();
    }

    // start ticking.
    this._clock.autoStart = true;

    return this;
  }

  public setSkybox(skyboxCubemapTexture: CubeTexture): this {
    Runner._scene.background = skyboxCubemapTexture;

    return this;
  }

  public setEntities(...sceneObjects: Object3D[]): this {
    if (sceneObjects.length === 0) return this;

    for (let sceneObject of sceneObjects) {
      this._lifecycleManager.addStartable(sceneObject);
      this._lifecycleManager.addUpdatable(sceneObject);
      this._lifecycleManager.addLateUpdatable(sceneObject);
      this._lifecycleManager.addDestroyable(sceneObject);
      this._lifecycleManager.addDisable(sceneObject);
      this._lifecycleManager.addGUIable(sceneObject);

      Runner._scene.add(sceneObject);
    }

    return this;
  }

  @thisbind
  public run(): void {
    const dt = this._clock.getDelta();
    if (this._mod.debugPrintDeltaTime) {
      console.log("current delta time: " + dt);
    }

    // update updatable
    this._lifecycleManager.loopUpdatables(dt);

    requestAnimationFrame(this.run);

    if (this._mod.orbitControlsEnabled) {
      this._orbitControl!.update();
    }

    this._renderer.render(Runner._scene, this._camera);

    // update late updatable
    this._lifecycleManager.loopLateUpdatables(dt);
  }

  // #endregion behaviour
}

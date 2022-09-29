import { AxesHelper } from "three";
import { Runner } from "./runner";
import * as lil from "lil-gui";

export class RunnerModifier {
  constructor(private readonly _impl: Runner) {}

  // #region data

  private _debugPrintDeltaTime = false;
  public get debugPrintDeltaTime(): boolean {
    return this._debugPrintDeltaTime;
  }
  public set debugPrintDeltaTime(value: boolean) {
    this._debugPrintDeltaTime = value;
  }

  private _orbitControlsEnabled = false;
  public get orbitControlsEnabled(): boolean {
    return this._orbitControlsEnabled;
  }
  public set orbitControlsEnabled(value: boolean) {
    this._orbitControlsEnabled = value;
  }

  private _debugGUIenabled = false;
  public get debugGUIenabled(): boolean {
    return this._debugGUIenabled;
  }
  public set debugGUIenabled(value: boolean) {
    this._debugGUIenabled = value;
  }

  // #endregion data

  // #region behaviour

  public enableRenderFrameDebugDisplay(): Runner {
    console.log(this._impl.renderer.domElement.toDataURL());
    return this._impl;
  }

  public enableOrbitControls(): Runner {
    if (this._impl.orbitControl) {
      this._impl.orbitControl.update();
      this._impl.orbitControl.enableDamping = true;
      this._orbitControlsEnabled = true;
    }

    return this._impl;
  }

  public enableDebugPrintDeltaTime(): Runner {
    this._debugPrintDeltaTime = true;
    return this._impl;
  }

  public enableAxesHelper(): Runner {
    Runner.scene.add(new AxesHelper(300));
    return this._impl;
  }

  public enableDebugGUI(): Runner {
    Runner.gui = new lil.GUI({
      autoPlace: true,
      width: window.innerWidth * 0.3,
      title: "CLO Web Graphics Assignment Scene Control Panel"
    });
    this._debugGUIenabled = true;
    return this._impl;
  }

  // #endregion behaviour
}

import { AxesHelper } from "three";
import { Runner } from "./runner";
import * as lil from "lil-gui";

export class RunnerModifier {
  constructor(private readonly _impl: Runner) {}

  // #region behaviour

  public enableRenderFrameDebugDisplay(): Runner {
    console.log(this._impl.renderer.domElement.toDataURL());
    return this._impl;
  }

  public enableOrbitControls(): Runner {
    if (this._impl.orbitControl) {
      this._impl.orbitControl.update();
      this._impl.orbitControl.enableDamping = true;
      this._impl.orbitControlsEnabled = true;
    }

    return this._impl;
  }

  public enableDebugPrintDeltaTime(): Runner {
    this._impl.debugPrintDeltaTime = true;
    return this._impl;
  }

  public enableAxesHelper(): Runner {
    Runner.scene.add(new AxesHelper(300));
    return this._impl;
  }

  public enableDebugGUI(): Runner {
    Runner.gui = new lil.GUI();
    return this._impl;
  }

  // #endregion behaviour
}

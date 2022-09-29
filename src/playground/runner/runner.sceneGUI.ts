import { Runner } from "./runner";

export class RunnerSceneGUI {
  constructor(private readonly _impl: Runner) {}

  public onGUI(): void {
    Runner.gui.addFolder("scene").add(this._impl, "isAnimating");
  }
}

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectSelector } from "./EffectSelector";
import { Runner } from "./runner";

export class RunnerEffect {
  constructor(private readonly _impl: Runner) {
    this._effectComposer = new EffectComposer(_impl.renderer);

    const renderPass = new RenderPass(Runner.scene, _impl.camera);
    this._effectComposer.addPass(renderPass);

    this._effectSelector = new EffectSelector(this._impl, this._effectComposer);
  }

  private readonly _effectSelector: EffectSelector;
  private readonly _effectComposer: EffectComposer;
  private _selected = false;

  public get select(): EffectSelector {
    this._selected = true;
    return this._effectSelector;
  }

  public update(deltaTime: number): void {
    if (!this._selected) {
      return;
    }

    this._effectComposer.render(deltaTime);
  }
}

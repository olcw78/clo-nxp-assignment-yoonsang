import { Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Runner } from "./runner";

export class EffectSelector {
  constructor(
    private readonly _impl: Runner,
    private readonly _effectComposer: EffectComposer
  ) {}

  public finishSelect(): Runner {
    return this._impl;
  }

  // #region glitch pass

  private _glitchPass?: GlitchPass;
  public get glitchPass(): GlitchPass {
    return (this._glitchPass ??= new GlitchPass());
  }
  private _isGlitchPassUsed = false;

  public glitchEffect(): this {
    if (!this._isGlitchPassUsed) {
      this._effectComposer.addPass(this.glitchPass);
    } else {
      this._effectComposer.removePass(this.glitchPass);
    }

    this._isGlitchPassUsed = !this._isGlitchPassUsed;

    return this;
  }

  // #endregion glitch pass

  // #region unreal bloom pass

  private _unrealBloomPass?: UnrealBloomPass;
  public get unrealBloomPass(): UnrealBloomPass {
    return (this._unrealBloomPass ??= new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerWidth),
      1.5,
      0.4,
      0.85
    ));
  }
  private _unrealBloomPassUsed = false;

  public unrealBloomEffect(): this {
    if (!this._unrealBloomPassUsed) {
      this._effectComposer.addPass(this.unrealBloomPass);
    } else {
      this._effectComposer.removePass(this.unrealBloomPass);
    }

    this._unrealBloomPassUsed = !this._unrealBloomPassUsed;

    return this;
  }

  // #endregion unreal bloom pass
}

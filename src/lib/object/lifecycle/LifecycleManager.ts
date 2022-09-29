import { Object3D } from "three";
import { IDestroyable } from "./IDestroyable";
import { IDisable } from "./IDisable";
import { IGUIable } from "./IGUIable";
import { ILateUpdatable } from "./ILateUpdatable";
import { IStartable } from "./IStartable";
import { IUpdatable } from "./IUpdatable";

export class LifecycleManager {
  private readonly _startables: IStartable[] = [];
  private readonly _updatables: IUpdatable[] = [];
  private readonly _lateUpdatables: ILateUpdatable[] = [];
  private readonly _disables: IDisable[] = [];
  private readonly _destroyables: IDestroyable[] = [];
  private readonly _GUIables: IGUIable[] = [];

  // #region startable

  public addStartable(object: Object3D): void {
    const src = object as unknown as IStartable;
    if ("onStart" in src) {
      this._startables.push(src);
    }
  }

  public loopStartables(): void {
    if (this._startables.length === 0) return;

    for (const e of this._startables) {
      e?.onStart();
    }
  }

  // #endregion startable

  // #region updatable

  public addUpdatable(object: Object3D): void {
    const src = object as unknown as IUpdatable;
    if ("onUpdate" in src) {
      this._updatables.push(src);
    }
  }

  public loopUpdatables(deltaTime: number): void {
    if (this._updatables.length === 0) return;

    for (const e of this._updatables) {
      e?.onUpdate(deltaTime);
    }
  }

  // #endregion updatable

  // #region late updatable

  public addLateUpdatable(object: Object3D): void {
    const src = object as unknown as ILateUpdatable;
    if ("onLateUpdate" in src) {
      this._lateUpdatables.push(src);
    }
  }

  public loopLateUpdatables(deltaTime: number): void {
    if (this._lateUpdatables.length === 0) return;

    for (const e of this._lateUpdatables) {
      e?.onLateUpdate(deltaTime);
    }
  }

  // #endregion late updatable

  // #region disable

  public addDisable(object: Object3D): void {
    const src = object as unknown as IDisable;
    if ("onDisable" in src) {
      this._disables.push(src);
    }
  }

  public loopDisables(): void {
    if (this._disables.length === 0) return;

    for (const e of this._disables) {
      e?.onDisable();
    }
  }

  // #endregion disable

  // #region destroyable

  public addDestroyable(object: Object3D): void {
    const src = object as unknown as IDestroyable;
    if ("onDestroy" in src) {
      this._destroyables.push(src);
    }
  }

  public loopDestroyables(): void {
    if (this._destroyables.length === 0) return;

    for (const e of this._destroyables) {
      e?.onDestroy();
    }
  }

  // #endregion destroyable

  // #region gui able

  public addGUIable(object: Object3D): void {
    const src = object as unknown as IGUIable;
    if ("onGUI" in src) {
      this._GUIables.push(src);
    }
  }

  public loopGUIables(): void {
    if (this._GUIables.length === 0) return;

    for (const e of this._GUIables) {
      e?.onGUI();
    }
  }

  // #endregion gui able
}

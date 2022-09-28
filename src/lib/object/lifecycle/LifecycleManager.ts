import { IDestroyable } from "./IDestroyable";
import { IDisable } from "./IDisable";
import { ILateUpdatable } from "./ILateUpdatable";
import { IStartable } from "./IStartable";
import { IUpdatable } from "./IUpdatable";

export class LifecycleManager {
  private readonly _startables: IStartable[] = [];
  public get startables(): IStartable[] {
    return this._startables;
  }
  private readonly _updatables: IUpdatable[] = [];
  public get updatables(): IUpdatable[] {
    return this._updatables;
  }

  private readonly _lateUpdatables: ILateUpdatable[] = [];
  public get lateUpdatables(): ILateUpdatable[] {
    return this._lateUpdatables;
  }

  private readonly _disables: IDisable[] = [];
  public get disables(): IDisable[] {
    return this._disables;
  }

  private readonly _destroyables: IDestroyable[] = [];
  public get destroyables(): IDestroyable[] {
    return this._destroyables;
  }

  public loopStartables(): void {
    if (this._startables.length === 0) return;

    for (let e of this._startables) {
      e.onStart();
    }
  }

  public loopUpdatables(deltaTime: number): void {
    if (this._updatables.length === 0) return;

    for (let e of this._updatables) {
      e.onUpdate(deltaTime);
    }
  }

  public loopLateUpdatables(deltaTime: number): void {
    if (this._lateUpdatables.length === 0) return;

    for (let e of this._lateUpdatables) {
      e.onLateUpdate(deltaTime);
    }
  }

  public loopDisables(): void {
    if (this._disables.length === 0) return;

    for (let e of this._disables) {
      e.onDisable();
    }
  }

  public loopDestroyables(): void {
    if (this._destroyables.length === 0) return;

    for (let e of this._destroyables) {
      e.onDestroy();
    }
  }
}

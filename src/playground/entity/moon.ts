import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh, Object3D, Vector3 } from "three";
import { DEG_TO_RAD } from "../const";
import { FluentRunner } from "../fluent-runner";
import { Earth } from "./earth";

export class Moon extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
    this.name = "moon";
  }

  private readonly _initialUniformScale = 0.3;
  private readonly _initialPosition = new Vector3(1000, 0, 0);
  private readonly _rotationAmountPerSecondInEulerAngles = 13.333 * DEG_TO_RAD;
  private readonly _revolutionAmountPerSecondsInEulerAngles = 13.333 * DEG_TO_RAD;
  private readonly _pivot = new Object3D();
  private _earth?: Earth;

  onStart(): void {
    this.position.set(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z
    );

    this.scale.set(
      this._initialUniformScale,
      this._initialUniformScale,
      this._initialUniformScale
    );

    this._earth = FluentRunner.findObject("earth") as Earth;
    if (this._earth) {
      this._pivot.position.set(
        this._earth.position.x,
        this._earth.position.y,
        this._earth.position.z
      );
      this._pivot.add(this);
      this._earth.add(this._pivot);
    }
  }

  onUpdate(deltaTime: number): void {
    this.rotateY(this._rotationAmountPerSecondInEulerAngles * deltaTime);
    // if (this._earth) {
    //   this._pivot.position.set(
    //     this._earth.position.x,
    //     this._earth.position.y,
    //     this._earth.position.z
    //   );
    // }
    this._pivot.rotation.x =
      this._revolutionAmountPerSecondsInEulerAngles * deltaTime;
    this._pivot.rotation.z =
      this._revolutionAmountPerSecondsInEulerAngles * deltaTime;
  }
}

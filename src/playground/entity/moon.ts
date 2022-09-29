import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh, Object3D, Vector3 } from "three";
import { DEG_TO_RAD } from "../const";
import { FluentRunner } from "../fluent-runner";

export class Moon extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
    this.name = "moon";
  }

  private readonly _initialUniformScale = 0.01;
  private readonly _initialPosition = new Vector3(50, 0, 0);
  private readonly _rotationAmountPerSecondInEulerAngles = 13.333 * DEG_TO_RAD;
  private readonly _revolutionAmountPerSecondsInEulerAngles = 13.333 * DEG_TO_RAD;
  private readonly _pivot = new Object3D();
  private _earth?: Object3D;

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

    this._earth = FluentRunner.scene.getObjectByName("earth");

    this._pivot.add(this);
    FluentRunner.scene.add(this._pivot);
  }

  onUpdate(deltaTime: number): void {
    if (this._earth) {
      let earthWorldPos = new Vector3();
      this._earth.getWorldPosition(earthWorldPos);
      this._pivot.position.set(earthWorldPos.x, earthWorldPos.y, earthWorldPos.z);
    }

    const nextAngle = this._revolutionAmountPerSecondsInEulerAngles * deltaTime;
    this._pivot.rotation.z -= nextAngle;

    this.rotateY(this._rotationAmountPerSecondInEulerAngles * deltaTime);
  }
}

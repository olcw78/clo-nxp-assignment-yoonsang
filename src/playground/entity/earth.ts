import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh, Object3D, Vector3 } from "three";
import { DEG_TO_RAD } from "../const";
import { FluentRunner } from "../fluent-runner";

export class Earth extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
    this.name = "earth";
  }

  private readonly _initialUniformScale = 0.03;
  private readonly _initialPosition = new Vector3(200, 0, 0);
  private readonly _rotationAmountPerSecondInEulerAngles = 360 * DEG_TO_RAD;
  private readonly _revolutionAmountPerSecondsInEulerAngles = 20 * DEG_TO_RAD; //0.99 * DEG_TO_RAD;
  private readonly _pivot = new Object3D();

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

    this._pivot.add(this);
    FluentRunner.scene.add(this._pivot);
  }

  onUpdate(deltaTime: number): void {
    const nextAngle = this._revolutionAmountPerSecondsInEulerAngles * deltaTime;
    this._pivot.rotation.z += nextAngle;

    this.rotateY(this._rotationAmountPerSecondInEulerAngles * deltaTime);
  }
}

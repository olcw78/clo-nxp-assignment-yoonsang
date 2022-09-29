import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { DEG_TO_RAD } from "../const";

export class Earth extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
  }

  private readonly _initialUniformScale = 0.05;
  private readonly _initialPosition = new Vector3(200, 0, 0);
  private readonly _rotateAmountPerSecondInEulerAngles = 360 * DEG_TO_RAD;

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
  }

  onUpdate(deltaTime: number): void {
    this.rotateY(this._rotateAmountPerSecondInEulerAngles * deltaTime);
  }
}

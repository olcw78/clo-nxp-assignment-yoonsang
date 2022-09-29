import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";

export class Moon extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
  }

  private readonly _initialUniformScale = 0.01;
  private readonly _initialPosition = new Vector3(250, 0, 0);

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

  onUpdate(deltaTime: number): void {}
}

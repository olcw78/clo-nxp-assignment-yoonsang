import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";

export class Earth extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
  }

  onStart(): void {
    this.position.set(0, -400, 0);
    this.scale.set(0.1, 0.1, 0.1);
    console.log("start earth");
  }

  onUpdate(deltaTime: number): void {}
}

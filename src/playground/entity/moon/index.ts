import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";

export class Moon extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
  }

  onStart(): void {
    // this.position.set(0, 5000, 0);
    this.scale.set(0.1, 0.1, 0.1);
    console.log("start moon");
  }

  onUpdate(deltaTime: number): void {}
}

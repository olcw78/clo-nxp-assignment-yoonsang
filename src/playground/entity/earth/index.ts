import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";

export class Earth extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, material: Material) {
    super(geometry, material);
  }

  onStart(): void {
    this.position.set(0, -1, 0);
    console.log("start earth");
  }

  onUpdate(deltaTime: number): void {}
}

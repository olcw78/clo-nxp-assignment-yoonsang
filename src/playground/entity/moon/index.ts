import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";

export class Moon extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materials: Material[]) {
    super(geometry, materials);
  }

  onStart(): void {
    console.log("start moon");
  }

  onUpdate(deltaTime: number): void {}
}

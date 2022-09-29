// import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";

export class Sun extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materials: Material[]) {
    super(geometry, materials);
  }

  onStart(): void {
    this.position.set(0, 1, 0);
    console.log("start sun");
  }

  onUpdate(deltaTime: number): void {}
}

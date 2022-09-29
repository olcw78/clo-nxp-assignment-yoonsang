// import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";

export class Sun extends Mesh implements IStartable, IUpdatable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
  }

  onStart(): void {
    this.scale.set(0.2, 0.2, 0.2);
    this.position.set(0, 200, 0);
    console.log("start sun");
  }

  onUpdate(deltaTime: number): void {}
}

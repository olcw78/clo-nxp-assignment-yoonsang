import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IObjectResourceSetterFromUri } from "src/lib/object/IObjectResourceSetterFromUri";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";
import { Entity } from "../../../lib/object/entitiy";

export class Sun
  extends Entity
  implements IStartable, IUpdatable, IObjectResourceSetter
{
  onStart(): void {
    this.position.set(0, 1, 2);
    console.log("start sun");
  }

  onUpdate(deltaTime: number): void {}

  setResources(geometry: BufferGeometry, material: Material): Entity {
    this._mesh = new Mesh(geometry, material);

    return this;
  }

  // setResourcesFromUri(geometryUri: string, textureUris: string[]): SceneAddable {}
}

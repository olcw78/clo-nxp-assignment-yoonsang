import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IObjectResourceSetterFromUri } from "src/lib/object/IObjectResourceSetterFromUri";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh } from "three";
import { Entity } from "../../../lib/object/entitiy";

export class Moon
  extends Entity
  implements IStartable, IUpdatable, IObjectResourceSetter
{
  onStart(): void {
    this.position.set(1, 0, 0);
    console.log("start moon");
  }

  onUpdate(deltaTime: number): void {}

  setResources(geometry: BufferGeometry, material: Material): Entity {
    this._mesh = new Mesh(geometry, material);

    return this;
  }

  // setResourcesFromUri(geometryUri: string, textureUris: string[]): SceneAddable {
  //   throw new Error("Method not implemented.");
  // }
}

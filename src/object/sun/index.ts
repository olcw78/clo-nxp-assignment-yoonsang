import { BufferGeometry, Material } from "three";
import { IObject } from "../IObject";
import { SceneAddable } from "../SceneAddable";

export class Sun implements IObject {
  addablify(geometry: BufferGeometry, material: Material): SceneAddable {
    throw new Error("Method not implemented.");
  }
}

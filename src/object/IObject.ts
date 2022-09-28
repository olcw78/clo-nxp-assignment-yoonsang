import { BufferGeometry, Material } from "three";
import { SceneAddable } from "./SceneAddable";

export interface IObject {
  addablify(geometry: BufferGeometry, material: Material): SceneAddable;
}

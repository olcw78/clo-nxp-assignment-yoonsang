import { Entity } from "src/lib/object/entitiy";
import { BufferGeometry, Material } from "three";

export interface IObjectResourceSetter {
  setResources(geometry: BufferGeometry, material: Material): Entity;
}

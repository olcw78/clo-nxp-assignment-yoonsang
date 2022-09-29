import { MeshBuilder } from "src/lib/object/MeshBuilder";
import { BufferGeometry, Material } from "three";

export interface IObjectResourceSetter {
  setResources(geometry: BufferGeometry, material: Material): MeshBuilder;
}

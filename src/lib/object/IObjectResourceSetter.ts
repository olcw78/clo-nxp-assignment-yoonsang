import { ResourcesLoader } from "src/lib/object/ResourcesLoader";
import { BufferGeometry, Material } from "three";

export interface IObjectResourceSetter {
  setResources(geometry: BufferGeometry, material: Material): ResourcesLoader;
}

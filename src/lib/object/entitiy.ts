import { IObject } from "src/lib/object/IObject";
import { BufferGeometry, Material, Mesh, Object3D } from "three";

export class Entity extends Object3D implements IObject {
  _mesh!: Mesh<BufferGeometry, Material | Material[]>;
}

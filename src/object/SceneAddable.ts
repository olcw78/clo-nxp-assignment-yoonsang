import { Object3D, Scene } from "three";

export class SceneAddable extends Object3D {
  public addToScene(scene: Scene) {
    scene.add(this);
  }
}

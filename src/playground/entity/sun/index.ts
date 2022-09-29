// import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Group, Material, Mesh, PointLight } from "three";

export class Sun extends Mesh implements IStartable, IUpdatable {
  private readonly _initialUniformScale = 0.3;
  private readonly _sunPointLight: PointLight;

  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);

    this._sunPointLight = new PointLight(0xeaba1c, 30, 1000);
    this.add(this._sunPointLight);
  }

  onStart(): void {
    this.receiveShadow = false;
    this.castShadow = false;

    this.scale.set(
      this._initialUniformScale,
      this._initialUniformScale,
      this._initialUniformScale
    );

    this._sunPointLight.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
  }

  onUpdate(deltaTime: number): void {}
}

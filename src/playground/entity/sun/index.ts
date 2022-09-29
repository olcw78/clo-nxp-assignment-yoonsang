// import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { SUN_EMISSIVE_COLOR } from "src/playground/const";
import { BufferGeometry, Group, Material, Mesh, PointLight } from "three";

export class Sun extends Mesh implements IStartable, IUpdatable {
  private readonly _initialUniformScale = 0.3;
  private readonly _sunPointLight: PointLight;

  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);

    this._sunPointLight = new PointLight(SUN_EMISSIVE_COLOR, 30, 1000);
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

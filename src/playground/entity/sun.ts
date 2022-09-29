// import { IObjectResourceSetter } from "src/lib/object/IObjectResourceSetter";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { DEG_TO_RAD, SUN_EMISSIVE_COLOR } from "src/playground/const";
import {
  BufferGeometry,
  Material,
  Mesh,
  PointLight
} from "three";

export class Sun extends Mesh implements IStartable, IUpdatable {
  private readonly _initialUniformScale = 0.3;
  private readonly _sunPointLight: PointLight;
  private readonly _rotateAmountPerSecondInEulerAngles = 12 * DEG_TO_RAD;

  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);

    this._sunPointLight = new PointLight(SUN_EMISSIVE_COLOR, 10, 1000);
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

  onUpdate(deltaTime: number): void {
    this.rotateY(this._rotateAmountPerSecondInEulerAngles * deltaTime);
  }
}

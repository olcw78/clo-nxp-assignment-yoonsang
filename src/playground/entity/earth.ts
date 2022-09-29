import { IGUIable } from "src/lib/object/lifecycle/IGUIable";
import { IStartable } from "src/lib/object/lifecycle/IStartable";
import { IUpdatable } from "src/lib/object/lifecycle/IUpdatable";
import { BufferGeometry, Material, Mesh, Object3D, Vector3 } from "three";
import { DEG_TO_RAD } from "../const";
import { Runner } from "../runner/runner";

export class Earth extends Mesh implements IStartable, IUpdatable, IGUIable {
  constructor(geometry: BufferGeometry, materialOrMaterials: Material | Material[]) {
    super(geometry, materialOrMaterials);
    this.name = "earth";
  }

  onGUI(): void {
    const folder = Runner.gui.addFolder("earth");
    folder.add(this.position, "x").min(-400).max(400).step(10).name("pos x");
    folder.add(this.position, "y").min(-200).max(200).step(10).name("pos y");
    folder.add(this.position, "z").min(-200).max(200).step(10).name("pos z");
    folder.add(this, "visible");
    folder.add(this.material, "wireframe");
    folder.addColor(this.material, "color").name("tint color");
  }

  private readonly _initialUniformScale = 0.03;
  private readonly _initialPosition = new Vector3(200, 0, 0);
  private readonly _rotationAmountPerSecondInEulerAngles = 360 * DEG_TO_RAD;
  private readonly _revolutionAmountPerSecondsInEulerAngles = 0.99 * DEG_TO_RAD;
  private readonly _pivot = new Object3D();
  private _sun?: Object3D;

  onStart(): void {
    this.position.set(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z
    );

    this.scale.set(
      this._initialUniformScale,
      this._initialUniformScale,
      this._initialUniformScale
    );

    this._sun = Runner.scene.getObjectByName("sun");
    this._pivot.add(this);
    Runner.scene.add(this._pivot);
  }

  onUpdate(deltaTime: number): void {
    if (this._sun) {
      const sunWorldPos = new Vector3();
      this._sun.getWorldPosition(sunWorldPos);

      if (sunWorldPos !== this._pivot.position) {
        const { x, y, z } = sunWorldPos;
        this._pivot.position.set(x, y, z);
      }
    }

    const nextAngle = this._revolutionAmountPerSecondsInEulerAngles * deltaTime;
    this._pivot.rotation.z += nextAngle;

    this.rotateY(this._rotationAmountPerSecondInEulerAngles * deltaTime);
  }
}

import {
  BufferGeometry,
  Material,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  TextureLoader
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

type TMeshInitializerObject = {
  geometry: BufferGeometry;
  materials: Material[];
};

export class ResourcesLoader {
  private constructor() {} /** delete ctor */

  private static readonly dracoLoader = new DRACOLoader();
  private static readonly textureLoader = new TextureLoader();

  public static init() {
    // this.dracoLoader.setDecoderConfig({ type: "wasm" });
    this.dracoLoader.setDecoderPath("/js/libs/draco/");
    // this.dracoLoader.setDecoderPath(
    //   "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
    // );
    this.dracoLoader.preload();
  }

  public static async build(
    geometryUri: string,
    textureUris: string[]
  ): Promise<TMeshInitializerObject> {
    const geometry = await this.dracoLoader.loadAsync(geometryUri);
    const loadedTextures = await Promise.all(
      textureUris.map(uri => this.textureLoader.loadAsync(uri))
    );

    return {
      geometry,
      materials: loadedTextures.map(
        tex =>
          new MeshBasicMaterial({
            map: tex,
            wireframe: true
          })
      )
    };
  }
}

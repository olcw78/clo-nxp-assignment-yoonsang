// import { IObject } from "src/lib/object/IObject";
import {
  BufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
  Texture,
  TextureLoader
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

type TTextureType = "diffuse" | "normal";

type TMeshInitializerObject = {
  loadedGeometry: BufferGeometry;
  loadedMaterials: Material[];
};

export class MeshBuilder {
  private constructor() {} /** delete ctor */

  private static readonly dracoLoader = new DRACOLoader();
  private static readonly textureLoader = new TextureLoader();

  public static init() {
    MeshBuilder.dracoLoader.setDecoderPath("/js/libs/draco/");
    MeshBuilder.dracoLoader.preload();
  }

  public static async build(
    geometryUri: string,
    textureUris: string[]
  ): Promise<TMeshInitializerObject> {
    const loadedGeometry = await MeshBuilder.loadGeometry(geometryUri);
    const loadedTextures = await MeshBuilder.loadTextures(textureUris);

    return {
      loadedGeometry,
      loadedMaterials: loadedTextures.map(
        tex =>
          new MeshBasicMaterial({
            map: tex
          })
      )
    };
  }

  private static loadGeometry(geometryUri: string): Promise<BufferGeometry> {
    return Promise.resolve(MeshBuilder.dracoLoader.loadAsync(geometryUri));
  }

  private static loadTextures(textureUris: string[]): Promise<Texture[]> {
    const allLoadedTexturePromises = textureUris.map(uri =>
      MeshBuilder.textureLoader.loadAsync(uri)
    );
    return Promise.all(allLoadedTexturePromises);
  }
}

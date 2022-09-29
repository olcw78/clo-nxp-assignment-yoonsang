import {
  BufferGeometry,
  CubeTexture,
  CubeTextureLoader,
  Texture,
  TextureLoader
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

type TResultLoadingEarthResources = {
  geometry: BufferGeometry;
  diffuseTexture: Texture;
  normalTexture: Texture;
};

type TResultLoadingSunResources = {
  geometry: BufferGeometry;
  emissiveTexture: Texture;
};

type TResultLoadingMoonResources = {
  geometry: BufferGeometry;
  diffuseTexture: Texture;
};

export class ResourcesLoader {
  private constructor() {} /** delete ctor */

  private static readonly dracoLoader = new DRACOLoader();
  private static readonly textureLoader = new TextureLoader();

  public static init() {
    this.dracoLoader.setDecoderConfig({ type: "js" });
    this.dracoLoader.setDecoderPath("/js/libs/draco/");
    // this.dracoLoader.setDecoderPath(
    //   "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
    // );
    this.dracoLoader.preload();
  }

  public static loadCubemapTextures(skyboxTexturesUris: string[]): CubeTexture {
    return new CubeTextureLoader().load(skyboxTexturesUris);
  }

  public static async loadEarthResources(
    earthGeometryPath: string,
    earthDiffuseMapPath: string,
    earthNormalMapPath: string
  ): Promise<TResultLoadingEarthResources> {
    const geometry = await this.dracoLoader.loadAsync(earthGeometryPath);
    const diffuseTexture = await this.textureLoader.loadAsync(earthDiffuseMapPath);
    const normalTexture = await this.textureLoader.loadAsync(earthNormalMapPath);

    return {
      geometry,
      diffuseTexture,
      normalTexture
    };
  }

  public static async loadSunResources(
    sunGeometryPath: string,
    sunEmissiveMapPath: string
  ): Promise<TResultLoadingSunResources> {
    const geometry = await this.dracoLoader.loadAsync(sunGeometryPath);
    const emissiveTexture = await this.textureLoader.loadAsync(sunEmissiveMapPath);

    return {
      geometry,
      emissiveTexture
    };
  }

  public static async loadMoonResources(
    moonGeometryPath: string,
    moonDiffuseMapPath: string
  ): Promise<TResultLoadingMoonResources> {
    const geometry = await this.dracoLoader.loadAsync(moonGeometryPath);
    const diffuseTexture = await this.textureLoader.loadAsync(moonDiffuseMapPath);

    return {
      geometry,
      diffuseTexture
    };
  }
}

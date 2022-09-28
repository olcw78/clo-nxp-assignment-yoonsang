import { SceneAddable } from "./SceneAddable";

export interface IObjectResourceSetterFromUri {
  setResourcesFromUri(geometryUri: string, textureUris: string[]): SceneAddable;
}

import { ResourcesLoader } from "./lib/object/ResourcesLoader";

export async function loadResourcesAsync() {
  // load all the required resources.
  ResourcesLoader.init();

  const { geometry: sunGeometry, emissiveTexture: sunEmissiveTexture } =
    await ResourcesLoader.loadSunResources(
      "asset/sun/geometry.drc",
      "asset/sun/diffuse.png"
    );

  const {
    geometry: earthGeometry,
    diffuseTexture: earthDiffuseTexture,
    normalTexture: earthNormalTexture
  } = await ResourcesLoader.loadEarthResources(
    "asset/earth/geometry.drc",
    "asset/earth/diffuse.png",
    "asset/earth/normal.png"
  );

  const { geometry: moonGeometry, diffuseTexture: moonDiffuseTexture } =
    await ResourcesLoader.loadMoonResources(
      "asset/moon/geometry.drc",
      "asset/moon/diffuse.png"
    );

  const skyboxTexture1 = ResourcesLoader.loadCubemapTextures([
    "asset/space_skybox1/back.png",
    "asset/space_skybox1/front.png",
    "asset/space_skybox1/up.png",
    "asset/space_skybox1/down.png",
    "asset/space_skybox1/left.png",
    "asset/space_skybox1/right.png"
  ]);

  // const skyboxTexture2 = ResourcesLoader.loadCubemapTextures([
  //   "asset/space_skybox2/back.png",
  //   "asset/space_skybox2/front.png",
  //   "asset/space_skybox2/up.png",
  //   "asset/space_skybox2/down.png",
  //   "asset/space_skybox2/left.png",
  //   "asset/space_skybox2/right.png"
  // ]);

  return {
    sunGeometry,
    sunEmissiveTexture,
    earthGeometry,
    earthDiffuseTexture,
    earthNormalTexture,
    moonGeometry,
    moonDiffuseTexture,
    skyboxTexture1
    // skyboxTexture2
  };
}

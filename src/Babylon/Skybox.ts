import * as BABYLON from "@babylonjs/core";
import { Color3, CubeTexture, PBRMaterial, StandardMaterial, Texture } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";


export function skybox(scene: BABYLON.Scene, path: string) { 
    const envTex = CubeTexture.CreateFromPrefilteredData(path, scene);

     scene.environmentTexture = envTex;
     scene.createDefaultSkybox(envTex, true);
}

export function CreateDefaultMaterial(scene: BABYLON.Scene): PBRMaterial {
  const pbr = new PBRMaterial("pbr", scene); 
  const uvScale = 2.5;
  const texArr: Texture[] = [];

  const albedoTex = new Texture("./environment/plaster_diffuse.png", scene);
  pbr.albedoTexture = albedoTex; 
  texArr.push(albedoTex); 
  const bumpTex = new Texture("./environment/plaster_normal.png", scene);
  pbr.bumpTexture = bumpTex; 
  texArr.push(bumpTex); 

  pbr.invertNormalMapX = true;
  pbr.invertNormalMapY  = true; 

  pbr.metallicTexture = new Texture("./environment/plaster_metal.png", scene); 

  pbr.roughness = 1; 

  texArr.forEach((tex) => {
    tex.uScale = uvScale;
    tex.vScale = uvScale;
  });

  return pbr; 
}



export function CreateTriangle(scene: BABYLON.Scene): PBRMaterial {
    const pbr = new PBRMaterial("pbr", scene); 
    const uvScale = 50;
    const texArr: Texture[] = [];
    const albedoTex = new Texture("./environment/triangle_albedo.png", scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./environment/triangle_normal.png", scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 
    pbr.emissiveColor = new Color3(1,1,1); 
    pbr.emissiveTexture = new Texture("./environment/triangle_emissive.png", scene); 
    pbr.roughness = 1; 
    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });
    return pbr; 
  }


  export function CreateBrokenWallMaterial(scene: BABYLON.Scene): PBRMaterial {
    const pbr = new PBRMaterial("pbr", scene); 
    const uvScale = 2.5;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./environment/broken_wall_diffuse.png", scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./environment/broken_wall_normal.png", scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.metallicTexture = new Texture("../environment/broken_wall_metal.png", scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 
  }


  

  export function CreateConcreteWallMaterial(scene: BABYLON.Scene): PBRMaterial {
    const pbr = new PBRMaterial("pbr", scene); 
    const uvScale = 2.5;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./environment/coral_diffuse.png", scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./environment/coral_normal.png", scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.metallicTexture = new Texture("./environment/coral_metal.png", scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 
  }



  export function CreateGroundMaterial(scene: BABYLON.Scene): PBRMaterial {
    const pbr = new PBRMaterial("pbr", scene); 
    const uvScale = 2.5;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./environment/floor_diffuse.png", scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./environment/floor_normal.png", scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.metallicTexture = new Texture("./environment/floor_metal.png", scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 
  }


  export function CreateFabricMaterial(scene: BABYLON.Scene): PBRMaterial {
    const pbr = new PBRMaterial("pbr", scene); 
    const uvScale = 2.5;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./environment/fabric_diffuse.png", scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./environment/fabric_normal.png", scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.metallicTexture = new Texture("./environment/fabric_metal.png", scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 
  }


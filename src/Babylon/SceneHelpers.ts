import * as BABYLON from "@babylonjs/core";
import { ActionManager, Color3, Color4, CubeTexture, LinesMesh, PostProcessRenderPipelineManagerSceneComponent, Vector3 } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { toggleMenu } from "./ToggleMenu";
import { skybox, CreateGroundMaterial, CreateDefaultMaterial, CreateTriangle } from "./Skybox";
import * as PDB from "./coordinate.json";



/*
Method to highlight a mesh upon mouse hover
@param mesh the array of meshes to highlight, scene the scene in which the meshes are rendered, glowColor the color of the highlight
*/
export function highlightMesh(mesh: BABYLON.Mesh[], scene: BABYLON.Scene, glowColor: BABYLON.Color3) {
        const hl = new BABYLON.HighlightLayer("hl", scene);
        hl.removeAllMeshes();

        for (let i = 0; i < mesh.length; i++) {
            mesh[i].actionManager = new BABYLON.ActionManager(scene); 
            mesh[i].actionManager?.registerAction(new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger, 
                function (evt) {
                    const sourceBox = evt.meshUnderPointer;
        
                    //update the color if mesh is visible
                    if (!(mesh[i].material?.alpha == 0)) {
                        const material = mesh[i].material; 
                        hl.addMesh(mesh[i], glowColor); 
                    }
            }));
            mesh[i].actionManager?.registerAction(new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger, 
                function (evt) {
                    const sourceBox = evt.meshUnderPointer;
        
                    //revert the color
                    hl.removeAllMeshes();        
            }));
        }
} 

//removes specific groups of moleculs by setting alpha to zero
export function removeMolecule(mesh: BABYLON.Mesh, scene: BABYLON.Scene) {
        const material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseColor = new BABYLON.Color3(1,1,1);
        material.alpha = 0;
        mesh.material = material; 
}

//rotates mesh around y axis
export function rotateAroundY(mesh: BABYLON.Mesh[], lines: BABYLON.LinesMesh[], scene: BABYLON.Scene, radians: number) {
     for (let i = 0; i < mesh.length; i++) {
        mesh[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,1,0), radians);
    }
    for (let i = 0; i < mesh.length; i++) {
        lines[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,1,0), radians);
    }
    
    //mesh[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,1,0), radians);
}

//rotates mesh around x axis
export function rotateAroundX(mesh: BABYLON.Mesh[],lines: BABYLON.LinesMesh[] ,scene: BABYLON.Scene, radians: number) {
    for (let i = 0; i < mesh.length; i++) {
        mesh[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,0,0), radians);
    }
    for (let i = 0; i < mesh.length; i++) {
        lines[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,0,0), radians);
    }
}




 
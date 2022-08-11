//import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder} from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { ActionManager, Color3, Color4, CubeTexture, LinesMesh, PostProcessRenderPipelineManagerSceneComponent, Vector3 } from "@babylonjs/core";
import { highlightMesh, removeMolecule, rotateAroundX, rotateAroundY} from "./SceneHelpers"; 
import * as GUI from "@babylonjs/gui";
import { toggleMenu } from "./ToggleMenu";
import { skybox, CreateGroundMaterial, CreateDefaultMaterial, CreateTriangle } from "./Skybox";
import * as PDB from "./coordinate.json"
import { CreateStructure } from "./StructureRender";

export class BasicScene {
    scene: BABYLON.Scene;
    engine: BABYLON.Engine; 

    MAP_WIDTH = 200;
    MAP_DEPTH = 200;
    WALL_WIDTH = 0.1;
    WALL_HEIGHT = 200;

    constructor(private canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.CreateScene(); 

        this.engine.runRenderLoop(()=>{
            this.scene.render(); 
        });
    }

    CreateScene(): BABYLON.Scene {
        const scene = new BABYLON.Scene(this.engine);
        scene.collisionsEnabled = true; 
        scene.enablePhysics()
        
        //Creates ground for player to walk along
        const ground = BABYLON.MeshBuilder.CreateGround(
            "ground1",
            { width: this.MAP_WIDTH, height: this.MAP_DEPTH },
            this.scene
        );
        ground.material = CreateGroundMaterial(scene);

        //takes in coordinates from JSON file
        const xCoord = PDB.x;
        const xCoordinates: number[] = [];
        const yCoord = PDB.y;
        const yCoordinates: number[] = [];
        const zCoord = PDB.z;
        const zCoordinates: number[] = [];
        const resNumber = PDB.resNumber;
        const resNumberArray: number[] = [];
        const resName = PDB.resName;
        const resNameArray: string[] = [];
        const atomName = PDB.atom_name;
        const atomNameArray: string[] = [];
        const caXCoord = PDB.caX;
        const caXCoordinates: number[] = [];
        const caYCoord = PDB.caY;
        const caYCoordinates: number[] = [];
        const caZCoord = PDB.caZ;
        const caZCoordinates: number[] = [];
        const caResNumber = PDB.caResNumber;
        const caResNumberArray: number[] = [];
        const caResName = PDB.caResName;
        const caResNameArray: string[] = [];
        const caAtomName = PDB.ca_Atom_name;
        const caAtomNameArray: string[] = [];
        
        //creates array of coordinates for all atoms in protein
        for (let i = 0; i < xCoord.length; i++) {
           const xValue = parseFloat(xCoord[i]) * 1.75;
           xCoordinates.push(xValue);
           const yValue = parseFloat(yCoord[i]) * 1.75;
           yCoordinates.push(yValue);
           const zValue = parseFloat(zCoord[i]) * 1.75;
           zCoordinates.push(zValue);
           const resNumberValue = parseInt(resNumber[i]);
           resNumberArray.push(resNumberValue);
           resNameArray.push(resName[i]);
           atomNameArray.push(atomName[i]);
        }
        
        //creates array of coordinates for all CA atoms in protein
        for (let i = 0; i < caXCoord.length; i++) {
              const xValue = parseFloat(caXCoord[i]) * 1.75;
              caXCoordinates.push(xValue);
              const yValue = parseFloat(caYCoord[i]) * 1.75;
              caYCoordinates.push(yValue);
              const zValue = parseFloat(caZCoord[i]) * 1.75;
              caZCoordinates.push(zValue);
              const resNumberValue = parseInt(caResNumber[i]);
              caResNumberArray.push(resNumberValue);
              caResNameArray.push(caResName[i]);
              caAtomNameArray.push(caAtomName[i]);

        }

        //creates walls to bound player to map
        const walls: BABYLON.Mesh[] = [];
        walls[0] = BABYLON.MeshBuilder.CreateBox(
        "wall1",
        {
            height: this.WALL_HEIGHT,
            width: this.MAP_WIDTH,
            depth: this.WALL_WIDTH,
        },
        this.scene 
        );
        walls[0].position = new BABYLON.Vector3(
        0,
        0,
        this.MAP_DEPTH / 2 - this.WALL_WIDTH / 2
        );
        walls[1] = BABYLON.MeshBuilder.CreateBox(
        "wall2",
        {
            height: this.WALL_HEIGHT,
            width: this.WALL_WIDTH,
            depth: this.MAP_DEPTH,
        },
        this.scene 
        );
        walls[1].position = new BABYLON.Vector3(
        this.MAP_WIDTH / 2 - this.WALL_WIDTH / 2,
        0,
        0
        );
        walls[2] = BABYLON.MeshBuilder.CreateBox(
        "wall3",
        {
            height: this.WALL_HEIGHT,
            width: this.MAP_WIDTH,
            depth: this.WALL_WIDTH,
        },
        this.scene
        );
        walls[2].position = new BABYLON.Vector3(
        0,
        0,
        -this.MAP_DEPTH / 2 + this.WALL_WIDTH / 2
        );
        walls[3] = BABYLON.MeshBuilder.CreateBox(
        "wall4",
        {
            height: this.WALL_HEIGHT,
            width: this.WALL_WIDTH,
            depth: this.MAP_DEPTH,
        },
        this.scene
        );
        walls[3].position = new BABYLON.Vector3(
        -this.MAP_WIDTH / 2 + this.WALL_WIDTH / 2,
        0,
        0
        );
        walls[4] = BABYLON.MeshBuilder.CreateBox(
            "ceiling",
            {
                height: 0.1,
                width: this.MAP_WIDTH * 2,
                depth: this.MAP_DEPTH,
            },
            this.scene
        );
        walls[4].position = new BABYLON.Vector3(
            -this.MAP_WIDTH / 2 + this.WALL_WIDTH / 2,
            this.WALL_HEIGHT / 2,
            0
        );
        for (let i = 0; i < walls.length; i++) {
        walls[i].checkCollisions = true;
        }
        walls.forEach((tex) => {
            tex.material = CreateDefaultMaterial(scene);
        });

        //3D UI manager (used for GUI)
        const manager = new GUI.GUI3DManager(scene);
        const anchor = new BABYLON.TransformNode("");
        
        //camera controlled by mouse
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-50,30,-50), this.scene);
        camera.attachControl(); 
        camera.speed = 0.5; 
        
        //binds movement to WASD
        camera.keysLeft.push(65);
        camera.keysRight.push(68);
        camera.keysUp.push(87);
        camera.keysDown.push(83);
        
        //a hemispheric light, points in a defined direction
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,1,0), this.scene)
        light.intensity = 0.75; 
        
        //CreateStructure(caXCoordinates, caYCoordinates, caZCoordinates, caResNumberArray, scene, camera);
        CreateStructure(xCoordinates, yCoordinates, zCoordinates, resNumberArray, resNameArray, atomNameArray, scene, camera);

        return scene;
    }

}
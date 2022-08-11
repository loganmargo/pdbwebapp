import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { skybox, CreateTriangle, CreateBrokenWallMaterial, CreateConcreteWallMaterial, CreateFabricMaterial } from './Skybox';
import { rotateAroundY, rotateAroundX } from './SceneHelpers';
import { Color3, Engine, PBRMaterial, StandardMaterial, Texture } from '@babylonjs/core';



//function creates a sphere that will follow camera and display menu when clicked


export function toggleMenu(mesh: BABYLON.Mesh, walls: BABYLON.Mesh[], camera: BABYLON.Camera, scene: BABYLON.Scene) {  
    //const toggle = BABYLON.MeshBuilder.CreatePolyhedron("toggle", { size: 0.1 }, scene);
    const toggle = BABYLON.MeshBuilder.CreateGeodesic("toggle", {size: 4}, scene)
    const material = new BABYLON.StandardMaterial("toggle", scene);
    material.diffuseColor = BABYLON.Color3.Purple();
    toggle.material = material;
    const followBehavior = new BABYLON.FollowBehavior();
    followBehavior.attach(toggle);
    toggle.checkCollisions = true;
    const rotating = false; //variable to keep track of whether or not the molecule is rotating

    const manager = new GUI.GUI3DManager(scene);
    const panel = new GUI.PlanePanel();
    panel.margin = 0.1;
    manager.addControl(panel);

    //temporary, eventually change to a dynamically moved position based off of user input
    panel.position = new BABYLON.Vector3(0, 50, 0);
    panel.rows = 4;
    panel.columns = 4;

    const rotationXAnimate = new BABYLON.Animation("rotate", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const rotationYAnimate = new BABYLON.Animation("rotate", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    //Animation keys
    const keys = [];
    keys.push({ frame: 0, value: 0 });

    keys.push({ frame: 40, value: Math.PI / 2});

    keys.push({ frame: 80, value: Math.PI });

    keys.push({ frame: 120, value: (3/2) * Math.PI });

    keys.push({ frame: 160, value: 2 * Math.PI });

    //adding keys to the animation object
    rotationXAnimate.setKeys(keys);
    rotationYAnimate.setKeys(keys);

    const animationGroupX = new BABYLON.AnimationGroup("rotateXGroup");
    const animationGroupY = new BABYLON.AnimationGroup("rotateYGroup");
        animationGroupX.addTargetedAnimation(rotationXAnimate, mesh); 
        animationGroupY.addTargetedAnimation(rotationYAnimate, mesh);

    //function to create a holographic button
    function addButton(text: string) {
        const button = new GUI.HolographicButton(text);
        panel.addControl(button);
        button.text = text;
      }

    //create buttons with function calls
    panel.blockLayout = true;
    
    //addButton("Stop");

    const stopButton = new GUI.HolographicButton("Stop");
    stopButton.text = "Stop";
    stopButton.onPointerUpObservable.add(() => {
      animationGroupX.pause();
      animationGroupY.pause();
    }); 
    panel.addControl(stopButton);
    
    //addButton("Skybox 4"); 
    const skyBox4Button = new GUI.HolographicButton("Skybox 4");
    skyBox4Button.text = "Skybox 4";
    skyBox4Button.onPointerUpObservable.add(() => {
      walls.forEach((tex) => {
        tex.material = CreateFabricMaterial(scene);
      });
    });
    panel.addControl(skyBox4Button);
    


    addButton("Design 4");
    addButton("Highlight");
    
    //addButton("Auto Rotate");
    const autoRotateButton = new GUI.HolographicButton("Rotate X and Y");
    autoRotateButton.text = "Rotate X and Y";
    autoRotateButton.onPointerClickObservable.add(() => {
      animationGroupX.play(true);
      animationGroupY.play(true);
    }); 
    panel.addControl(autoRotateButton); 


    //addButton("Skybox 3");
    const skyBox3Button = new GUI.HolographicButton("Skybox 3");
    skyBox3Button.text = "Skybox 3";
    skyBox3Button.onPointerUpObservable.add(() => {
      walls.forEach((tex) => {
        tex.material = CreateConcreteWallMaterial(scene);
      });
    });
    panel.addControl(skyBox3Button);






    addButton("Design 3");
    addButton("Display Structure Info");

    const rotateYButton = new GUI.HolographicButton("rotateY");
    rotateYButton.text = "Rotate Y";
    rotateYButton.onPointerUpObservable.add(() => {
      animationGroupY.play(true);
    })
    panel.addControl(rotateYButton); 

    //addButton("Skybox 2");
    const skyBox2Button = new GUI.HolographicButton("Skybox 2");
    skyBox2Button.text = "Skybox 2";
    skyBox2Button.onPointerUpObservable.add(() => {
      walls.forEach((tex) => {
        tex.material = CreateBrokenWallMaterial(scene);
      });
    });
    panel.addControl(skyBox2Button);




    addButton("Design 2");
    addButton("Snapshot");

    
    const rotateXButton = new GUI.HolographicButton("rotateX");
    rotateXButton.text = "Rotate X";
    rotateXButton.onPointerUpObservable.add(() => {
      animationGroupX.play(true);
    })
    panel.addControl(rotateXButton); 
    
    //addButton("Skybox 1");
    const skyOneButton = new GUI.HolographicButton("Skybox 1");
    skyOneButton.text = "Skybox 1";
    skyOneButton.onPointerUpObservable.add(() => {
      walls.forEach((tex) => {
        tex.material = CreateTriangle(scene);
      });
    })
    panel.addControl(skyOneButton); 

    addButton("Design 1");
    addButton("File Loader");
    panel.blockLayout = false;

    for (let i = 0; i < panel.children.length; i++) {
    panel.children[i].isVisible = false;
    }

    
    
    //display menu when "M" is clicked, and includes all other buttons
    scene.onPointerDown = function castRayToggle(){
      const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);

      const hit = scene.pickWithRay(ray);

      if (hit?.pickedMesh && hit.pickedMesh.name === "toggle") {
            for (let i = 0; i < panel.children.length; i++) {
              panel.children[i].isVisible = !panel.children[i].isVisible;
              panel.position = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z + 2);
            }
          } 
      }

}


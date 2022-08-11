import * as BABYLON from "@babylonjs/core";
import { ActionManager, Color3, Color4, CubeTexture, LinesMesh, PostProcessRenderPipelineManagerSceneComponent, Vector3 } from "@babylonjs/core";
import { highlightMesh, removeMolecule, rotateAroundX, rotateAroundY} from "./SceneHelpers"; 
import * as GUI from "@babylonjs/gui"; 
import { toggleMenu } from "./ToggleMenu";
import { parseStringStyle } from "@vue/shared";


export function CreateStructure(x: number[], y: number[], z: number[], residue: number[], residueName: string[], atomName: string[], scene: BABYLON.Scene, camera: BABYLON.Camera) {
    //Creates a sphere for each CA atom in the PDB file
    const caMolecule: BABYLON.Mesh[] = [];
    


    //creates array to store the original position to be used for resetting the molecule
    const originalPosition: BABYLON.Vector3[] = [];



    let sumX = 0; 
    let sumY = 0;
    let sumZ = 0;



    for (let i = 0; i < x.length; i++) {
        const molNum = i.toString();
        caMolecule[i] = BABYLON.MeshBuilder.CreateSphere((atomName[i] + molNum), {diameter: 1}, scene);
        const xCoord = x[i];
        sumX += xCoord;
        const yCoord = y[i];
        sumY += yCoord;
        const zCoord = z[i];
        sumZ += zCoord;
        const material = new BABYLON.StandardMaterial("name", scene);
        caMolecule[i].material = material;
        caMolecule[i].position = new BABYLON.Vector3(xCoord, yCoord + 50, zCoord);
        originalPosition[i] = caMolecule[i].position;



        if (residue[i] % 20 === 0) {
            const red = new BABYLON.Color3(1, 0, 0);
            material.diffuseColor = red; 
        }
        if (residue[i] % 20 === 1) {
            const blue = new BABYLON.Color3(0, 0, 1);
            material.diffuseColor = blue;
        }
        if (residue[i] % 20 === 2) {
            const yellow = new BABYLON.Color3(1, 1, 0);
            material.diffuseColor = yellow; 
        }
        if (residue[i] % 20 === 3) {
            const green = new BABYLON.Color3(0, 1, 0);
            material.diffuseColor = green; 
        }
        if (residue[i] % 20 === 4) {
            const orange = new BABYLON.Color3(1, 0.5, 0);
            material.diffuseColor = orange;
        }
        if (residue[i] % 20 === 5) {
            const purple = new BABYLON.Color3(0.5, 0, 0.5);
            material.diffuseColor = purple;
        }
        if (residue[i] % 20 === 6) {
            const brown = new BABYLON.Color3(0.5, 0.25, 0);
            material.diffuseColor = brown;
        }
        if (residue[i] % 20 === 7) {
            const pink = new BABYLON.Color3(1, 0, 1);
            material.diffuseColor = pink;
        }
        if (residue[i] % 20 === 8) {
            const teal = new BABYLON.Color3(0, 1, 1);
            material.diffuseColor = teal;
        }
        if (residue[i] % 20 === 9) {
            const maroon = new BABYLON.Color3(0.5, 0, 0);
            material.diffuseColor = maroon;
        }
        if (residue[i] % 20 === 10) {
            const cyan = new BABYLON.Color3(0,0.863,0.992);
            material.diffuseColor = cyan;
        }
        if (residue[i] % 20 === 11) {
            const magenta = new BABYLON.Color3(1,0,0.5);
            material.diffuseColor = magenta;
        }
        if (residue[i] % 20 === 12) {
            const lime = new BABYLON.Color3(0.047,0.302,0.059);
            material.diffuseColor = lime;
        }
        if (residue[i] % 20 === 13) {
            const olive = new BABYLON.Color3(0.5,0.5,0);
            material.diffuseColor = olive;
        }
        if (residue[i] % 20 === 14) {
            const lavender = new BABYLON.Color3(0.902,0.902,0.980);
            material.diffuseColor = lavender;
        }
        if (residue[i] % 20 === 15) {
            const muave = new BABYLON.Color3(0.5,0,0.5);
            material.diffuseColor = muave;
        }
        if (residue[i] % 20 === 16) {
            const umber = new BABYLON.Color3(0.5,0.25,0.25);
            material.diffuseColor = umber;
        }
        if (residue[i] % 20 === 17) {
            const murk = new BABYLON.Color3(0.5,0.3,0.5);
            material.diffuseColor = murk;
        }
        if (residue[i] % 20 === 18) {
            const navy = new BABYLON.Color3(0,0,0.5);
            material.diffuseColor = navy;
        }
        if (residue[i] % 20 === 19) {
            const peach = new BABYLON.Color3(1,0.843,0.843);
            material.diffuseColor = peach;
        }

        highlightMesh(caMolecule, scene, new BABYLON.Color3(1,1,1));

    }



    //calculationg the center of mass of the molecule for rotations
    const center = new BABYLON.Vector3(sumX/x.length, sumY/y.length, sumZ/z.length);
    const centerX = new BABYLON.Vector3(sumX/x.length, 0, 0);
    const centerY = new BABYLON.Vector3(0, sumY/y.length, 0);



    //Creates lines based off of residue number for all atoms in the PDB file
    const lines: BABYLON.LinesMesh[] = []; 
    for (let j = 0; j < residue.length; j++) {
        if (residue[j] === residue[j + 1]) {
            const line = BABYLON.MeshBuilder.CreateLines("lines", {points: [
                new BABYLON.Vector3(x[j], y[j] + 50, z[j]),
                new BABYLON.Vector3(x[j + 1], y[j + 1] + 50, z[j + 1])
            ], updatable: true}, scene);
            if (residue[j] % 20 === 0) {
                const red = new BABYLON.Color3(1, 0, 0);
                line.color = red;
            }
            if (residue[j] % 20 === 1) {
                const blue = new BABYLON.Color3(0, 0, 1);
                line.color = blue;
            }
            if (residue[j] % 20 === 2) {
                const yellow = new BABYLON.Color3(1, 1, 0);
                line.color = yellow;
            }
            if (residue[j] % 20 === 3) {
                const green = new BABYLON.Color3(0, 1, 0);
                line.color = green;
            }
            if (residue[j] % 20 === 4) {
                const orange = new BABYLON.Color3(1, 0.5, 0);
                line.color = orange;
            }
            if (residue[j] % 20 === 5) {
                const purple = new BABYLON.Color3(0.5, 0, 0.5);
                line.color = purple;
            }
            if (residue[j] % 20 === 6) {
                const brown = new BABYLON.Color3(0.5, 0.25, 0);
                line.color = brown;
            }
            if (residue[j] % 20 === 7) {
                const pink = new BABYLON.Color3(1, 0, 1);
                line.color = pink;
            }
            if (residue[j] % 20 === 8) {
                const teal = new BABYLON.Color3(0, 1, 1);
                line.color = teal;
            }
            if (residue[j] % 20 === 9) {
                const maroon = new BABYLON.Color3(0.5, 0, 0);
                line.color = maroon;
            }
            if (residue[j] % 20 === 10) {
                const cyan = new BABYLON.Color3(0,0.863,0.992);
                line.color = cyan;
            }
            if (residue[j] % 20 === 11) {
                const magenta = new BABYLON.Color3(1,0,0.5);
                line.color = magenta;
            }
            if (residue[j] % 20 === 12) {
                const lime = new BABYLON.Color3(0.047,0.302,0.059);
                line.color = lime;
            }
            if (residue[j] % 20 === 13) {
                const olive = new BABYLON.Color3(0.5,0.5,0);
                line.color = olive;
            }
            if (residue[j] % 20 === 14) {
                const lavender = new BABYLON.Color3(0.902,0.902,0.980);
                line.color = lavender;
            }
            if (residue[j] % 20 === 15) {
                const muave = new BABYLON.Color3(0.5,0,0.5);
                line.color = muave;
            }
            if (residue[j] % 20 === 16) {
                const umber = new BABYLON.Color3(0.5,0.25,0.25);
                line.color = umber;
            }
            if (residue[j] % 20 === 17) {
                const murk = new BABYLON.Color3(0.5,0.3,0.5);
                line.color = murk;
            }
            if (residue[j] % 20 === 18) {
                const navy = new BABYLON.Color3(0,0,0.5);
                line.color = navy;
            }
            if (residue[j] % 20 === 19) {
                const peach = new BABYLON.Color3(1,0.843,0.843);
                line.color = peach;
            }
        }
    }

   




    //const toggle = BABYLON.MeshBuilder.CreateSphere("toggle", {diameter: 0.05}, scene);
    const toggle = BABYLON.MeshBuilder.CreateGeodesic("toggle", {size: 0.03}, scene)
    const material = new BABYLON.StandardMaterial("toggle", scene);
    material.diffuseColor = BABYLON.Color3.White();
    toggle.material = material;
    const followBehavior = new BABYLON.FollowBehavior();
    followBehavior.attach(toggle);
    toggle.checkCollisions = true;
    const rotating = false; //variable to keep track of whether or not the molecule is rotating
    camera.minZ = 0.3;



    const manager = new GUI.GUI3DManager(scene);
    const panel = new GUI.PlanePanel();
    panel.margin = 0.1;
    manager.addControl(panel);



    //temporary, eventually change to a dynamically moved position based off of user input
    panel.position = new BABYLON.Vector3(0, 50, 0);
    panel.rows = 4;
    panel.columns = 4;



    //function to create a holographic button
    function addButton(text: string) {
        const button = new GUI.HolographicButton(text);
        panel.addControl(button);
        button.text = text;
      }



    //create buttons with function calls
    panel.blockLayout = true;
    let moleculeHidden = false; //variable to keep track of whether or not the molecule is hidden
    


    const rotateYButton = new GUI.HolographicButton("rotateY");
    rotateYButton.text = "Positive Y";
    rotateYButton.onPointerUpObservable.add(() => {
        for (let i = 0; i < caMolecule.length; i++) {
            caMolecule[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,1,0), 0.1);
        }
    })
    panel.addControl(rotateYButton); 






    const rotateXButton = new GUI.HolographicButton("rotateX");
    rotateXButton.text = "Positive X";
    rotateXButton.onPointerUpObservable.add(() => {
        for (let i = 0; i < caMolecule.length; i++) {
            caMolecule[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,0,0), 0.1);
        }
    })
    panel.addControl(rotateXButton); 






    const rotateYNegativeButton = new GUI.HolographicButton("rotateY");
    rotateYNegativeButton.text = "Negative Y";
    rotateYNegativeButton.onPointerUpObservable.add(() => {
        for (let i = 0; i < caMolecule.length; i++) {
            caMolecule[i].rotateAround(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,1,0), -0.1);

            //rotates line meshes around y axis
            for (let j = 0; j < lines.length; j++) {
                lines[j].rotation.y += 0.1;
            }

        }
    })
    panel.addControl(rotateYNegativeButton); 





    //button for rotating in the neagtive x direction
    const rotateXNegativeButton = new GUI.HolographicButton("rotateX");
    rotateXNegativeButton.text = "Negative X";
    if (moleculeHidden === false) {
        rotateXNegativeButton.onPointerUpObservable.add(() => {
            for (let i = 0; i < caMolecule.length; i++) {
                caMolecule[i].rotateAround(new BABYLON.Vector3(0,0,0), centerX, -0.1);
            }
        })
    }
    panel.addControl(rotateXNegativeButton); 





    //button to display only the residue lines 
    const linesOnly = new GUI.HolographicButton("linesOnly");
    linesOnly.text = "Lines Only";
    linesOnly.onPointerUpObservable.add(() => {
        for (let i = 0; i < caMolecule.length; i++) {  
            caMolecule[i].isVisible = !caMolecule[i].isVisible;
            moleculeHidden = !moleculeHidden;
        }
    });
    panel.addControl(linesOnly);





    //button to show only the CA atoms
    const caOnly = new GUI.HolographicButton("CA Only");
    caOnly.text = "CA Only";
    caOnly.onPointerUpObservable.add(() => {
        //disposes a mesh if the atom name is not CA
        for (let i = 0; i < caMolecule.length; i++) {
            const aNum = i.toString();
            if (caMolecule[i].name !== (" CA " + aNum)) {
                caMolecule[i].isVisible = !caMolecule[i].isVisible;
            }
        }
    });
    panel.addControl(caOnly);



    for (let i = 0; i < panel.children.length; i++) {
    panel.children[i].isVisible = false;
    } 



    const manager2 = new GUI.GUI3DManager(scene);
    const atomPanel = new GUI.PlanePanel();
    atomPanel.margin = 0.1;
    manager.addControl(atomPanel);



    //temporary, eventually change to a dynamically moved position based off of user input
    atomPanel.position = new BABYLON.Vector3(0, 50, 0);
    atomPanel.rows = 4;
    atomPanel.columns = 4;



    for (let i = 0; i < panel.children.length; i++) {
        panel.children[i].isVisible = false;
        } 
    


    //display menu when "M" is clicked, and includes all other buttons
    scene.onPointerDown = function castRayToggle(){
      const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);
    


      const hit = scene.pickWithRay(ray);



      //loop to determine the left most atom to diplay the slate to the left later on
        let leftMost = new BABYLON.Vector3(0,0,0); 
        for (let i = 0; i < x.length; i++) {
        if (x[i] < leftMost.x) {
            leftMost = new BABYLON.Vector3(x[i], y[i], z[i]);
            }
        }
        console.log(leftMost);





      if (hit?.pickedMesh && hit.pickedMesh.name === "toggle") {
            for (let i = 0; i < panel.children.length; i++) {
              panel.children[i].isVisible = !panel.children[i].isVisible;
              panel.position = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z + 5);
              atomPanel.isVisible = false; //hide atom panel when menu is displayed
            }
        }
        


        //displays popup when an atom is clicked
        for (let i = 0; i < caMolecule.length; i++) {
            if (hit?.pickedMesh && hit.pickedMesh.name === caMolecule[i].name) {
                for (let j = 0; j < atomPanel.children.length; j++) {
                    atomPanel.children[j].dispose(); //empty the atom panel so that only the clicked atom is displayed
                }
                const newButton = new GUI.HolographicSlate("dialogSlate");
                newButton.dimensions = new BABYLON.Vector2(0.3,0.3); 
                const rNum = residue[i].toString(); 
                const text = new GUI.TextBlock("text", ("Residue Number: " + rNum + "\nResidue Name: " + residueName[i] +  "\nAtom Name: " + atomName[i]));
                text.color = "white";
                text.fontSize = "40px";
                text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                //add text block to the slate
                newButton.content = text;
                atomPanel.addControl(newButton);
                //position atom panel above clicked atom
                atomPanel.position = new BABYLON.Vector3(leftMost.x,40,0);
            }
        }
    }
}


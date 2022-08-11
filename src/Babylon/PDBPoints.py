import os
import json
from unittest.mock import CallableMixin


IDtoHelix = {}


##coordinates for each coordinate
IDtoPoints = {}

IDtoHetatoms = {"x": [], "y": [], "z": [],"s": []}
x = []
y = []
z = []
resNumber = []
resName = []
atom_name = []
caX = []
caY = []
caZ = []
caResNum = []
caResName = []
ca_Atom_name = []




def processPDB(PDBPath, coordinatePath):
    PDB = open(PDBPath, "r")

    
    with open(coordinatePath, "w") as file:
        for line in PDB:
            if line[0:4] == "ATOM":
                residue_number = line[22:26]
                resNumber.append(residue_number)
                file.write(line[22:26] + " ")
                resName.append(line[17:20])
                atom_name.append(line[12:16])
                x_coordinate = (line[30:38])
                x.append(x_coordinate)
                y_coordinate = (line[38:46])
                y.append(y_coordinate)
                z_coordinate = (line[46:54])
                z.append(z_coordinate)
                file.write(x_coordinate)
                file.write(" ")
                file.write(y_coordinate)
                file.write(" ")
                file.write(z_coordinate)
                file.write("\n")

            if line[0:4] == "ATOM" and line [12:16] == " CA ":
                caX.append(line[30:38])
                caY.append(line[38:46])
                caZ.append(line[46:54])
                caResNum.append(line[22:26])
                caResName.append(line[17:20])
                ca_Atom_name.append(line[12:16])
    
    PDB.close()

#outputs to text file
processPDB("3nir.pdb", "coordinate.txt")

#data as a json object
record = {
    'x': x,
    'y': y,
    'z': z,
    'resNumber': resNumber,
    'resName': resName,
    'atom_name': atom_name,
    'caX': caX,
    'caY': caY,
    'caZ': caZ,
    'caResNumber': caResNum,
    'caResName': caResName,
    'ca_Atom_name': ca_Atom_name
}

#passing data to json file
j = json.dumps(record)
with open("coordinate.json", "w") as f: 
    f.write(j)
    f.close()
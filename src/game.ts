import utils from "../node_modules/decentraland-ecs-utils/index"

import {Elevator} from "../sysponents/elevator";
import {Doors} from "../sysponents/doors";

// entity creators
log("Material creation functions loading...");

function makeMaterial(hexcolor, metallic, roughness) {
    const material = new Material()
    material.albedoColor = Color3.FromHexString(hexcolor); // todo: check for # symbol and handle
    material.metallic = metallic
    material.roughness = roughness;
    return material;
}

log("Material creation functions loaded.");

let greenGlowMat = makeMaterial("#00AA00", .4, .7);
let redGlowMat = makeMaterial("#AA0000", .4, .7);
let metalDkStlMat = makeMaterial("#a09ca1", .9, .3);
let blockMat = makeMaterial("#ccc4a4", 0.2, .5);
let ceilingMat = makeMaterial("#ccc7ab", 0.2, .5);
let bridgeMat = makeMaterial("#4d3734", 0.2, .5);
const greenMetalMat = makeMaterial("#138326", .9, .1);
const goldMetalMat = makeMaterial("#bfb017", .9, .2);
const darkMetalMat = makeMaterial("#747051", .9, .2);
const redMetalMat = makeMaterial("#830000", .9, .1);
const blueMetalMat = makeMaterial("#0c1e83", .9, .1);
let greenMetalTrimMat = makeMaterial("#2f5d31", .9, .0);

//guest floor
const poolDoorMaterial = makeMaterial("#386483", .9, .1);
const hotTubDoorMaterial = makeMaterial("#831a13", .9, .1);
const suiteDoorMaterial = makeMaterial("#341b1a", .6, .7);
const suiteFloorMaterial = makeMaterial("#c2ac94", .1, .7);
const suiteWallMaterial = makeMaterial("#aea990", .1, .7);
const bedMat = makeMaterial("#c1a586", 0, .7);
const couchMat = makeMaterial("#aea990", 0, .7);
const canvas = new UICanvas();
const message = new UIText(canvas);
message.fontSize = 15;
message.width = 120;
message.height = 30;
message.vAlign = 'bottom';
message.positionX = -80;


function uilog(msg)
{
    message.value = msg;
}

function color4HexAlpha(hcolor, alpha)
{
    let r = 0;
    let g = 0;
    let b = 0;

    let colors = [];
    if(hcolor.length === 6)
    {
        colors[0] = parseInt("0x"+hcolor.substring(0,1));
        colors[1] = parseInt("0x"+hcolor.substring(2,3));
        colors[2] = parseInt("0x"+hcolor.substring(4,5));

    }
    else if(hcolor.length === 7)
    {
        colors[0] = parseInt("0x"+hcolor.substring(1,2));
        colors[1] = parseInt("0x"+hcolor.substring(3,4));
        colors[2] = parseInt("0x"+hcolor.substring(5,6));
    }

    r = colors[0]/16;
    g = colors[1]/16;
    b = colors[2]/16;

    let newColor = new Color4(r,g,b,alpha);
    return newColor;
}

const lobbyDoorGlass1 = color4HexAlpha("#305d32",.5);
let glassWall = new Material();
glassWall.transparencyMode = 2;
glassWall.albedoColor = lobbyDoorGlass1;
glassWall.metallic = .9;
glassWall.roughness = .2;

const greenDim = new Color4(.1,.5, .1, .3);
const greenBrt = new Color4(.4,1, .4, .6);

const redDim = new Color4(.5,.1, .1, .3);
const redBrt = new Color4(1,.4, .4, .6);

const glassGreen = new Material();
glassGreen.transparencyMode = 2;
glassGreen.albedoColor = greenDim;
glassGreen.metallic = .2;
glassGreen.roughness = .6;

const glassRed = new Material();
glassRed.transparencyMode = 2;
glassRed.albedoColor = redDim;
glassRed.metallic = .2;
glassRed.roughness = .6;



log("Building functions loading...");

function makeBlock(cpx, cpy, cpz, sx, sy, sz, optMaterial, optEastWest) {
    if (optEastWest) {
        let tcpx = cpx;
        let tsx = sx;
        cpx = cpz;
        sx = sz;
        cpz = tcpx;
        sz = tsx;
    }
    const newblock = new Entity();
    newblock.addComponent(new Transform(
        {
            position: new Vector3(cpx, cpy, cpz),
            scale: new Vector3(sx, sy, sz)
        }));
    newblock.addComponent(new BoxShape());
    engine.addEntity(newblock);

    if (optMaterial) {
        try {
            newblock.addComponent(optMaterial);
        } catch {
            // log error
        }
    }

    return newblock;
}

log("Building functions loaded");

log("Filling lobby fountain pool...");
const grassMat = makeMaterial("#26583c", .9, .6);
let floor = makeBlock(8, 0.005, 8, 16, .01, 16, grassMat, false);
log("Lobby fountain filled.");

log("Lobby fountain water creation...");

const blueWaterColor = new Color4(.1,.4, .7, .6);
const blueWater = new Material();
blueWater.transparencyMode = 2;
blueWater.albedoColor = blueWaterColor;
blueWater.metallic = .2;
blueWater.roughness = .6;

let lobbyWaterFound = makeBlock(8, .2, 8, 4, .1, 4, goldMetalMat, false);
let lobbyWater = makeBlock(8, .4, 8, 4, .4, 4, blueWater, false);


log("Lobby fountain water complete...");

log("Ground floor being made...");

const groundFloorBlocks = [];

let blockDims =
    [
        [8, .5, 4.5, 10, 1, 3, blockMat], //main floor blocks
        [4.5, .5, 8, 3, 1, 4, blockMat],
        [11.5, .5, 8, 3, 1, 4, blockMat],
        [8, .5, 11.5, 10, 1, 3, blockMat],

        [8, 1.25, 8, 2, .25, 2, blockMat], // el platform

        [8, 5.1, 4.5, 10, .2, 3, blockMat], // main floor ceiling
        [4.5, 5.1, 8, 3, .2, 4, blockMat], //
        [11.5, 5.1, 8, 3, .2, 4, blockMat],
        [8, 5.1, 11.5, 10, .2, 3, blockMat],
    ];

for (let i = 0; i < blockDims.length; i++) {
    groundFloorBlocks.push(makeBlock(blockDims[i][0], blockDims[i][1], blockDims[i][2], blockDims[i][3], blockDims[i][4], blockDims[i][5], blockDims[i][6], false));
}

log("Ground floor complete.");

log("Creating ground floor walls...");

const groundFloorWalls = [];

uilog("--------------"+lobbyDoorGlass1.a);

let groundFloorWallDims =
    [
        [5, 3, 3.05, 4, 4, .1, glassWall, true],
        [11, 3, 3.05, 4, 4, .1, glassWall, true],
        [5, 3, 12.95, 4, 4, .1, glassWall, true],
        [11, 3, 12.95, 4, 4, .1, glassWall, true],

        [5, 3, 3.05, 4, 4, .1, glassWall, false],
        [11, 3, 3.05, 4, 4, .1, glassWall, false],
        [5, 3, 12.95, 4, 4, .1, glassWall, false],
        [11, 3, 12.95, 4, 4, .1, glassWall, false]
    ];

for (let i = 0; i < groundFloorWallDims.length; i++) {
    groundFloorWalls.push(makeBlock(groundFloorWallDims[i][0], groundFloorWallDims[i][1], groundFloorWallDims[i][2], groundFloorWallDims[i][3], groundFloorWallDims[i][4], groundFloorWallDims[i][5], groundFloorWallDims[i][6], groundFloorWallDims[i][7]));
}


log("Ground floor walls complete");


log("Lobby doors being made...");



let doorMan = new Doors();
const greenDoor = doorMan.newFlippyDoor(2, 4, 8, 3, 3.025, metalDkStlMat, greenMetalTrimMat, false); // S
const goldDoor = doorMan.newFlippyDoor(2, 4, 8, 3, 12.975, metalDkStlMat, greenMetalTrimMat, false); // N
const redDoor = doorMan.newFlippyDoor(2, 4, 3.025, 3, 8, metalDkStlMat, greenMetalTrimMat, true); // W
const blueDoor = doorMan.newFlippyDoor(2, 4, 12.975, 3, 8, metalDkStlMat, greenMetalTrimMat, true); // E
log("Lobby doors complete.");

const groundFloorBridges = [];
let bridgeDims =
    [
        [6.25, .9, 8, .5, .1, .5, bridgeMat],
        [6.75, 1.2, 8, .5, .1, .5, bridgeMat],

        [9.25, 1.2, 8, .5, .1, .5, bridgeMat],
        [9.75, .9, 8, .5, .1, .5, bridgeMat],
    ];

for (let i = 0; i < bridgeDims.length; i++) {
    groundFloorBridges.push(makeBlock(bridgeDims[i][0], bridgeDims[i][1], bridgeDims[i][2], bridgeDims[i][3], bridgeDims[i][4], bridgeDims[i][5], bridgeDims[i][6], false));
}

// outside stairs
const outsideStairs = [];
let oustideStairDims = [];

for (let x = 0; x < 1.2; x += .4) {
    oustideStairDims.push([2 + x, x * .75, 8, .5, .1, 2, bridgeMat]);
    oustideStairDims.push([14 - x, x * .75, 8, .5, .1, 2, bridgeMat]);
    oustideStairDims.push([8, x * .75, 2 + x, 2, .1, .5, bridgeMat]);
    oustideStairDims.push([8, x * .75, 14 - x, 2, .1, .5, bridgeMat]);

}

for (let i = 0; i < oustideStairDims.length; i++) {
    outsideStairs.push(makeBlock(oustideStairDims[i][0], oustideStairDims[i][1], oustideStairDims[i][2], oustideStairDims[i][3], oustideStairDims[i][4], oustideStairDims[i][5], oustideStairDims[i][6], false));
}

// end outside stairs

// el platform
let lplat = makeBlock(8, 1.5, 8, 2, .125, 2, darkMetalMat, false);
let elDir = 1;
let elGo = false;
let elInc = .04;
let camera = Camera.instance;
let camiFeet = camera.feetPosition;


let elLowStop = 1.4;
let guestFloors = 0;
let guestFloorHeight = 6;
let topOfLobby = 6.5;

let elCycle = new utils.Interval(10, () => {
    if (elGo) {
        let elTransf = lplat.getComponent(Transform);
        let elAlt = elTransf.position.y;
        let topstop = topOfLobby + (guestFloorHeight * guestFloors);
        if (elAlt >= elLowStop && elAlt <= topstop) {
            let distance = Vector3.Up().scale(elDir * elInc);
            elTransf.translate(distance);
        } else {
            elGo = false;
            if (elAlt < elLowStop) {
                elTransf.position.y = elLowStop;
            } else if (elAlt > topstop) {
                elTransf.position.y = topstop;
            }
        }
    }
});

lplat.addComponent(elCycle);


function makeNewGuestFloor() {
    guestFloors++;
    let newFloorY = guestFloors * guestFloorHeight + .25;
    let newDoorSy = guestFloors * guestFloorHeight + 1.75; // 1.5 + .25 flooe height



//	const elLobbylDoor = doorMan.newSlidingDoor(2, 3, 10, newDoorSy, 8, suiteDoorMaterial, 90);
//	const elLobbyDoor = doorMan.newSlidingDoor(2, 3, 6, newDoorSy, 8, suiteDoorMaterial, 90);

    //doors at end of el lobby
//	const hotDoor = doorMan.newSlidingDoor(2, 3, 10, newDoorSy, 11, hotTubDoorMaterial, 90);
//	const coldDoor = doorMan.newSlidingDoor(2, 3, 6, newDoorSy, 11, poolDoorMaterial, 90);

    const guestFloorBlocks = [];
    let guestFloorDims =
        [
            [8, newFloorY, 4.5, 10, .5, 5, suiteFloorMaterial], //guest floor blocks
            [8, newFloorY, 11.5, 10, .5, 5, suiteFloorMaterial],

            [5, newFloorY, 8, 4, .5, 2, suiteFloorMaterial],
            [11, newFloorY, 8, 4, .5, 2, suiteFloorMaterial],

            [2, newFloorY, 8, 2, .5, 14, suiteFloorMaterial], //patio floor blocks
            [14, newFloorY, 8, 2, .5, 14, suiteFloorMaterial],
            [8, newFloorY, 2, 12, .5, 2, suiteFloorMaterial],
            [8, newFloorY, 14, 12, .5, 2, suiteFloorMaterial],

        ];
    for (let i = 0; i < guestFloorDims.length; i++) {
        guestFloorBlocks.push(makeBlock(guestFloorDims[i][0], guestFloorDims[i][1], guestFloorDims[i][2], guestFloorDims[i][3], guestFloorDims[i][4], guestFloorDims[i][5], guestFloorDims[i][6], false));
    }

    const guestWalls = [];

    let guestWallDims =
        [
            [8, newDoorSy, 9.95, 4, 3, .1, blockMat, false], // lobby
            [8, newDoorSy, 6.05, 4, 3, .1, blockMat, false],

            [6, newDoorSy, 6.5, .1, 3, 1, blockMat, false],
            [6, newDoorSy, 9.5, .1, 3, 1, blockMat, false],
            [10, newDoorSy, 6.5, .1, 3, 1, blockMat, false],
            [10, newDoorSy, 9.5, .1, 3, 1, blockMat, false],

            [8, newFloorY + .5, 1.05, 14, 1, .1, blockMat, false], //rails
            [8, newFloorY + .5, 14.95, 14, 1, .1, blockMat, false],
            [1.05, newFloorY + .5, 8, .1, 1, 14, blockMat, false],
            [14.95, newFloorY + .5, 8, .1, 1, 14, blockMat, false],


            [6, newDoorSy, 13, .1, 3, 2, blockMat, false],
            [8, newDoorSy, 13.95, 4, 3, .1, blockMat, false],
            [10, newDoorSy, 13, .1, 3, 2, blockMat, false],

            [11, newFloorY + .75, 3.5, 4, 1, 2.5, bedMat, false], //bed

            [4.5, newFloorY + .5, 2.5, 5, 1, 1, couchMat, false], //couch

        ];

    for (let i = 0; i < guestWallDims.length; i++) {
        guestWalls.push(makeBlock(guestWallDims[i][0], guestWallDims[i][1], guestWallDims[i][2], guestWallDims[i][3], guestWallDims[i][4], guestWallDims[i][5], guestWallDims[i][6], guestWallDims[i][7]));
    }

}


let onClickAddFloor = new OnClick(e => {
    elDir = -1;
    elGo = true;
    makeNewGuestFloor();
});
let addFloorButton1 = makeBlock(6, 2.2, 7, .1, .4, .3, goldMetalMat, false);
let addFloorButton2 = makeBlock(10, 2.2, 9, .1, .4, .3, goldMetalMat, false);
addFloorButton1.addComponentOrReplace(onClickAddFloor);
addFloorButton2.addComponentOrReplace(onClickAddFloor);


let clickCallEl = new OnClick(e => {
    elDir = -1;
    elGo = true;
});
let callElButton1 = makeBlock(6, 2.2, 7.5, .1, .4, .3, darkMetalMat, false);
let callElButton2 = makeBlock(10, 2.2, 8.5, .1, .4, .3, darkMetalMat, false);
callElButton1.addComponentOrReplace(clickCallEl);
callElButton2.addComponentOrReplace(clickCallEl);


function onEl() {
    camiFeet = camera.feetPosition;
    if (camiFeet.z > 6 && camiFeet.z < 10) {
        if (camiFeet.x > 6 && camiFeet.x < 10) {
            return true;
        }
    }
    return false;
}


let colorRatio = 0;

let uprrow = makeBlock(.42, 15, .42, .1, 4, .1, glassGreen, false);
let ucap1 = makeBlock(.42, 12.5, .42, .1, 1, .1, metalDkStlMat, false);
let ucap2 = makeBlock(.42, 17.5, .42, .1, 1, .1, metalDkStlMat, false);
uprrow.setParent(lplat);
ucap1.setParent(lplat);
ucap2.setParent(lplat);
let clickUprrow = new OnClick(e => {
    if (onEl()) {
        elDir = 1;
        elGo = true;
    }
});
uprrow.addComponentOrReplace(clickUprrow);
engine.addEntity(uprrow);

let stopel = makeBlock(.42, 10, .42, .1, 4, .1, darkMetalMat, false);
stopel.setParent(lplat);
let clickStop = new OnClick(e => {
    if (onEl()) {
        elGo = false;
    }
});
stopel.addComponentOrReplace(clickStop);
engine.addEntity(stopel);


let downrrow = makeBlock(.42, 5, .42, .1, 4, .1, glassRed, false);
let dcap1 = makeBlock(.42, 2.5, .42, .1, 1, .1, metalDkStlMat, false);
let dcap2 = makeBlock(.42, 7.5, .42, .1, 1, .1, metalDkStlMat, false);
downrrow.setParent(lplat);
dcap1.setParent(lplat);
dcap2.setParent(lplat);
let clickDownrrow = new OnClick(e => {
    if (onEl()) {
        elDir = -1;
        elGo = true;
    }
});
downrrow.addComponentOrReplace(clickDownrrow);
engine.addEntity(downrrow);

// trigger zone for elevator lights. elevator shaft + 1m

// for control in controls in main lobby. add the glow lighting

let elLiteTiming = 0.1;
let elLiteDimmer = 1;

let updateCycle = 3;
let updnow = 0;

export class LobbyElCycle implements ISystem {
    update(dt: number)
    {

        if(updnow >= updateCycle)
        {


            if (camiFeet.x > 5 && camiFeet.x < 11 && camiFeet.z > 5 && camiFeet.z < 11)
            {
                glassGreen.albedoColor = greenBrt;
                glassRed.albedoColor = redBrt;

                if(!onEl())
                {
                    if(colorRatio >= 1)
                    {
                        elLiteDimmer = -1;
                    }
                    else if(colorRatio <= 0)
                    {
                        elLiteDimmer = 1;
                    }

                    let ratioAdj = elLiteDimmer * elLiteTiming;
                    addFloorButton1.getComponent(Transform).position.y += ratioAdj*.1;
                    addFloorButton2.getComponent(Transform).position.y += ratioAdj*.1;
                    callElButton1.getComponent(Transform).position.y += ratioAdj*.1;
                    callElButton2.getComponent(Transform).position.y += ratioAdj*.1;
                    colorRatio += ratioAdj;
                }
                else
                {
                    colorRatio = 1;
                }

            }
            else
            {
                glassGreen.albedoColor = greenDim;
                glassRed.albedoColor = redDim;
            }
            updnow = 0;
        }
        updnow++;
    }
}

engine.addSystem(new LobbyElCycle());


//engine.addEntity(myEntity);

// end el platform lpat

















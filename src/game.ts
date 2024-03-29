import utils from "../node_modules/decentraland-ecs-utils/index"

import {Elevator} from "../sysponents/elevator"; // todo: move elevator from here to there
import {Mats} from "../sysponents/materials";
import {PlainDoor} from "../sysponents/doors";
import {Blox} from "../sysponents/blocks";
import {Fountain} from "../sysponents/fountain";
import {GuestFloor} from "../sysponents/guestfloor";

const canvas = new UICanvas();
const message = new UIText(canvas);
message.fontSize = 15;
message.width = 120;
message.height = 30;
message.vAlign = 'bottom';
message.positionX = -80;


function uilog(msg) {
    message.value = msg;
}

// entity creators
log("Material creation functions loading...");

let mats = new Mats();

log("Building functions loading...");

let blox = new Blox();

log("Building functions loaded");

const grassMat = mats.makeMaterial("#26583c", .9, .6);
let floor = blox.makeBlock(8, 0.005, 8, 16, .01, 16, grassMat);


log("Lobby doors being made...");
let lobbyDoorN = new PlainDoor(2, 4, 8, 3, 3.025, mats.lobbyDoor, true);
let lobbyDoorS = new PlainDoor(2, 4, 8, 3, 12.975, mats.lobbyDoor, true);
let lobbyDoorW = new PlainDoor(2, 4, 3.025, 3, 8, mats.lobbyDoor, false);
let lobbyDoorE = new PlainDoor(2, 4, 12.975, 3, 8, mats.lobbyDoor, false);
log("Lobby doors complete.");




log("Lobby fountain water creation...");

blox.makeBlock(8, .2, 8, 4, .1, 4, mats.blueMetalMat);
let fount = new Fountain();
let fountain = fount.newFountain(6, .2, 6, 10,.5, 10, 32);

log("Lobby fountain water complete...");


log("Ground floor being made...");

const groundFloorBlocks = [];

let blockDims =
    [
        [8, .5, 4.5, 10, 1, 3, mats.blockMat], //main floor blocks
        [4.5, .5, 8, 3, 1, 4, mats.blockMat],
        [11.5, .5, 8, 3, 1, 4, mats.blockMat],
        [8, .5, 11.5, 10, 1, 3, mats.blockMat],

   //     [8, 1.25, 8, 2, .25, 2, mats.elBaseMat], // el platform

        [8, 5.1, 4.5, 10, .2, 3, mats.glassWall], // main floor ceiling
        [4.5, 5.1, 8, 3, .2, 4, mats.glassWall], //
        [11.5, 5.1, 8, 3, .2, 4, mats.glassWall],
        [8, 5.1, 11.5, 10, .2, 3, mats.glassWall],
    ];

for (let i = 0; i < blockDims.length; i++) {
    groundFloorBlocks.push(blox.makeBlock(blockDims[i][0], blockDims[i][1], blockDims[i][2], blockDims[i][3], blockDims[i][4], blockDims[i][5], blockDims[i][6]));
}

log("Ground floor complete.");

log("Creating ground floor walls...");

const groundFloorWalls = [];


let groundFloorWallDims =
    [
        [5, 3, 3.05, 4, 4, .1, mats.glassWall],
        [11, 3, 3.05, 4, 4, .1, mats.glassWall],
        [5, 3, 12.95, 4, 4, .1, mats.glassWall],
        [11, 3, 12.95, 4, 4, .1, mats.glassWall],

        [3.05, 3, 5, .1, 4, 4, mats.glassWall],
        [3.05, 3, 11, .1, 4, 4, mats.glassWall],
        [12.95, 3, 5, .1, 4, 4, mats.glassWall],
        [12.95, 3, 11, .1, 4, 4, mats.glassWall]
    ];

for (let i = 0; i < groundFloorWallDims.length; i++) {
    groundFloorWalls.push(blox.makeBlock(groundFloorWallDims[i][0], groundFloorWallDims[i][1], groundFloorWallDims[i][2], groundFloorWallDims[i][3], groundFloorWallDims[i][4], groundFloorWallDims[i][5], groundFloorWallDims[i][6]));
}

log("Ground floor walls complete");

const groundFloorBridges = [];
let bridgeDims =
    [
        [6.25, .9, 8, .5, .1, .5, mats.bridgeMat],
        [6.75, 1.2, 8, .5, .1, .5, mats.bridgeMat],

        [9.25, 1.2, 8, .5, .1, .5, mats.bridgeMat],
        [9.75, .9, 8, .5, .1, .5, mats.bridgeMat],
    ];

for (let i = 0; i < bridgeDims.length; i++) {
    groundFloorBridges.push(blox.makeBlock(bridgeDims[i][0], bridgeDims[i][1], bridgeDims[i][2], bridgeDims[i][3], bridgeDims[i][4], bridgeDims[i][5], bridgeDims[i][6]));
}

// outside stairs
const outsideStairs = [];
let oustideStairDims = [];

for (let x = 0; x < 1.2; x += .4) {
    oustideStairDims.push([2 + x, x * .75, 8, .5, .1, 2, mats.bridgeMat]);
    oustideStairDims.push([14 - x, x * .75, 8, .5, .1, 2, mats.bridgeMat]);
    oustideStairDims.push([8, x * .75, 2 + x, 2, .1, .5, mats.bridgeMat]);
    oustideStairDims.push([8, x * .75, 14 - x, 2, .1, .5, mats.bridgeMat]);

}

for (let i = 0; i < oustideStairDims.length; i++) {
    outsideStairs.push(blox.makeBlock(oustideStairDims[i][0], oustideStairDims[i][1], oustideStairDims[i][2], oustideStairDims[i][3], oustideStairDims[i][4], oustideStairDims[i][5], oustideStairDims[i][6]));
}

// end outside stairs

// el platform
let lplat = blox.makeBlock(8, 1.5, 8, 2, .125, 2, mats.darkMetalMat);
let elDir = 1;
let elGo = false;
let elInc = .04;
let camera = Camera.instance;
let camiFeet = camera.feetPosition;


let elLowStop = 1.4;


let fountainMotion = new Entity();
let waterIdx = 0;
let waterCycle = new utils.Interval(64, () =>
{
    fountain.wave(waterIdx);
    waterIdx++;
    if(waterIdx > 360)
    {
        waterIdx = 1;
    }
});
fountainMotion.addComponent(waterCycle);
engine.addEntity(fountainMotion);

let guestFloors = 0;
let guestFloorHeight = 2.6;
let topOfLobby = 5.5;
let guestFloorCap = 5;

let elCycle = new utils.Interval(10, () => {
    if (elGo) {
        let elTransf = lplat.getComponent(Transform);
        let elAlt = elTransf.position.y;
        let topstop = 2.7 + (guestFloorHeight * guestFloors);
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

let guestFloorsArray = [];

let onClickAddFloorLock = false;
let onClickAddFloor = new OnClick(e => {
    if(!onClickAddFloorLock && guestFloors < guestFloorCap)
    {
        onClickAddFloorLock = true;
        let oldMat = addFloorButton1.getComponent(Material);
        let newMat = mats.aquaMetalMat;
        addFloorButton1.addComponentOrReplace(newMat);
        addFloorButton2.addComponentOrReplace(newMat);
        elDir = -1;
        elGo = true;
        guestFloorsArray.push( new GuestFloor(guestFloors, guestFloorHeight, topOfLobby));
        guestFloors++;
        addFloorButton1.addComponentOrReplace(oldMat);
        addFloorButton2.addComponentOrReplace(oldMat);
        onClickAddFloorLock = false;
    }

});
let addFloorButton1 = blox.makeBlock(6, 2.2, 7, .1, .4, .3, mats.goldMetalMat);
let addFloorButton2 = blox.makeBlock(10, 2.2, 9, .1, .4, .3, mats.goldMetalMat);
addFloorButton1.addComponentOrReplace(onClickAddFloor);
addFloorButton2.addComponentOrReplace(onClickAddFloor);

let clickCallEl = new OnClick(e => {
    elDir = -1;
    elGo = true;
});
let callElButton1 = blox.makeBlock(6, 2.2, 7.5, .1, .4, .3, mats.darkMetalMat);
let callElButton2 = blox.makeBlock(10, 2.2, 8.5, .1, .4, .3, mats.darkMetalMat);
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

let uprrow = blox.makeBlock(.42, 15, .42, .1, 4, .1, mats.glassGreen);
let ucap1 = blox.makeBlock(.42, 12.5, .42, .1, 1, .1, mats.metalDkStlMat);
let ucap2 = blox.makeBlock(.42, 17.5, .42, .1, 1, .1, mats.metalDkStlMat);
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

let stopel = blox.makeBlock(.42, 10, .42, .1, 4, .1, mats.darkMetalMat);
stopel.setParent(lplat);
let clickStop = new OnClick(e => {
    if (onEl()) {
        elGo = false;
    }
});
stopel.addComponentOrReplace(clickStop);
engine.addEntity(stopel);


let downrrow = blox.makeBlock(.42, 5, .42, .1, 4, .1, mats.glassGreen);
let dcap1 = blox.makeBlock(.42, 2.5, .42, .1, 1, .1, mats.metalDkStlMat);
let dcap2 = blox.makeBlock(.42, 7.5, .42, .1, 1, .1, mats.metalDkStlMat);
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
// trigger zone for elevator lights. elevator shaft + 1m
// trigger zone for elevator lights. elevator shaft + 1m

// for control in controls in main lobby. add the glow lighting

let elLiteTiming = 0.1;
let elLiteDimmer = 1;

let updateCycle = 3;
let updnow = 0;

export class LobbyElCycle implements ISystem {
    update(dt: number) {

        if (updnow >= updateCycle) {


            if (camiFeet.x > 4 && camiFeet.x < 12 && camiFeet.z > 4 && camiFeet.z < 12) {
                mats.glassGreen.albedoColor = mats.greenBrt;
                mats.glassRed.albedoColor = mats.redBrt;

                if (!onEl()) {
                    if (colorRatio >= 1) {
                        elLiteDimmer = -1;
                    } else if (colorRatio <= 0) {
                        elLiteDimmer = 1;
                    }

                    let ratioAdj = elLiteDimmer * elLiteTiming;
                    addFloorButton1.getComponent(Transform).position.y += ratioAdj * .1;
                    addFloorButton2.getComponent(Transform).position.y += ratioAdj * .1;
                    callElButton1.getComponent(Transform).position.y += ratioAdj * .1;
                    callElButton2.getComponent(Transform).position.y += ratioAdj * .1;
                    colorRatio += ratioAdj;
                } else {
                    colorRatio = 1;
                }

            } else {
                mats.glassGreen.albedoColor = mats.greenDim;
                mats.glassRed.albedoColor = mats.redDim;
            }
            updnow = 0;
        }
        updnow++;
    }
}

engine.addSystem(new LobbyElCycle());


//engine.addEntity(myEntity);

// end el platform lpat

















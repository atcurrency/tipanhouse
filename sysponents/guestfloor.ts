import utils from "../node_modules/decentraland-ecs-utils/index";
import {Mats} from "./materials";
import {Blox} from "./blocks";

@Component("GuestFloor")
export class GuestFloor {



    constructor(guestFloors, guestFloorHeight, topOfLobby) {
        this.makeNewGuestFloor(guestFloors, guestFloorHeight, topOfLobby);
    }

    removeGuestFloor() {

    }

    public makeNewGuestFloor(guestFloors, guestFloorHeight, topOfLobby)
    {
        let blox = new Blox();
        let mats = new Mats();
     //   let newFloorY = GuestFloor.topOfLobby + GuestFloor.guestFloors * GuestFloor.guestFloorHeight + .25;
      //  let newDoorSy = GuestFloor.topOfLobby + GuestFloor.guestFloors * GuestFloor.guestFloorHeight + 1.75; // 1.5 + .25 floor height

        let newFloorY = topOfLobby + (guestFloors * guestFloorHeight);
        let newDoorSy = newFloorY + (guestFloorHeight / 2);

        let floorThick = .1;
        let wallHeight = guestFloorHeight-(2*floorThick);

//	const elLobbylDoor = doorMan.newSlidingDoor(2, 3, 10, newDoorSy, 8, suiteDoorMaterial, 90);
//	const elLobbyDoor = doorMan.newSlidingDoor(2, 3, 6, newDoorSy, 8, suiteDoorMaterial, 90);

        //doors at end of el lobby
//	const hotDoor = doorMan.newSlidingDoor(2, 3, 10, newDoorSy, 11, hotTubDoorMaterial, 90);
//	const coldDoor = doorMan.newSlidingDoor(2, 3, 6, newDoorSy, 11, poolDoorMaterial, 90);
        let guestFloorBlocks = [];
        let guestFloorDims =
            [
                [8, newFloorY, 4.5, 10, floorThick, 5, mats.suiteFloorMaterial], //guest floor blocks
                [8, newFloorY, 11.5, 10, floorThick, 5, mats.suiteFloorMaterial],

                [5, newFloorY, 8, 4, floorThick, 2, mats.suiteFloorMaterial],
                [11, newFloorY, 8, 4, floorThick, 2, mats.suiteFloorMaterial],

                [2, newFloorY, 8, 2, floorThick, 14, mats.suiteFloorMaterial], //patio floor blocks
                [14, newFloorY, 8, 2, floorThick, 14, mats.suiteFloorMaterial],
                [8, newFloorY, 2, 12, floorThick, 2, mats.suiteFloorMaterial],
                [8, newFloorY, 14, 12, floorThick, 2, mats.suiteFloorMaterial],

            ];
        let guestWalls = [];

        let guestWallDims =
            [
                [8, newDoorSy, 9.95, 4, wallHeight, .1, mats.blockMat], // lobby
                [8, newDoorSy, 6.05, 4, wallHeight, .1, mats.blockMat],

                [6, newDoorSy, 6.5, .1, wallHeight, 1, mats.blockMat],
                [6, newDoorSy, 9.5, .1, wallHeight, 1, mats.blockMat],
                [10, newDoorSy, 6.5, .1, wallHeight, 1, mats.blockMat],
                [10, newDoorSy, 9.5, .1, wallHeight, 1, mats.blockMat],

                [8, newFloorY + .5, 1.05, 14, 1, .1, mats.blockMat], //rails
                [8, newFloorY + .5, 14.95, 14, 1, .1, mats.blockMat],
                [1.05, newFloorY + .5, 8, .1, 1, 14, mats.blockMat],
                [14.95, newFloorY + .5, 8, .1, 1, 14, mats.blockMat],


                [6, newDoorSy, 13, .1, wallHeight, 2, mats.blockMat],
                [8, newDoorSy, 13.95, 4, wallHeight, .1, mats.blockMat],
                [10, newDoorSy, 13, .1, wallHeight, 2, mats.blockMat],

                [11, newFloorY + .75, 3.5, 4, 1, 2.5, mats.bedMat], //bed
                [4.5, newFloorY + .5, 2.5, 5, 1, 1, mats.couchMat] //couch
            ];


        for (let i = 0; i < guestFloorDims.length; i++) {
            guestFloorBlocks.push(blox.makeBlock(guestFloorDims[i][0], guestFloorDims[i][1], guestFloorDims[i][2], guestFloorDims[i][3], guestFloorDims[i][4], guestFloorDims[i][5], guestFloorDims[i][6])); // todoL lazy much?
        }

        for (let i = 0; i < guestWallDims.length; i++) {
            guestWalls.push(blox.makeBlock(guestWallDims[i][0], guestWallDims[i][1], guestWallDims[i][2], guestWallDims[i][3], guestWallDims[i][4], guestWallDims[i][5], guestWallDims[i][6]));
        }

    }

    static removeGuestFloor() {

    }
}

@Component('guestFloorFlag')
export class GuestFloorFlag {
}


// spawner.spawnEntity()


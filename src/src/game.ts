
import utils from "../node_modules/decentraland-ecs-utils/index"

import { Elevator } from "../sysponents/elevator";
import {Doors} from "../sysponents/doors";



// entity creators
log("Material creation functions loading...");
function makeMaterial(hexcolor, metallic, roughness)
{
	const material = new Material()
	material.albedoColor = Color3.FromHexString(hexcolor); // todo: check for # symbol and handle
	material.metallic = metallic
	material.roughness = roughness;
	return material;
}
log("Material creation functions loaded.");

log("Building functions loading...");
function makeBlock(cpx,cpy,cpz,sx,sy,sz, optMaterial, optEastWest)
{
	if(optEastWest)
	{
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
		position: new Vector3(cpx,cpy,cpz),
		scale: new Vector3(sx,sy,sz)
	}));
	newblock.addComponent(new BoxShape());
	engine.addEntity(newblock);

	if(optMaterial)
	{
		try
		{
			newblock.addComponent(optMaterial);
		}
		catch
		{
			// log error
		}
	}

	return newblock;
}
log("Building functions loaded");

log("Filling lobby fountain pool...");
const grassMat = makeMaterial("#26583c", .9, .6);
let floor = makeBlock(8,0.005,8,16,.01,16,grassMat, false);
log("Lobby fountain filled.");

log("Lobby fountain water creation...");

let lobbyWaterMat = makeMaterial("#2598aa", 0, .7);
let lobbyWater = makeBlock(8,.26,8,4,.6,4,lobbyWaterMat, false);

log("Lobby fountain water complete...");

log("Ground floor being made...");

const groundFloorBlocks = [];

let blockMat = makeMaterial("#ccc7ab", 0.2, .5);
let ceilingMat = makeMaterial("#ccc7ab", 0.2, .5);
let bridgeMat = makeMaterial("#4d3734", 0.2, .5);

let blockDims =
	[
		[8,.375,4.5,   10,.75,3,blockMat], //main floor blocks
		[4.5,.375, 8,   3,.75,4,blockMat],
		[11.5,.375,8,   3,.75,4,blockMat],
		[8,.375,11.5,  10,.75,3,blockMat],

		[8,1.25,8,2,.25,2,blockMat], // el platform
		[8,1.25,8,2,.25,2,blockMat], // el upper platform

	];


for(let i=0;i<blockDims.length;i++)
{
	groundFloorBlocks.push(makeBlock(blockDims[i][0],blockDims[i][1],blockDims[i][2],blockDims[i][3],blockDims[i][4],blockDims[i][5],blockDims[i][6], false));
}

log("Ground floor complete.");

log("Creating ground floor walls...");

const groundFloorWalls = [];

let groundFloorWallDims =
	[
		[5, 1.9,  3.05, 4,3.7,.1, blockMat, true],
		[11, 1.9,  3.05, 4,3.7,.1, blockMat, true],
		[5, 1.9,  12.95, 4,3.7,.1, blockMat, true],
		[11, 1.9,  12.95, 4,3.7,.1, blockMat, true],

		[5, 1.9,  3.05, 4,3.7,.1, blockMat, false],
		[11, 1.9,  3.05, 4,3.7,.1, blockMat, false],
		[5, 1.9,  12.95, 4,3.7,.1, blockMat, false],
		[11, 1.9,  12.95, 4,3.7,.1, blockMat, false],
	];

for(let i=0;i<groundFloorWallDims.length;i++)
{
	groundFloorWalls.push(makeBlock(groundFloorWallDims[i][0],groundFloorWallDims[i][1],groundFloorWallDims[i][2],groundFloorWallDims[i][3],groundFloorWallDims[i][4],groundFloorWallDims[i][5],groundFloorWallDims[i][6],groundFloorWallDims[i][7]));
}


log("Ground floor walls complete");



log("Lobby doors being made...");

const greenDoorMaterial = makeMaterial("#138326", .9, .1);
const goldDoorMaterial = makeMaterial("#bfb017", .9, .1);
const redDoorMaterial = makeMaterial("#830000", .9, .1);
const blueDoorMaterial = makeMaterial("#0c1e83", .9, .1);

let doorMan = new Doors();
const greenDoor = doorMan.newFlippyDoor(2, 3, 8, 2.25, 3.025, greenDoorMaterial, false); // S
const goldDoor = doorMan.newFlippyDoor(2, 3, 8, 2.25, 12.975, goldDoorMaterial, false); // N
const redDoor = doorMan.newFlippyDoor(2, 3, 3.025, 2.25, 8, redDoorMaterial, true); // W
const blueDoor = doorMan.newFlippyDoor(2, 3, 12.975, 2.25, 8, blueDoorMaterial, true); // E
log("dfdfdf"+greenDoor.getComponent(Transform).position.y);

log("Lobby doors complete.");
const groundFloorBridges = [];

let bridgeDims =
	[
		[6.25, .9,  8, .5,.1,.5, bridgeMat],
		[6.75, 1.2, 8, .5,.1,.5, bridgeMat],

		[9.25, 1.2,  8, .5,.1,.5, bridgeMat],
		[9.75, .9, 8, .5,.1,.5, bridgeMat],
	];

for(let i=0;i<bridgeDims.length;i++)
{
	groundFloorBridges.push(makeBlock(bridgeDims[i][0],bridgeDims[i][1],bridgeDims[i][2],bridgeDims[i][3],bridgeDims[i][4],bridgeDims[i][5],bridgeDims[i][6], false));
}

// outside stairs
const outsideStairs = [];
let oustideStairDims = [];

for(let x=0; x<1.2;x+=.4)
{
	oustideStairDims.push([2+x, x *.75, 8,    .5, .1, 2, bridgeMat]);
	oustideStairDims.push([14-x, x * .75, 8,  .5, .1, 2, bridgeMat]);
	oustideStairDims.push([8, x *.75, 2+x,    2, .1, .5, bridgeMat]);
	oustideStairDims.push([8, x * .75, 14-x,  2, .1, .5, bridgeMat]);

}

for(let i=0;i<oustideStairDims.length;i++)
{
	outsideStairs.push(makeBlock(oustideStairDims[i][0],oustideStairDims[i][1],oustideStairDims[i][2],oustideStairDims[i][3],oustideStairDims[i][4],oustideStairDims[i][5],oustideStairDims[i][6], false));
}

// end outside stairs

// el platform
let lplatMaterial = makeMaterial("#ccc788", .9, .1);
let lplat = makeBlock(8,1.5,8,2,.125,2,lplatMaterial,false);
let elDir = 1;
let elInc = .04;
let camera = Camera.instance;
let camiFeet = camera.feetPosition;
const canvas = new UICanvas();
const hudText = new UIText(canvas);
hudText.fontAutoSize = true;

let elLowStop = 1.4;
let guestFloors = 0;
let guestFloorHeight = 6;
let topOfLobby = 6.5;

let elCycle = new utils.Interval(10, () =>
{

		let elTransf = lplat.getComponent(Transform);
		let elAlt = elTransf.position.y;

		let topstop = topOfLobby + (guestFloorHeight * guestFloors);
		if(elAlt > topstop)
		{
			elDir = -1;
		}

		if (elAlt <= 1.4)
		{

			elDir = 1;
		}

		let atStop = false;
		for(let i = elLowStop; i<(guestFloors * guestFloorHeight); i += guestFloorHeight)
		{
			if(Math.abs(elAlt - i) < .05)
			{
				atStop = true;
			}
		}

		let distance = Vector3.Up().scale(elDir * elInc);
		elTransf.translate(distance);


});

lplat.addComponent(elCycle);

export class ElUpdate implements ISystem
{
	update()
	{


	}
}

engine.addSystem(new ElUpdate());
let makingFloorMat = makeMaterial("#208b23", .9, .1);

function makeNewGuestFloor()
{
	guestFloors++;
	let newFloorY = guestFloors * guestFloorHeight + .25;
	let newDoorSy = guestFloors * guestFloorHeight + 1.75; // 1.5 + .25 flooe height

	const poolDoorMaterial = makeMaterial("#386483", .9, .1);
	const hotTubDoorMaterial = makeMaterial("#831a13", .9, .1);
	const suiteDoorMaterial = makeMaterial("#341b1a", .6, .7);
	const suiteFloorMaterial = makeMaterial("#c2ac94", .1, .7);
	const suiteWallMaterial = makeMaterial("#aea990", .1, .7);

	const bedMat = makeMaterial("#c1a586", 0, .7);
	const couchMat = makeMaterial("#aea990", 0, .7);

//	const elLobbylDoor = doorMan.newSlidingDoor(2, 3, 10, newDoorSy, 8, suiteDoorMaterial, 90);
//	const elLobbyDoor = doorMan.newSlidingDoor(2, 3, 6, newDoorSy, 8, suiteDoorMaterial, 90);

	//doors at end of el lobby
//	const hotDoor = doorMan.newSlidingDoor(2, 3, 10, newDoorSy, 11, hotTubDoorMaterial, 90);
//	const coldDoor = doorMan.newSlidingDoor(2, 3, 6, newDoorSy, 11, poolDoorMaterial, 90);

	const guestFloorBlocks = [];
	let guestFloorDims =
		[
			[8,newFloorY,4.5,   10,.5,5,suiteFloorMaterial], //guest floor blocks
			[8,newFloorY,11.5,  10,.5,5,suiteFloorMaterial],

			[5,newFloorY,8,  4,.5,2,suiteFloorMaterial],
			[11,newFloorY,8,  4,.5,2,suiteFloorMaterial],

			[2,newFloorY,8,   2,.5,14,suiteFloorMaterial], //patio floor blocks
			[14,newFloorY,8,   2,.5,14,suiteFloorMaterial],
			[8,newFloorY,2,   12,.5,2,suiteFloorMaterial],
			[8,newFloorY,14,   12,.5,2,suiteFloorMaterial],

		];
	for(let i=0;i<guestFloorDims.length;i++)
	{
		guestFloorBlocks.push(makeBlock(guestFloorDims[i][0],guestFloorDims[i][1],guestFloorDims[i][2],guestFloorDims[i][3],guestFloorDims[i][4],guestFloorDims[i][5],guestFloorDims[i][6], false));
	}

	const guestWalls = [];

	let guestWallDims =
		[
			[8, newDoorSy,  9.95, 4,3,.1, blockMat, false], // lobby
			[8, newDoorSy,  6.05, 4,3,.1, blockMat, false],

			[6, newDoorSy, 6.5,  .1, 3, 1, blockMat, false],
			[6, newDoorSy, 9.5,  .1, 3, 1, blockMat, false],
			[10, newDoorSy, 6.5,  .1, 3, 1, blockMat, false],
			[10, newDoorSy, 9.5,  .1, 3, 1, blockMat, false],

			[8, newFloorY+.5, 1.05,   14,1,.1, blockMat, false], //rails
			[8, newFloorY+.5, 14.95,  14,1,.1, blockMat, false],
			[1.05, newFloorY+.5, 8,   .1,1,14, blockMat, false],
			[14.95, newFloorY+.5, 8,  .1,1,14, blockMat, false],


			[6, newDoorSy, 13,   .1,3,2, blockMat, false],
			[8, newDoorSy, 13.95,   4,3,.1, blockMat, false],
			[10, newDoorSy, 13,   .1,3,2, blockMat, false],

			[11, newFloorY+.75, 3.5,   4,1,2.5, bedMat, false], //bed

			[4.5, newFloorY+.5, 2.5,  5,1,1, couchMat, false], //couch

		];

	for(let i=0;i<guestWallDims.length;i++)
	{
		guestWalls.push(makeBlock(guestWallDims[i][0],guestWallDims[i][1],guestWallDims[i][2],guestWallDims[i][3],guestWallDims[i][4],guestWallDims[i][5],guestWallDims[i][6],guestWallDims[i][7]));
	}

	addFloorButton.addComponentOrReplace(lplatMaterial);

}

let addFloorToggle = new utils.ToggleComponent(utils.ToggleState.Off, value =>
{
	if (value == utils.ToggleState.On)
	{
		addFloorButton.addComponentOrReplace(makingFloorMat);
		makeNewGuestFloor();
		addFloorButton.addComponentOrReplace(goldDoorMaterial);
	}
	else
	{

	}
});

let addFloorButton = makeBlock(4,1, 4, .2, 2, .2, lplatMaterial, false);
addFloorButton.addComponentOrReplace(addFloorToggle);
lplat.addComponentOrReplace(addFloorToggle);

let onClickAddFloor = new OnClick(e =>
{
	lplat.getComponent(utils.ToggleComponent).toggle()
});
lplat.addComponentOrReplace(onClickAddFloor);
addFloorButton.addComponentOrReplace(onClickAddFloor);

//engine.addEntity(myEntity);

// end el platform lpat

















import utils from "../node_modules/decentraland-ecs-utils/index";
import {Mats} from "./materials";

@Component("Doors")
export class Doors {

mats = new Mats();
    constructor() {
        //this.set(startingState)
        //if(onValueChangedCallback) this.setCallback(onValueChangedCallback)
    }

    public newFlippyDoor(width, height, locx, locy, locz, material, axleMaterial, startOpen) {
        // flippy doors on the ground floor
        let openPos: Quaternion = Quaternion.Euler(0, 90, 0);
        let closedPos: Quaternion = Quaternion.Euler(0, 0, 0);

        // Add actual door to scene. This entity doesn't rotate, its parent drags it with it.
        const door = new Entity();
        door.addComponent(new Transform({
            position: new Vector3(0, 0, 0),
            scale: new Vector3(width*.98, height*.98, 0.05)
        }));
        door.addComponent(new BoxShape());
        door.addComponent(material);
        engine.addEntity(door);

        let doorTop = new Entity();
        let doorTrimBox = new BoxShape();
        doorTop.addComponent(axleMaterial);
        doorTop.addComponent(new Transform({
            position: new Vector3(0, .44, 0.36),
            scale: new Vector3(.98, .1, .5)
        }));
        doorTop.addComponent(doorTrimBox);
        doorTop.setParent(door);

        let doorAxle = new Entity();
        let doorAxleCyl = new BoxShape();
        doorAxle.addComponent(axleMaterial);
        doorAxle.addComponent(new Transform({
            position: new Vector3(0, .19, 0.36),
            scale: new Vector3(.2, .40, .5)
        }));
        doorAxle.addComponent(doorAxleCyl);
        doorAxle.setParent(door);

        let doorHbar = new Entity();
        let doorH = new BoxShape();
        doorHbar.addComponent(this.mats.doorHndlMetalMat);
        doorHbar.addComponent(new Transform({
            position: new Vector3(0, -.15, 0.36),
            scale: new Vector3(.6, .1, .5)
        }));
        doorHbar.addComponent(doorH);
        doorHbar.setParent(door);

        let doorLegL = new Entity();
        let doorLL = new BoxShape();
        doorLegL.addComponent(this.mats.doorHndlMetalMat);
        doorLegL.addComponent(new Transform({
            position: new Vector3(-.40, -.15, 0.36),
            scale: new Vector3(.2, .6, .5)
        }));
        doorLegL.addComponent(doorLL);
        doorLegL.setParent(door);

        let doorLegR = new Entity();
        let doorLR = new BoxShape();
        doorLegR.addComponent(this.mats.doorHndlMetalMat);
        doorLegR.addComponent(new Transform({
            position: new Vector3(.40, -.15, 0.36),
            scale: new Vector3(.2, .6, .5)
        }));
        doorLegR.addComponent(doorLR);
        doorLegR.setParent(door);




        const doorPivot = new Entity();
        doorPivot.addComponent(new Transform(

            {
                position: new Vector3(locx, locy, locz),
                rotation: startOpen ? openPos : closedPos
            }));

        engine.addEntity(doorPivot);
        door.setParent(doorPivot);

        door.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value => {
            if (value == utils.ToggleState.On) {
                doorPivot.addComponentOrReplace
                (
                    new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, openPos, 0.5)
                )
            }
            else
            {
                doorPivot.addComponentOrReplace
                (
                    new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, closedPos, 0.5)
                )
            }
        }));

        let onClickDoor = new OnClick(e =>
        {
            door.getComponent(utils.ToggleComponent).toggle();
            door.addComponentOrReplace(material);
        });

        door.addComponent(onClickDoor);

    }


    public newSlidingDoor(width, height, locx, locy, locz, material, xangle) {
        const doorL = new Entity()
        doorL.addComponent(new Transform({
            position: new Vector3(0.5, 0, 0),
            scale: new Vector3(1.1, 2, 0.05),
            rotation: new Quaternion(xangle, 0, 0, 0)
        }));
        doorL.addComponent(new BoxShape());
        engine.addEntity(doorL);

        const doorR = new Entity();
        doorR.addComponent(new Transform({
            position: new Vector3(-0.5, 0, 0),
            scale: new Vector3(1.1, 2, 0.05),
            rotation: new Quaternion(xangle, 0, 0, 0)
        }));
        doorR.addComponent(new BoxShape());
        engine.addEntity(doorR);


// Assign the material to the doors
        doorL.addComponent(material);
        doorR.addComponent(material);

// Define open and closed positions for both doors
        let doorLClosed = new Vector3(0.5, 0, 0);
        let doorLOpen = new Vector3(1.25, 0, 0);
        let doorRClosed = new Vector3(-0.5, 0, 0);
        let doorROpen = new Vector3(-1.25, 0, 0);


// This parent entity holds the state for both door sides
        const doorParent = new Entity()
        doorParent.addComponent(new Transform({
            position: new Vector3(locx, locy, locz),
            rotation: new Quaternion(xangle, 0, 0, 0)
        }));

//toggle behavior for door
        doorParent.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value => {
            if (value == utils.ToggleState.On) {
                doorL.addComponentOrReplace(
                    new utils.MoveTransformComponent(
                        doorLClosed,
                        doorLOpen,
                        1
                    ));
                doorR.addComponentOrReplace(
                    new utils.MoveTransformComponent(
                        doorRClosed,
                        doorROpen,
                        1
                    ))
            } else {
                doorL.addComponentOrReplace(
                    new utils.MoveTransformComponent(
                        doorLOpen,
                        doorLClosed,
                        1
                    ));
                doorR.addComponentOrReplace(
                    new utils.MoveTransformComponent(
                        doorROpen,
                        doorRClosed,
                        1
                    ))
            }
        }));

        engine.addEntity(doorParent);

// Set the door as a child of doorPivot
        doorL.setParent(doorParent);
        doorR.setParent(doorParent);


// Set the click behavior for the door
        doorL.addComponent(
            new OnClick(e => {
                doorParent.getComponent(utils.ToggleComponent).toggle()
            })
        );

        doorR.addComponent(
            new OnClick(e => {
                doorParent.getComponent(utils.ToggleComponent).toggle()
            })
        );

    }

}


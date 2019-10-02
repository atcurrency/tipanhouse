import utils from "../node_modules/decentraland-ecs-utils/index";

@Component("Doors")
export class Doors {


    constructor() {
        //this.set(startingState)
        //if(onValueChangedCallback) this.setCallback(onValueChangedCallback)
    }

    public newFlippyDoor(width, height, locx, locy, locz, material, startOpen) {
        // flippy doors on the ground floor
        let openPos: Quaternion = Quaternion.Euler(0, 90, 0);
        let closedPos: Quaternion = Quaternion.Euler(0, 0, 0);

        // Add actual door to scene. This entity doesn't rotate, its parent drags it with it.
        const door = new Entity();
        door.addComponent(new Transform({
            position: new Vector3(0, 0, 0),
            scale: new Vector3(width, height, 0.05)
        }));
        door.addComponent(new BoxShape());
        engine.addEntity(door);

        door.addComponent(material);

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
            } else {
                doorPivot.addComponentOrReplace
                (
                    new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, closedPos, 0.5)
                )
            }
        }));

        let onClickDoor = new OnClick(e => {
            door.getComponent(utils.ToggleComponent).toggle()
        });

        door.addComponent(onClickDoor);


        return door;
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

        return doorParent;
    }

}


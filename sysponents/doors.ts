import utils from "../node_modules/decentraland-ecs-utils/index";
import {Mats} from "./materials";
import {Blox} from "../sysponents/blocks";

@Component("Doors")
export class PlainDoor {

    mats = new Mats();
    blox = new Blox();

    constructor(width, height, locx, locy, locz, material, perpend)
    {
        // todo: use if useful
        //if(onValueChangedCallback) this.setCallback(onValueChangedCallback)

       let door = this.blox.makeBlockNamed(locx, locy, locz, perpend ? width*.98 : 0.05, height*.98, perpend ? 0.05 : width *.98, material, "name");
       let doorBox = door.getComponent(BoxShape);
       doorBox.withCollisions = false;
       engine.addEntity(door);
    }
}


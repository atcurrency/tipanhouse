import utils from "../node_modules/decentraland-ecs-utils/index";

@Component("Blox")
export class Blox {


    constructor() {
        //this.set(startingState)
        //if(onValueChangedCallback) this.setCallback(onValueChangedCallback)
    }

    makeBlockNamed = function(cpx, cpy, cpz, sx, sy, sz, material, name)
    {
        const newblock = new Entity();
        if(name && name.length > 0)
        {
            newblock.name = name;
        }
        newblock.addComponent(new Transform(
            {
                position: new Vector3(cpx, cpy, cpz),
                scale: new Vector3(sx, sy, sz)
            }));
        newblock.addComponent(new BoxShape());
        engine.addEntity(newblock);

        if (material) {
            try {
                newblock.addComponent(material);
            } catch (e) {
                log(e);
            }
        }
        return newblock;
    };
    makeBlock = function(cpx, cpy, cpz, sx, sy, sz, material)
    {
        return this.makeBlockNamed(cpx, cpy, cpz, sx, sy, sz, material, "") ;
    }
}


import utils from "../node_modules/decentraland-ecs-utils/index";
import {Mats} from "./materials";
import {Blox} from "./blocks";

@Component("Fountain")
export class Fountain {

    startX = null;
    endX = null;
    colCount = null;

    constructor()
    {
        //this.set(startingState)
        //if(onValueChangedCallback) this.setCallback(onValueChangedCallback)
    }

    public wave(waveShift)
    {
        let cols = engine.getComponentGroup(WaterFall);
        let colIdx = 1;
        let colDiv = this.colCount;
        cols.entities.forEach(myFunction);

        function myFunction(col)
        {
            col.getComponent(Transform);
            let cpos = col.getComponent(Transform);
            let waveRadi = waveShift * (Math.PI/180);

            let ypos = cpos.position.y + (Math.sin(waveRadi*colIdx))/32;
            if(ypos > 2)
            {
              ypos = 2;
            }
            else if(ypos < .2)
            {
                ypos = .2;
            }
            cpos.position = new Vector3(cpos.position.x, ypos, cpos.position.z);
            colIdx++;
            if(colIdx > colDiv)
            {
                colIdx = 1;
            }
        }

    }




    public newFountain(bottomX, bottomY, bottomZ, topX, topY, topZ, numColumns)
    {
            this.startX = bottomX;
            this.endX = bottomX;
            this.colCount = numColumns;
            let sizeX = topX - bottomX;
            let sizeZ = topZ - bottomZ;
            let sizeY = topY - bottomY;
            let halfY = ((topY - bottomY) / 2) + bottomY;
            let halfZ =  ((topZ - bottomZ) / 2) + bottomZ; //???
            let colScale = sizeX / numColumns;
            let offset = colScale/2;
            // flippy doors on the ground floor

            let mats = new Mats();
            let blox = new Blox();
        let wall = blox.makeBlock(halfZ, bottomY + 1.5, bottomX + offset, sizeZ, 3, colScale*.99, mats.aquaMetalMat); //todo: undo this perpending 90 for lobby layout

        for (let x = 2; x < numColumns; x++)
            {
                let cpx = bottomX + offset + (x*colScale);

                let col = blox.makeBlock(halfZ, halfY, cpx, sizeZ, sizeY, colScale*.99, mats.blueWater); //todo: undo this perpending 90 for lobby layout
                col.addComponent(new WaterFall());
                engine.addEntity(col);
            };
            return this;
    }

}

@Component('waterFall')
export class WaterFall
{}


// spawner.spawnEntity()


import utils from "../node_modules/decentraland-ecs-utils/index";

@Component("Mats")
export class Mats {


    constructor() {
        //this.set(startingState)
        //if(onValueChangedCallback) this.setCallback(onValueChangedCallback)
    }



    makeMaterial = function(hexcolor, metallic, roughness) {
        let material = new Material()
        material.albedoColor = Color3.FromHexString(hexcolor); // todo: check for # symbol and handle
        material.metallic = metallic
        material.roughness = roughness;
        return material;
    }

    makeMaterialColor4(color4, metallic, roughness) {
        let material = new Material();
        material.transparencyMode = 2;
        material.albedoColor = color4; // todo: check for # symbol and handle
        material.metallic = metallic;
        material.roughness = roughness;
        return material;
    }


    greenGlowMat = this.makeMaterial("#00AA00", .4, .7);
    redGlowMat = this.makeMaterial("#AA0000", .4, .7);
    metalDkStlMat = this.makeMaterial("#a09ca1", 1, .1);
    blockMat = this.makeMaterial("#ccc4a4", 0.2, .5);
    ceilingMat = this.makeMaterial("#ccc7ab", 0.2, .5);
    bridgeMat = this.makeMaterial("#4d3734", 0.2, .5);
    greenMetalMat = this.makeMaterial("#138326", .9, .1);
    goldMetalGlass = this.color4HexAlpha("#bfb017",1);
    goldMetalMat = this.makeMaterialColor4(this.goldMetalGlass, 1, 0);
    darkMetalGlass = this.color4HexAlpha("#666234",1);
    darkMetalMat = this.makeMaterialColor4( this.darkMetalGlass, 1, 0);
    redMetalMat = this.makeMaterial("#830000", .9, .1);
    aquaMetalGlass = this.color4HexAlpha("#21667a",1);
    aquaMetalMat = this.makeMaterialColor4(this.aquaMetalGlass, 1, .11);
    blueMetalMat = this.makeMaterial("#35e5e8", 1, .1);

    greenMetalTrimGlass = this.color4HexAlpha("#254b25",1);
    greenMetalTrimMat = this.makeMaterialColor4(this.greenMetalTrimGlass, 1, .1);
    doorHndlMetalGlass = this.color4HexAlpha("#c8dcd3",1);
    doorHndlMetalMat = this.makeMaterialColor4(this.doorHndlMetalGlass, 1, .1);

//guest floor
    poolDoorMaterial = this.makeMaterial("#386483", .9, .1);
    hotTubDoorMaterial = this.makeMaterial("#831a13", .9, .1);
    suiteDoorMaterial = this.makeMaterial("#341b1a", .6, .7);
    suiteFloorMaterial = this.makeMaterial("#c2ac94", .1, .7);
    suiteWallMaterial = this.makeMaterial("#aea990", .1, .7);
    bedMat = this.makeMaterial("#c1a586", 0, .7);
    couchMat = this.makeMaterial("#aea990", 0, .7);
    lobbyGlass = this.color4HexAlpha("#305d32",.2);
    glassWall = this.makeMaterialColor4(this.lobbyGlass,.7,.1);
    lobbyDoorGlass = this.color4HexAlpha("#305d32",.7);
    lobbyDoor = this.makeMaterialColor4(this.lobbyDoorGlass,1,0);

    blueWaterColor = this.color4HexAlpha("#3de1ff",.33);
    blueWater = this.makeMaterialColor4(this.blueWaterColor,1, .1);
    blueWaterColor2 = this.color4HexAlpha("#36ffe2",.33);
    blueWater2 = this.makeMaterialColor4(this.blueWaterColor2, 1, .1);

    greenDim = new Color4(.1,.5, .1, .3);
    greenBrt = new Color4(.4,1, .4, .6);
    redDim = new Color4(.5,.1, .1, .3);
    redBrt = new Color4(1,.4, .4, .6);
    glassGreen = this.makeMaterialColor4(this.greenDim,.2,.6);
    glassRed = this.makeMaterialColor4(this.redDim,.2,.6);

    color4HexAlpha(hcolor, alpha)
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



}


/*A cave is a visual representation of a Node. It will be shown on the screen.

We cannot intitlaize the base Node class in a BST without giving it coordinates
and a scene. so this is a class that will let nodes be manipulated viusally*/

export class Cave extends Phaser.GameObjects.Sprite {
    
    constructor(inputScene,
                inputXCoord,
                inputYCoord,
                inputImageName,
                // send node from BST
                inputNode)

    {
        
        //initalize Sprite class 
        super(inputScene,
              inputXCoord,
              inputYCoord,
              inputImageName);

        this.xCoordinate = inputXCoord;
        this.yCoordinate = inputYCoord;
        // show the sprite on the scene
        inputScene.add.existing(this);

    }
    
    
    
} 

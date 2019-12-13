/*A cave is a visual representation of a Node. It will be shown on the screen.

We cannot intitlaize the base Node class in a BST without giving it coordinates
and a scene. so this is a class that will let nodes be manipulated viusally*/

export class Cave extends Phaser.GameObjects.Sprite{
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

        this.content = inputNode.content;

        this.node = inputNode;

        this.scene = inputScene;
        this.xCoord = inputXCoord;
        this.yCoord = inputYCoord;
        // show the sprite on the scene
        inputScene.add.existing(this);

        //make clickable
        this.setInteractive();


        //I subtract 5 to position it correctly
        this.textSprite = inputScene.add.text(inputXCoord-5,
                                              inputYCoord-5,
                                              String(this.content));
    }


    //run this function to enable users to click on this cave
    makeClickable(){
        this.setInteractive();

        this.on('pointerup', this.onCaveClicked);
    }


    //handle clicks it takes a pointer becuase it needs  the mouse pointer that clicked it
    onCaveClicked(pointer)
    {
        this.scene.handleCaveClick(this);
    }
}

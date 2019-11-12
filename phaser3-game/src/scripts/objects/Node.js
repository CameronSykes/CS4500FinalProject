
import { Node } from './Node.js';
//It will be shown on the screen
//A cave is a visual representation of a Node
//we cannot intitlaize the base Node class in a BST without giving it coordinates and a
//scene so this is a class that will let nodes be manipulated viusally
export class Cave extends Phaser.GameObjects.Sprite { 
    
    constructor(inputScene=0,
                inputXCoord,
                inputYCoord,
                inputImageName,
                inputContent)
    {
        //TODO 
       //initalize Sprite class 
        super(inputScene,inputXCoord, inputYCoord,inputContent);

        // What could be diplayed in the tree
        this.content  =  inputContent;

        this.xCoord = inputXCoord;
        this.yCoord = inputYCoord;

        // Javascript does not have pointers 
        // to make a node just do the node  Node.leftChild = new Node(X)
        this.parentNode = null;
        this.leftChild = null;
        this.rightChild = null; 
    }
    
    
    
} 

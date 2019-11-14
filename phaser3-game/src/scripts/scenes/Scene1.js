import { BinarySearchTree } from '../objects/BST.js';
import { Person } from '../objects/Person.js';
import { Cave } from '../objects/Cave.js';
import { TravelAnimation } from '../objects/Animation.js';


//In my opinon a Scene brings everything together and that's it

export default class Scene1 extends Phaser.Scene {
    constructor () {
        // call superclass (Phaser.Scene) constructor.
        super({key:"Scene1"});
    }
    init(data) {}
    //load assests used
    preload () {
        //the directory is relative to the index.html file or whichever html
        //file that Scene1 is loaded from
        var imageDir = "../assets/images/";
        this.load.image("cave",imageDir+"cave.png");
        this.load.image("person",imageDir+"person.png");
    }
    //draw what will be used
    create ()  {


	var MainTree = new BinarySearchTree();
	MainTree.insert(1);
	MainTree.insert(0);
	MainTree.insert(3);
	MainTree.insert(4);
	MainTree.insert(5);

	console.log("TREE");
	console.log(MainTree.getNodesInOrder());


        //Right Now all this does is an incorrect BFS
        //It should be extended to just take a BST object and a traveral type and animate it
        var Animation1 = new TravelAnimation(this,
					     MainTree,
                                             "BFS");


    }
    update(time, delta) {}
 

}

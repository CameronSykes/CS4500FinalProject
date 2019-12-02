import { BinarySearchTree } from '../objects/BST.js';

import { Player } from '../objects/Player.js';
import { Cave } from '../objects/Cave.js';
import { TravelAnimation, BFSAnimation, InorderAnimation  } from '../objects/Animation.js';


//In my opinon a Scene brings everything together and that's it

export default class Scene1 extends Phaser.Scene {
    constructor () {
        // call superclass (Phaser.Scene) constructor.
        super({key:"Scene1"});
        this.MainTree = null;
        //list of values to insert into the BST as nodes
        this.valList = [];

        this.currentAnimation = null;

        //the 'this' keyword changes based on what function calls it
        //this makes this keyword bind to Scene1 instance always in the following instance methods 
        this.initializeMenuItems = this.initializeMenuItems.bind(this);
        this.runAnimation = this.runAnimation.bind(this);
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
        //vals to make this tree
        //      5 
        //    /   \ 
        //   3     7 
        //  /  \    \ 
        // 2   4     8 
        this.valList = [5, 3, 7, 2, 4,8];


        this.initializeBST();
        this.initializeAllCaves();
        this.initializeMenuItems();



    }
    update(time, delta) {
    }
    // this creates items that will let the user start and stop 
    initializeMenuItems(){
        var startAnimationButtonText = "Start animation";
        this.startAnimationButton = this.add.text(100, 90, startAnimationButtonText, { fontFamily: '"Roboto Condensed"' }).setInteractive();
        //change color on hover to indicate that its clickable
        this.startAnimationButton.on('pointerover', () => {
            this.startAnimationButton.setTint(0xf0ff00);
        });
        this.startAnimationButton.on('pointerout', () =>{
            this.startAnimationButton.setTint(0xffffff);
        });
        //handle on click
        this.startAnimationButton.on('pointerdown', () => {
            this.runAnimation(); 
        }); 



        var pauseAnimationButtonText = "Pause animation";
        this.pauseAnimationButton = this.add.text(100, 90+100, pauseAnimationButtonText, { fontFamily: '"Roboto Condensed"' }).setInteractive();
        //change color on hover to indicate that its clickable
        this.pauseAnimationButton.on('pointerover', () => {
            this.pauseAnimationButton.setTint(0xf0ff00);
        });
        this.pauseAnimationButton.on('pointerout', () =>{
            this.pauseAnimationButton.setTint(0xffffff);
        });
        //handle on click
        this.pauseAnimationButton.on('pointerdown', () => {
            this.currentAnimation.pauseOnNextNode();
        }); 

        var unpauseAnimationButtonText = "Unpause animation";
        this.unpauseAnimationButton = this.add.text(100, 90+200, unpauseAnimationButtonText, { fontFamily: '"Roboto Condensed"' }).setInteractive();
        //change color on hover to indicate that its clickable
        this.unpauseAnimationButton.on('pointerover', () => {
            this.unpauseAnimationButton.setTint(0xf0ff00);
        });
        this.unpauseAnimationButton.on('pointerout', () =>{
            this.unpauseAnimationButton.setTint(0xffffff);
        });
        //handle on click
        this.unpauseAnimationButton.on('pointerdown', () => {
            this.currentAnimation.resume();
        }); 
        var pauseOnNewNodeButtonText = "Pause At next node in traversal path";
        this.pauseOnNewNodeButton = this.add.text(100, 90+300, pauseOnNewNodeButtonText, { fontFamily: '"Roboto Condensed"' }).setInteractive();
        //change color on hover to indicate that its clickable
        this.pauseOnNewNodeButton.on('pointerover', () => {
            this.pauseOnNewNodeButton.setTint(0xf0ff00);
        });
        this.pauseOnNewNodeButton.on('pointerout', () =>{
            this.pauseOnNewNodeButton.setTint(0xffffff);
        });
        //handle on click
        this.pauseOnNewNodeButton.on('pointerdown', () => {
            this.currentAnimation.pauseOnNextNodeInTravesalPath();
        }); 
    }

    runAnimation(){
        let playerStartXpos =  0;
        let playerStartYpos =  100;


        let player = new Player(this,playerStartXpos,playerStartYpos,"person");
        // var Animation1 = new InorderAnimation(this,
				// 	                                    this.MainTree,
        //                                       player);
        var Animation2 = new BFSAnimation(this,
					                                this.MainTree,
                                          player);
        this.currentAnimation = Animation2;
        Animation2.play();
    }

    handleCaveClick(){
        this.runAnimation(); 
    }

    //Delete this comment
    //Up to Cameron to decide what this does right now it initializes nodes x,y
    //coordinates manually
    //TODO Make it initialize node positions dynamicaly 
    initializeBST(){
        // ATTN: this.valList's values should be gotten rid of once we read in values
        // Push user values onto this.valList
        // UI floats at the top of the page and the cave system is
        // animated under it


        //window.screen.height should be replaced with the game screenWidth found in the game.js file in phaser3/src/game.js
        var screenW = window.screen.width;

        var caveRadius = 50;
        //window.screen.height should be replaced with the game screenWidth found in the game.js file in phaser3/src/game.js
        var k = window.screen.height / 5;
	      this.MainTree =new BinarySearchTree(screenW, caveRadius, k);


        //delete this when BST.js is tested and works
        var nodePositionArray = [
            
            [370,30],//pos of node with content: 5
            [310,130],//3
            [430,130],//7
            [250,230],//2
            [370,230],//4
            [490,230]//8
        ];

        for (var i = 0; i < this.valList.length; i++) {

            this.MainTree.insert(this.valList[i]);

            //Begin delete-this
            //[2019-11-24 Sun] I assume the BST is not tested so i'm setting the x and y manually. Delete this when BST.js works correctly
            this.MainTree.getNodeFromContent(this.valList[i]).setxCoord(nodePositionArray[i][0]);

            this.MainTree.getNodeFromContent(this.valList[i]).setyCoord(nodePositionArray[i][1]);
            //End delete-this
        }


    }

    initializeAllCaves(){

        //elements such as nodes on a tree are stored as groups
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html
        var caveGroup = this.add.group();

        //create a series of caves sprites
        //create a series of caves in the node positions

        for (let i = 0; i<this.valList.length; i++)
        {
            let posNode = this.MainTree.getNodeFromContent(this.valList[i]);
            let currCave = new Cave(this,
                                posNode.getxCoord(),
                                posNode.getyCoord(),
                               "cave",
                               posNode
                               );

            currCave.makeClickable();
            caveGroup.add(currCave);

            posNode.cave = currCave;

        }

    }

}


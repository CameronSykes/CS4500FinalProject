import { BinarySearchTree } from '../objects/BST.js';

import { Player } from '../objects/Player.js';
import { Cave } from '../objects/Cave.js';
import { TravelAnimation, BFSAnimation, InorderAnimation  } from '../objects/Animation.js';

//store as hex
const white = 0xffffff;
const red = 0xff0000;
const green = 0x00ff00;
const yellow = 0xf0ff00;
const gray = 0xd3d3d3;

export default class Scene1 extends Phaser.Scene {
    constructor () {
        // call superclass (Phaser.Scene) constructor.
        super({key:"Scene1"});
        this.MainTree = null;
        //list of values to insert into the BST as nodes
        this.valList = [];

        this.currentAnimation = null;
        this.currentTraversal = null;

        this.currentTraversalNodeIndex = 0;

        this.isQuizRunning = false;

        this.quizOutputTextBox = null;

        //the 'this' keyword changes based on what function calls it
        //this makes this keyword bind to Scene1 instance always in the following instance methods 
        this.initializeMenuItems = this.initializeMenuItems.bind(this);
        this.runAnimation = this.runAnimation.bind(this);
        this.createTextButton = this.createTextButton.bind(this);
        this.askNextQuizQuestion = this.askNextQuizQuestion.bind(this);
        this.startQuiz = this.startQuiz.bind(this);

        this.handleQuizAnswer = this.handleQuizAnswer.bind(this);
        this.handleCaveClick = this.handleCaveClick.bind(this);
    }

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


        this.quizOutputTextBox = this.add.text(500, 500, "", { fontFamily: '"Helvetica"' });
        this.quizOutputTextBox.setVisible(false);
    }

 
    //this runs on every frame 
    update(time, delta) {
    }

    startQuiz(traversalType){
        this.runAnimation(traversalType); 
        if(traversalType == TravelAnimation.BFSAnimation){
            this.currentTraversal = this.MainTree.bfs();
        }
        else if (traversalType == TravelAnimation.InorderAnimation) {
                this.currentTraversal = this.MainTree.getNodesInOrder();
        }
        
        this.quizOutputTextBox.text = "Quiz started: \nSelect the next node that will be traversed";
        this.quizOutputTextBox.setTint(white);
        this.quizOutputTextBox.setVisible(true);

        this.currentAnimation.pauseOnNextNode();
        this.isQuizRunning = true;
    }
    // this creates items that will let the user start and stop 
    initializeMenuItems(){
        
        this.startAnimationButton = this.createTextButton(100,
                                                          90,
                                                          "Start BFS animation",
                                                          () => {
                                                              this.runAnimation(TravelAnimation.BFSAnimation); 
                                                          });
        this.startQuizButton = this.createTextButton(600,
                                                     90,
                                                     "Start BFS Quiz",
                                                     () => {
                                                         this.startQuiz(TravelAnimation.BFSAnimation); 
                                                     });

        this.startAnimationButton = this.createTextButton(100,
                                                          90+50,
                                                          "Start Inorder animation",
                                                          () => {
                                                              this.runAnimation(TravelAnimation.InorderAnimation); 
                                                          });
        
 
        this.pauseAnimationButton = this.createTextButton(100,
                                                          90+100,
                                                          "Pause animation",
                                                          () => {
                                                              this.currentAnimation.pauseOnNextNode();
                                                          });
            
        
        this.unpauseAnimationButton = this.createTextButton(100,
                                                            90+200,
                                                            "Unpause animation",
                                                            () => {
                                                                this.currentAnimation.resume();
                                                            });
        
        this.pauseOnNextNodeInTravesalPath = this.createTextButton(100,
                                                          90+300,
                                                          "Pause At next node in traversal path",
                                                          () => {
                                                              this.currentAnimation.pauseOnNextNodeInTravesalPath();
                                                          });
        
    }
    
    createTextButton(xPos,yPos,buttonText,onClickFuction){
        let textButton = this.add.text(xPos, yPos, buttonText, { fontFamily: '"Helvetica"' }).setInteractive();
        //change color on hover to indicate that its clickable
        textButton.on('pointerover', () => {
            textButton.setTint(yellow);
        });
        textButton.on('pointerout', () =>{
            textButton.setTint(white);
        });

        textButton.on('pointerdown', onClickFuction); 

        return(textButton);
        
    }

    runAnimation(AnimationType){
        let playerStartXpos =  0;
        let playerStartYpos =  100;


        let player = new Player(this,playerStartXpos,playerStartYpos,"person");
        // var Animation1 = new InorderAnimation(this,
				// 	                                    this.MainTree,
        //                                       player);

        var Animation2 = new TravelAnimation(this,
					                                   this.MainTree,
                                             player,
                                             AnimationType);
        this.currentAnimation = Animation2;
        Animation2.play();
    }

    handleCaveClick(clickedCave){
        if(this.isQuizRunning){
            this.handleQuizAnswer(clickedCave);
        }
    }
    handleQuizAnswer(clickedCave){
        //the next node is clicked
        if(clickedCave.node == this.currentTraversal[this.currentTraversalNodeIndex + 1]){
            //unpause the quiz
            this.currentAnimation.resume();
            this.quizOutputTextBox.text = "Correct Node clicked";
            this.quizOutputTextBox.setTint(green);
            this.currentTraversalNodeIndex+=1;

            if(this.currentTraversalNodeIndex == this.currentTraversal.length -1){
                this.quizOutputTextBox.text = "Quiz Complete";
                this.quizOutputTextBox.setTint(green);
                return;
            }
            this.time.addEvent({ delay: 1000, callback: this.askNextQuizQuestion, callbackScope: this });}
        else{
            this.quizOutputTextBox.text = "Incorrect Node clicked: Please try again";
            this.quizOutputTextBox.setTint(gray);
        }
    }
    
    askNextQuizQuestion(){
        this.quizOutputTextBox.text = "What is the next node?";
        this.quizOutputTextBox.setTint(white);
        this.currentAnimation.pauseOnNextNodeInTravesalPath();
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
        //set line style
        var graphics = this.add.graphics({ lineStyle: { width: 4, color: gray }, fillStyle: { color: gray } });
        var connectionLineList = [];
        for (let i = 0; i<this.valList.length; i++)
        {
            let posNode = this.MainTree.getNodeFromContent(this.valList[i]);
            if(posNode.leftChild){

                connectionLineList.push(
                    new Phaser.Geom.Line(posNode.getxCoord(),
                                         posNode.getyCoord(),
                                         posNode.leftChild.getxCoord(),
                                         posNode.leftChild.getyCoord())
                );
                //draw line
                graphics.strokeLineShape(connectionLineList[connectionLineList.length-1]);

            }
            if(posNode.rightChild){
                connectionLineList.push(
                    new Phaser.Geom.Line(posNode.getxCoord(),
                                         posNode.getyCoord(),
                                         posNode.rightChild.getxCoord(),
                                         posNode.rightChild.getyCoord())
                );
                //draw line
                graphics.strokeLineShape(connectionLineList[connectionLineList.length-1]);

            }


        }


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



import { Person } from './Person.js';
import { Cave } from './Cave.js';

//this class managages animatinos for levels
//the Scene1 class only handles things for it's class
export class TravelAnimation {

    constructor(scene,
                binaryTree,
                TraversalType) {

        //This is hardcoded
        //TODO make this dynamic get it form the bst
        var nodePositionArray = [
            [370,30],
            [310,130],
            [430,130],
            [250,230],
            [370,230],
            [490,230]
        ];


        //it requires a scene to do the animations on
        
        //Make list of images
        var nodeList = [];



        //elements such as nodes on a tree are stored as groups
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html
        var caveGroup = scene.add.group();
         
        var caveList = [];
        var curCave;
        //create a series of caves sprites
        //create a series of caves in the node positions
        for (var i = 0; i < nodePositionArray.length; i++) {
            curCave = new Cave(scene,
                                nodePositionArray[i][0],
                                nodePositionArray[i][1],
                               "cave",
                               undefined //TODO place the node it represents
                               );
            caveList.push(curCave);
            caveGroup.add(curCave);
        }
        //make caves clickable
        for(i = 0;i <caveList.length; i++){
             caveList[i].makeClickable();
        }
        
        //a tween is an animation of a sprite moving between 2 positons a
        //Timeline is a series of tweens
        var playerAnimationTimeline = scene.tweens.createTimeline();

        var player = new Person(scene,0,0,"person");
        var tweenBuilderConfig;
        //animate it moving from one node to another
        for (i = 0; i < nodePositionArray.length; i++) {
            tweenBuilderConfig = {
                targets: player,
                duration: 1000,
                x : nodePositionArray[i][0],
                y : nodePositionArray[i][1],
                offset : "+=500m",
                //when the fucntion stopps it will run the follow 
                onComplete : this.updateTouchedNode,
                onCompleteParams : [caveList[i]] 
            };
           
            playerAnimationTimeline.add(tweenBuilderConfig);
        }

        //run all tween animations
        playerAnimationTimeline.play();
    }
    //  The first two callback arguments are always the sprite on which the animation is playing, and the animation itself.
    //  Following this comes whatever you specify in the params array (in this case cave)
    updateTouchedNode(sprite, animation, cave) {
        //add a layer of color on top of image
         cave.tint = 0xff00ff;
    }
}

import BST from '../objects/BST.js';
import { Person } from '../objects/Person.js';
import { Cave } from '../objects/Cave.js';


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



        //Make list of images
        var nodeList = [];

        //This is hard coded
        //TODO make this dynamic
        var nodePositionArray = [
                              [370,30],
                              [310,130],
                              [430,130],
                              [250,230],
                              [370,230],
                              [490,230]
                             ];

        var Cave1 = new Cave(this,
                             nodePositionArray[1][0],
                             nodePositionArray[1][1],
                             "cave",
                             false);
        

        //elements such as nodes on a tree are stored as groups
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html
        var caveGroup = this.add.group();
         
        var curNode;
        //create a series of caves sprites
        //create a series of caves in the node positions
        for (var i = 0; i < nodePositionArray.length; i++) {
            curNode = new Cave(this,
                                nodePositionArray[i][0],
                                nodePositionArray[i][1],
                               "cave",
                               undefined //TODO place the node it represents
                               );
            caveGroup.add(curNode);
        }

        //a tween is an animation of a sprite moving between 2 positons a
        //Timeline is a series of tweens
        var playerAnimationTimeline = this.tweens.createTimeline();

        var player = new Person(this,0,0,"person");
        //animate it moving from one node to another
        for (i = 0; i < nodePositionArray.length; i++) {
            var tweenBuilderConfig = {
                targets: player,
                duration: 1000,
                x : nodePositionArray[i][0],
                y : nodePositionArray[i][1],
                offset : "+=500m"
            };

            playerAnimationTimeline.add(tweenBuilderConfig);
        }

        //run all tween animations
        playerAnimationTimeline.play();

    }
    update(time, delta) {}
 

}

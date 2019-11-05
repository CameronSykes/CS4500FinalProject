//Purpose Makes scene that animates traversal of binary tree
// this refers to this Scene/Level
// Started 6:30

class Scene1 extends Phaser.Scene {
    constructor () {
        // call superclass (Phaser.Scene) constructor.
        super({key:"Scene1"});
    }
    init(data) {}
    preload () {
        //the directory is relative to the index.html file or whichever html
        //file that Scene1 is loaded from
        var imageDir = "/assets/images/";
        this.load.image("cave",imageDir+"cave.png");
        this.load.image("person",imageDir+"person.png");
    }
    create ()  {
        //Make list of images
        var nodeList = [];

        //This is hard coded
        //TODO make this dynamic
        var nodePositionArray = [
                              [0,300],
                              [100,300],
                              [200,300],
                              [300,300],
                              [400,300],
                              [500,300]
                             ];
        this.CaveImageArray = [];

        //elements such as enemies or obstacles are stored as groups
        https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html
        var caveGroup = this.add.group();
        //create a series of caves in the node positions
        for (var i = 0; i < nodePositionArray.length; i++) {
            caveGroup.create(
                nodePositionArray[i][0],
                nodePositionArray[i][1],
                'cave');
        }

        var player = this.add.sprite(0, 0, 'person');
        //a tween is an animation of a sprite moving between 2 positons a
        //Timeline is a series of tweens
        var playerAnimationTimeline = this.tweens.createTimeline();

        //set th
        for (var i = 0; i < nodePositionArray.length; i++) {
            var tweenBuilderConfig = {
                targets: player,
                duration: 3000,
                x : nodePositionArray[i][0],
                y : nodePositionArray[i][1]
            };
            playerAnimationTimeline.add(tweenBuilderConfig);
        }

        //run all tween animations
        playerAnimationTimeline.play();

        //         player.to(nodePositionArray[i][0],
        //             nodePositionArray[i][1]);

        // playerAnimationTimeline.addTween(c)
        // //move image
        // var movementRange = this.tweens.add(
        //     {
        //         targets: this.CaveImage,
        //         x:200,
        //         y:250,
        //         delay:1000,
        //         duration:2000
        //     }
        // );
    }
    update(time, delta) {}
 

}

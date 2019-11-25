
//this class managages animations for levels
//the Scene1 class everything handles for the level
export class TravelAnimation {

    constructor(scene,
                binarySearchTree,
                player,
                //list of nodes in order of where player will go
                nodePath) {
        //TODO Note a scene cannot be used as a property it will it will cuase an error later
        this.player = player;
        this.scene = scene;
        this.binarySearchTree = binarySearchTree;
        this.playerWaitTimeAtNode = "+=500m";
        this.timeToTravelBetweenCaves = 1000;
        this.playerAnimationTimeline = null;
        this.newNodeList = null;

        this.initializePath(nodePath);

    }
    initializePath(nodePath) {

        var nodePositionArray = [];

        //connect nodes to break avoid breaking walls
        nodePath = this.binarySearchTree.connectNodesUsingOnlyLinks(nodePath);

        for (let i = 0; i < nodePath.length; i++) {
            nodePositionArray.push([
                nodePath[i].getxCoord(),
                nodePath[i].getyCoord()
            ]);
        }


        //a tween is an animation of a sprite moving between 2 positons a
        //Timeline is a series of tweens
        this.playerAnimationTimeline = this.scene.tweens.createTimeline();

        var tweenBuilderConfig;
        //animate it moving from one node to another
        for (let i = 0; i < nodePositionArray.length; i++) {
            tweenBuilderConfig = {
                targets: this.player,
                duration: this.timeToTravelBetweenCaves,
                x : nodePositionArray[i][0],
                y : nodePositionArray[i][1],
                offset : this.playerWaitTimeAtNode,
                //when the fucntion stopps it will run the follow 
                onComplete : this.updateTouchedNode,
                onCompleteParams : [nodePath[i].cave] 
            };

            this.playerAnimationTimeline.add(tweenBuilderConfig);
        }

    }

    play(){
        //run all tween animations
        this.playerAnimationTimeline.play();
    }

    //  The first two callback arguments are always the sprite on which the animation is playing, and the animation itself.
    //  Following this comes whatever you specify in the params array (in this case cave)
    updateTouchedNode(sprite, animation, cave) {
        //add a layer of color on top of image
         cave.tint = 0xff00ff;
    }


}



//this class managages animations for levels
//the Scene1 class everything handles for the level
export class InorderAnimation extends TravelAnimation {

    constructor(scene,
                binarySearchTree,
                player) {

        let nodePath = binarySearchTree.getNodesInOrder();

        super(scene,
              binarySearchTree,
              player,
             nodePath);

    }
}

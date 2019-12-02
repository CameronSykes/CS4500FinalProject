
//this class managages animations for levels
//the Scene1 class everything handles for the level
export class TravelAnimation {

    constructor(scene,
                binarySearchTree,
                player,
                traversalType
               ) {



        this.player = player;
        this.binarySearchTree = binarySearchTree;
        this.playerWaitTimeAtNode = "+=500m";
        this.timeToTravelBetweenCaves = 1000;
        this.playerAnimationTimeline = null;
        //TODO I'm not sure a scene can be used as a property it may cause an error later
        this.scene = scene;

        //when the handleTweenEnd funtion is called, this will cause it to
        //dont pause immediately or else the cave digger will stop in the middle of a tunnel
        this.canContinue = true;

        //this will stop when it reaches the next node in the traversal algroithm
        //(BFS, DFS). This is so it doesn't stop on an intermediate node
        // [firstNode,(intermediate nodes so it doesn't go through walls), secondNode]
        this.stopOnNextTraversalNode = false;

        //list of nodes in order of where player will go
        var nodePath;
        switch (traversalType) {

        case TravelAnimation.BFSAnimation:
          nodePath = binarySearchTree.bfs();
          break;

        case TravelAnimation.InorderAnimation:
          nodePath = binarySearchTree.getNodesInOrder();
          break;

        default:
          throw "ERROR; animation type not found";
        }

        this.nodesToTraverse = nodePath;

        this.nextNodeToTraverseTo = nodePath[0];
        
        this.createAnimationPath(nodePath);

        this.handleTweenEnd = this.handleTweenEnd.bind(this);
        this.createAnimationPath = this.createAnimationPath.bind(this);

    }

   
    createAnimationPath(nodePath) {

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
                //when the function stops it will run this 
                onComplete : this.handleTweenEnd,
                onCompleteParams : [this,nodePath[i]] 
            };

            this.playerAnimationTimeline.add(tweenBuilderConfig);
        }

    }

    play(){
            this.playerAnimationTimeline.play();
    }

    updateTouchedCave(cave) {
        //add a layer of color on top of image
         cave.tint = 0xff00ff;
    }
    //  The first two callback arguments are always the sprite on which the animation is playing, and the animation itself.
    //  Following this comes whatever you specify in the params array (in this case cave)
    //animationObject has to be sent becuase it wll be called from another object and won't be able to access the parent animation (TravelAnimation)
    handleTweenEnd(sprite, animation, travelAnimationObject, currentNode) {
        if(currentNode == travelAnimationObject.nextNodeToTraverseTo){
            travelAnimationObject.nodesToTraverse.splice(0,1); 
            travelAnimationObject.nextNodeToTraverseTo = travelAnimationObject.nodesToTraverse[0];

            if(travelAnimationObject.stopOnNextTraversalNode){
                travelAnimationObject.canContinue = false; 
            }
        }
        if(travelAnimationObject.canContinue){
            travelAnimationObject.playerAnimationTimeline.resume();
        }
        else{
            travelAnimationObject.playerAnimationTimeline.pause();
        }
        travelAnimationObject.updateTouchedCave(currentNode.cave);
    }

    pauseOnNextNode(){
        this.canContinue = false;
    }
    pauseOnNextNodeInTravesalPath(){
        console.log("pause");
        this.stopOnNextTraversalNode = true;
    }
    resume(){
        console.log("continue");
        this.stopOnNextTraversalNode = false;
        this.canContinue = true;
        this.playerAnimationTimeline.resume();
    }
}

//declare static variables
TravelAnimation.BFSAnimation = 1;
TravelAnimation.InorderAnimation = 2;

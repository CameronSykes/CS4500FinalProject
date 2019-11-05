//Date Created [2019-11-02 Sat]
//Purpose Makes scene that animates traversal of binary tree
// Started 6:30

class Scene1 extends Phaser.Scene {
    constructor () {
        // call superclass (Phaser.Scene) constructor.
        super({key:"Scene1"});
    }
    init(data) {}
    preload () {
        // "../" means go up a directory
        // the assets folder is in the directory above where this file is
        //its called CAVE becuase its a constant
        this.load.image("cave","/assets/images/cave.png");
    }
    create ()  {
        this.CaveImage = this.add.image(400,300,"cave");
        //move image
        var movementRange = this.tweens.add(
            {
                targets: this.CaveImage,
                x:200,
                y:250,
                delay:1000,
                duration:2000
            }
        );
    }
    update(time, delta) {}
 

}

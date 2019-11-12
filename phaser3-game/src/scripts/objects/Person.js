
//I followed this example to make this
// https://phasergames.com/extend-a-sprite-in-phaser-3/

export class Person extends Phaser.GameObjects.Sprite {
    //config is an object with properties we set before calling
    constructor(config) {

        /* This is thow we created the player as a sprite in the first iteration

         var player = this.add.sprite(0, 0, 'person');
         To create an element he sprite needs an

         (x,y position which where 0, and 0 [the top left corner])

         and a string ("person") to refer to it
         
         This line initializes the sprite 
         super(config.scene, config.x, config.y, "bomb");
        */
        super(config.scene, config.x, config.y,config.imageName);

        // show the sprite on the scene
        alert(4);
        config.scene.add.existing(this);

    }
}

var platform;
var screenWidth = 800;
var screenHeight = 600;
var config =
{
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: { y: 300 },
            debug: false
        }
    },
        // scene:
        //     {
        //         preload: preload,
        //         create: create//,
        //         // uncomment when we make the game interactive
        //         // update: update
        //     }

        //TODO move preload and create function to another file
        //Make the program modular use preload create etc functions inanother file
        scene: [ Scene1 ]
    };

const game = new Phaser.Game(config);

function preload()
{
    this.load.image('cave', 'images/cave.png');
    this.load.image('tunnel', 'images/tunnel.png');
    this.load.image('person', 'images/person.png');
}


function create()
{
    caveWidth = 100;
    caveHeight = 100;
    numNodes = 10;// 10 is for an example. The true value will be based on the BST

    // array of cave images
    // The size of the array is meant to be a safe size so all the caves can fit on the screen comfortably
    // Give a buffer
    // Size of array is the number of nodes in the BST. 10 is just for implementation
    caveArr(10);

    // Height of BST is determined by lg(# of nodes)
    treeHeight = Math.ceiling(Math.log2(numNodes));

    // Space of te nodes vertically
    nodeSpace = screenHeight / treeHeight;

    // intent here is to create as many elements as needed
    // if we want 10 elements they all space out properly
    //TODO UNCOMMENT begin
    // Had To Comment this out because my browser wasnt working
    // for each(cave in caveArr)
    // {
	  //     nodeSpace = screenHeight / treeHeight;
	  //   //nodeSpace = ((screenHeight - nodeSapce) / 2) / treeHeight

    // 	  startHeight = nodeSpace;
    //     this.add.image();
    // }
    //TODO UNCOMMENT end
    // cave array ele 1 .angle = 45 for a 45 deg rotation
    platform = this.physics.add.staticGroup();
    platform.create(0, 0, 'tunnel');
    this.add.image(screenWidth / 2, screenHeight, 'cave');

//    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//    game.scale.pageAlignHorizontally = true;
//    game.scale.pageAlignVertically = true;

    this.add.image(750, 50, 'cave');
}

function update()
{
    // Use this function when making the game interactive
}

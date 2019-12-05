import 'phaser';
import '@babel/polyfill';

import Scene1 from './scenes/Scene1.js';
import PreloadScene from './scenes/preloadScene';

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

        //DONE move preload and create function to another file
        //Make the program modular use preload create etc functions inanother file
        scene: [ Scene1 ]
    };


window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
})

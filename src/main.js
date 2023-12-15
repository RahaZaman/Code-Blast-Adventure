/* 

Atri Mehta
Rahamat Zaman

Phaser Main Components: 
- physics
- timer
- particle effects

*/

// define and configure main Phaser game object
let config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
 
    scene: [ Menu, Instruction, Credit, Play]
}

// define game
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// define global variables

// keyboard variables to move Rocketship
let keyLEFT, keyRIGHT;

// keyboard to shoot
let keySPACEBAR; 

// keyboard to switch between scenes
let keyEASY, keyINSTRUCTION, keyCREDIT, keyHARD, keyR;;
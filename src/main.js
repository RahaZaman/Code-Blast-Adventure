/* 

Developers/Collaborators: 
Atri Mehta
Rahamat Zaman

Technical Execution - Phaser Main Components: 
- physics systems
- particle effects
- score (counter)
- camera (background)

Sources/Citations:

Action Background Music (In Play Scene): https://www.chosic.com/download-audio/45301/
Cinematic Background Music (In Menu, Credit, and Instruction Scene): https://uppbeat.io/t/aaron-paul-low/elevator-to-heaven
Coin Sound: https://pixabay.com/sound-effects/collectcoin-6075/
Explosion Sound: https://mixkit.co/free-sound-effects/explosion/

Our game originates from Episode One: "The Woz" (2007) from the tv show Code Monkeys. For our game we followed almost the exact
formatting and style as shown in an image within the episode. We wanted the game to feel as original as possible with some minor 
adaptations and adjustments. 

*We used VSCode live share extension to work together, and we had individual branches and a development branche to work indivually.
Commits are on our branches and across our codebase.*

We keep all of the following from the original (Fake Game): 
- hearts (represents player health)
- rocketship
- alien
- blue background
- score 
- missile shooting

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
        // arcade: {
        //     debug: true,
        //     gravity: {
        //         x: 0,
        //         y: 0
        //     }
        // }
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
let keyEASY, keyINSTRUCTION, keyCREDIT, keyHARD, 

// keyboard to restart game/scene
keyR;
/* 

Atri Mehta
Rahamat Zaman

*/

// define and configure main Phaser game object
let config = {
    type: Phaser.AUTO,
    height: 780,
    width: 600,
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
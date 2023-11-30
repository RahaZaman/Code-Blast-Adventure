class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('alien', './assets/img/alien.png');
        this.load.image('coin', './assets/img/coin.png');
        this.load.image('rocketship', './assets/img/rocketship.png'); 

        // loading background music
        this.load.audio('action-music', './assets/audio/heroic-action-background-music.mp3'); 
    }

    create() {

        // set the background color to be blue: #0000FF

        // define keys to move Rocketship
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define keys to shoot
        keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // define keys to switch scenes
        keyPLAY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyINSTRUCTION = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyCREDIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.keyCodes.C); 

    }

    update() {

    }
      
}
class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // loading background music
        this.load.audio('cinematic-music', './assets/audio/cinematic-background-music.mp3'); 
    }

    create() {

        // Set the background color to blue
        this.cameras.main.setBackgroundColor('#0000FF');

        // playing cinematic background music
        if (!this.sound.get('cinematic-music')) {
            this.backgroundmusic = this.sound.add('cinematic-music', { volume: 0.1, loop: true });
            this.backgroundmusic.play();
        }

        // menu screen configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#F8F9F9',
            color: '#FF0000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Welcome to Code Blast Adventure', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3.8, 'Press I for Instructions', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.8, 'Press P to Play', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.8, 'Press C for Credit', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#0000FF';
        menuConfig.color = '#000';

        // define keys to switch scenes
        keyINSTRUCTION = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyCREDIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyPLAY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {

        // Switching to Instruction Scene
        if (Phaser.Input.Keyboard.JustDown(keyINSTRUCTION)) {
            this.scene.start("instructionScene");    
        }

        // Switching to Play Scene
        if (Phaser.Input.Keyboard.JustDown(keyPLAY)) {
            this.scene.start("playScene");    
        }

        // Switching to Credit Scene
        if (Phaser.Input.Keyboard.JustDown(keyCREDIT)) {
            this.scene.start("creditScene");    
        }
    }
}
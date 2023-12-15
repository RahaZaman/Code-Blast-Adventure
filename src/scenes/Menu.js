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
            fontFamily: 'Rubik Pixels, Papyrus',
            fontSize: '26px',
            fontStyle: 'bold',
            color: '#B22222',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, 'Welcome to Code Blast Adventure', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.2, 'Press I for Instructions', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.8, 'Press E to Play Easy Level or H to Play Hard Level', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5, 'Press C for Credit', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#0000FF';
        menuConfig.color = '#000';

        // define keys to switch scenes
        keyINSTRUCTION = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyCREDIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyEASY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyHARD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }

    update() {

        // Switching to Instruction Scene
        if (Phaser.Input.Keyboard.JustDown(keyINSTRUCTION)) {
            this.scene.start("instructionScene");    
        }

        // Start playScene with easy difficulty
        if (Phaser.Input.Keyboard.JustDown(keyEASY)) {
            this.scene.start('playScene', { difficulty: 'easy' });
        }
        // Start playScene with hard difficulty
        else if (Phaser.Input.Keyboard.JustDown(keyHARD)) {
            this.scene.start('playScene', { difficulty: 'hard' });
        }
        
        // Switching to Credit Scene
        if (Phaser.Input.Keyboard.JustDown(keyCREDIT)) {
            this.scene.start("creditScene");    
        }
    }
}
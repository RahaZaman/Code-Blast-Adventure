class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('alien', './assets/img/alien.png');
        this.load.image('coin', './assets/img/coin.png');
        this.load.image('rocketship', './assets/img/rocketship.png'); 
        this.load.image('missile', './assets/img/missile.png');

        // loading background music
        this.load.audio('action-music', './assets/audio/heroic-action-background-music.mp3'); 
    }

    create() {

        // Set the background color to blue
        this.cameras.main.setBackgroundColor('#0000FF');
        
        // Stop background music from the Menu scene
        this.sound.stopByKey('cinematic-music');
        
        // Add and play game music 
        this.gameMusic = this.sound.add('action-music', { volume: 0.25, loop: true });
        this.gameMusic.play();

        // define keys to move Rocketship
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define keys to shoot
        keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // add Rocketship
        // this.rocketship01 = new Rocketship(this, game.config.width, borderUISize*9 + borderPadding*6, 'rocketship').setScale(0.5);
        this.rocketship01 = new Rocketship(this, 300, 540, 'rocketship').setScale(0.5);

        // Adjusting the size of the rocketship
        this.rocketship01.setScale(0.25, 0.25); 

        // add alien
        this.alien01 = this.physics.add.sprite(this.randomX, this.randomY, 'alien');

        // Adjusting the size of the alien
        this.alien01.setScale(0.10, 0.10); 

        // add coin
        this.coin01 = this.physics.add.sprite(this.randomX, this.randomY, 'coin');

        // Adjusting the size of the coin
        this.coin01.setScale(0.08, 0.08); 

        // Game Over flag
        this.gameOver = false;
    }

    update() {

        // Updates rocketship movement
        this.rocketship01.update(); 

        // Move the alien down by increasing its Y position
        this.alien01.y += 2;

        // Move the coin down by increasing its Y position
        this.coin01.y += 2; 

        // Generate a random Y coordinate within the specified range
        this.randomX = Phaser.Math.Between(100, 700);

        // Generate a random Y coordinate within the specified range
        this.randomY = Phaser.Math.Between(25, 100);
        
    }
      
}
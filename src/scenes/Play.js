class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('alien', './assets/img/alien.png');
        this.load.image('coin', './assets/img/coin.png');
        this.load.image('rocketship', './assets/img/rocketship.png'); 
        this.load.image('missile', './assets/img/missile.png');
        this.load.image('heart', './assets/img/heart.png');

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

        // object dropdown speed
        this.dropdownSpeed = 1.2;

        // Number of lives
        this.lives = 5; 

        // heart objects
        this.heart01 = this.physics.add.sprite(game.config.width - borderUISize, borderUISize, 'heart').setScale(0.05, 0.05);
        this.heart02 = this.physics.add.sprite(game.config.width - borderUISize * 2, borderUISize, 'heart').setScale(0.05, 0.05);
        this.heart03 = this.physics.add.sprite(game.config.width - borderUISize * 3, borderUISize, 'heart').setScale(0.05, 0.05);
        this.heart04 = this.physics.add.sprite(game.config.width - borderUISize * 4, borderUISize, 'heart').setScale(0.05, 0.05);
        this.heart05 = this.physics.add.sprite(game.config.width - borderUISize * 5, borderUISize, 'heart').setScale(0.05, 0.05);

        // add Rocketship
        this.rocketship01 = new Rocketship(this, 300, 540, 'rocketship').setScale(0.5);

        // Adjusting the size of the rocketship
        this.rocketship01.setScale(0.25, 0.25);
        
        // establishing hitbox for rocketship
        this.rocketship01.setSize(770, 470);

        // add alien
        this.alien01 = this.physics.add.sprite(this.randomX, this.randomY, 'alien');

        // Adjusting the size of the alien
        this.alien01.setScale(0.09, 0.09); 

        // establish hitbox for alien
        this.alien01.setSize(800, 800);

        // add coin
        this.coin01 = this.physics.add.sprite(this.randomX, this.randomY, 'coin');

        // Adjusting the size of the coin
        this.coin01.setScale(0.08, 0.08);   

        // establish hitbox for coin
        this.coin01.setSize(700, 650); 

        // Physics group to display hearts
        // this.heartsGroup = this.physics.add.group({
        //     key: 'heart',
        //     // Number of hearts (0 indexed, so repeat: 4 means 5 hearts)
        //     repeat: this.lives - 1,
        //     setXY: {
        //         x: game.config.width - borderUISize,
        //         y: borderUISize,
        //         stepX: -30, // Distance between hearts
        //     },
        //     setScale: { x: 0.05, y: 0.05 },
        // });

        // Collision Handlers 

        // rocketship and alien
        this.physics.add.overlap(this.rocketship01, this.alien01, this.handleAlienCollision, null, this);

        // rocketship and coin
        this.physics.add.overlap(this.rocketship01, this.coin01, this.handleCoinCollision, null, this);

        // Display 5 hearts in the top-right corner
        // for (let i = 0; i < 5; i++) {
        //     let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
        //     // Set unique key for each heart
        //     heart.setData('heartIndex', i);
        // }

        // Display 5 hearts in the top-right corner
        // for (let i = 0; i < 5; i++) {
        //     let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
        //     // Set unique key for each heart  
        //     heart.setData('heartIndex', i);
        //     this.hearts.push(heart);
        // }

        // Game Over flag
        this.gameOver = false;

        // initialize score
        this.Score = 0;

        // score configuration
        let scoreConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '29px',
            color: '#CCD1D1',
            align: 'right',
            margin: {
              top: 5,
              bottom: 5,
            },
            // fixedWidth: 200,
        }

        // displays score on screen
        this.scoreDisplay = this.add.text(borderUISize - 20, borderUISize - 20, "Score: " + this.Score, scoreConfig);

    }

    update() {

        // Updates rocketship movement
        this.rocketship01.update(); 

        // Move the alien down by increasing its Y position
        this.alien01.y += this.dropdownSpeed;

        // Move the coin down by increasing its Y position
        this.coin01.y += this.dropdownSpeed; 

        // Generate a random Y coordinate within the specified range
        this.randomX = Phaser.Math.Between(100, 700);

        // Generate a random Y coordinate within the specified range
        this.randomY = Phaser.Math.Between(0, 100);

        // Conditions to reset the alien and coin to the top of screen
        if (this.alien01.y >= this.game.config.height) {
            this.alien01.setPosition(this.randomX, this.randomY);
        }
        else if (this.coin01.y >= this.game.config.height) {
            this.coin01.setPosition(this.randomX, this.randomY);
        }

    }

    // Function to handle collisions between rocketship and alien 
    handleAlienCollision(rocketship, alien) {

        // Checks if game is over
        if (this.lives === 0) {
            this.gameOver = true;
        }

        // Remove a heart from the screen
        // let hearts = this.heartsGroup.getChildren();
        // if (hearts.length > 0) {
        //     let removedHeart = hearts.pop();
        //     removedHeart.destroy();
        // }

        // Decrement the number of lives
        this.lives--;

        // Conditions to reset the alien and coin to the top of screen
        if (this.alien01.y >= this.game.config.height) {
            this.alien01.setPosition(this.randomX, this.randomY);
        }
        else if (this.coin01.y >= this.game.config.height) {
            this.coin01.setPosition(this.randomX, this.randomY);
        }
    }

    // Functions to handle collisions between rocketship and coin
    handleCoinCollision(rocketship, coin) {
        // Increase the score by 1
        this.Score += 1;

        // Update the text on the screen
        this.scoreDisplay.text = "Score: " + this.Score;

        // Reset the coin to the top of the screen
        this.coin01.setPosition(this.randomX, this.randomY);
    }

}
class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.dropdownSpeed = 1.2;
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
    init(data) {
        // Adjust dropdown speed based on the difficulty
        if (data.difficulty === 'hard') {
            this.dropdownSpeed = 2.5; // Faster speed for hard level
        } else {
            this.dropdownSpeed = 1; // Slower speed for easy level
        }
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
        //keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // object dropdown speed
        //this.dropdownSpeed = 1.2;

        // Number of lives
        this.lives = 5; 

        // array to store hearts
        this.hearts = [];

        // add Rocketship
        this.rocketship01 = new Rocketship(this, 300, 540, 'rocketship').setScale(0.5);

        // Adjusting the size of the rocketship
        this.rocketship01.setScale(0.25, 0.25); 

        this.missiles = this.physics.add.group();
        this.input.keyboard.on('keydown-SPACE', () => {
            this.fireMissile();
        });

        // Set collision bounds for the rocketship
        // this.rocketship01.setCollideWorldBounds(true);

        this.physics.add.overlap(this.missiles, this.alien01, this.handleMissileAlienCollision, null, this);

        
        // establishing hitbox for rocketship
        this.rocketship01.setSize(770, 470);

        // add alien
        this.randomX = Phaser.Math.Between(100, 700);
        this.randomY = Phaser.Math.Between(0, 100);
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
        //this.physics.add.overlap(this.rocketship01, this.alien01, this.handleAlienCollision, null, this);

        // rocketship and coin
        this.physics.add.overlap(this.rocketship01, this.coin01, this.handleCoinCollision, null, this);

        // Display 5 hearts in the top-right corner
        // for (let i = 0; i < 5; i++) {
        //     let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
        //     // Set unique key for each heart
        //     heart.setData('heartIndex', i);
        // }

        // Display 5 hearts in the top-right corner
        for (let i = 0; i < 5; i++) {
            let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
            // Set unique key for each heart  
            heart.setData('heartIndex', i);
            this.hearts.push(heart);
        }

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
    fireMissile() {
        let missileY = this.rocketship01.y - this.rocketship01.displayHeight / 0.8;
        let missile = new Missile(this, this.rocketship01.x, missileY);
        this.missiles.add(missile);
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

        // Update all missiles
        this.missiles.getChildren().forEach(missile => {
            missile.update();
        });

        // Conditions to reset the alien and coin to the top of screen
        if (this.alien01.y >= this.game.config.height) {
            this.alien01.setPosition(this.randomX, this.randomY);
        }
        else if (this.coin01.y >= this.game.config.height) {
            this.coin01.setPosition(this.randomX, this.randomY);
        }

        // check collisions between rocketship and coin
        // if (this.checkCollision(this.rocketship01, this.coin01)) {
        //     // adds to score and updates text on screen
        //     this.Score += 1;
        //     this.scoreDisplay.text = this.Score; 

    }
    
    handleMissileAlienCollision(missile, alien) {
        // Destroy or deactivate the missile
        missile.destroy(); 
        // Handle the impact on the alien ship
        alien.destroy(); 
    }

    // Function to handle collisions between rocketship and alien 
    handleAlienCollision(rocketship, alien) {

        // Decrement the number of lives
        this.lives--;

        // Remove a heart from the screen
        let hearts = this.heartsGroup.getChildren();
        if (hearts.length > 0) {
            let removedHeart = hearts.pop();
            removedHeart.destroy();
        }

        // Checks if game is over
        if (this.lives === 0) {
            this.gameOver = true;
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
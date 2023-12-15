class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.dropdownSpeed = 1.2;
        this.Score = 0;
    }

    preload() {

        // loading images
        this.load.image('alien', './assets/img/alien.png');
        this.load.image('particle', './assets/img/particle.png');
        this.load.image('coin', './assets/img/coin.png');
        this.load.image('rocketship', './assets/img/rocketship.png'); 
        this.load.image('missile', './assets/img/missile.png');
        this.load.image('heart', './assets/img/heart.png');

        // loading audio
        this.load.audio('action-music', './assets/audio/heroic-action-background-music.mp3'); 
        this.load.audio('coinsound','./assets/audio/coinsound.mp3');
        this.load.audio('explosion-sound', './assets/audio/explosion-sound.wav')
        this.load.audio('launch','./assets/audio/launch.mp3');


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

        // define key to restart game/scene
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // define keys to shoot
        // keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // lose and restart configuration
        this.losePrompt = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'GAME OVER! YOU LOST! Press R to Restart', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
            align: 'center'
        }).setOrigin(0.5).setVisible(false);

        // win and restart configuration
        this.winPrompt = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'GAME OVER! YOU WON! Press R to Restart', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
            align: 'center'
        }).setOrigin(0.5).setVisible(false);

        // lives variable
        this.lives = 5

        // array of hearts
        this.hearts = [];

        // add Rocketship
        this.rocketship01 = new Rocketship(this, 300, 540, 'rocketship').setScale(0.5);

        // Adjusting the size of the rocketship
        this.rocketship01.setScale(0.25, 0.25); 

        this.missiles = this.physics.add.group();
        // Event listener to fire missiles when SPACE is pressed
        this.input.keyboard.on('keydown-SPACE', () => {
            this.fireMissile();
        });

        // establishing hitbox for rocketship
        this.rocketship01.setSize(770, 470);

        // Display 5 hearts in the top-right corner
        for (let i = 0; i < 5; i++) {
        let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
            // Set unique key for each heart  
            heart.setData('heartIndex', i);
            this.hearts.push(heart);
        }

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

        // Collision Handlers 

        // rocketship and coin
        this.physics.add.overlap(this.rocketship01, this.coin01, this.handleCoinCollision, null, this);

        // player and alien
        this.physics.add.overlap(this.rocketship01, this.alien01, this.handleAlienCollision, null, this);

        // missile and alien
        this.physics.add.overlap(this.missiles, this.alien01, this.handleMissileAlienCollision, null, this);

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

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(this.keyR)) {
            // Reset game state
            this.resetGameState();
    
            // Restart the scene
            this.scene.restart();
        }

        if (!this.gameOver) {
            this.rocketship01.update();

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
        }

    }

    // Function that sets up missile to shoot and adds it to group 
    fireMissile() {
        let missile = new Missile(this, this.rocketship01.x - 8, this.rocketship01.y);
        this.missiles.add(missile);
        this.sound.play('launch');
    }

    // Function to restart game state
    resetGameState() {
        this.Score = 0;
        this.scoreDisplay.text = "Score: " + this.Score;
        this.gameOver = false;
        this.winPrompt.setVisible(false);
        this.losePrompt.setVisible(false);

        this.physics.resume(); 

        if (this.gameMusic && this.gameMusic.isPlaying) {
            this.gameMusic.stop();
        }
    }
    
    // Particle effect/emitter function
    createExplosion(x, y) {
        const emitter = this.add.particles('particle').createEmitter({
            x: x,
            y: y,
            lifespan: 2000,
            speed: { min: 100, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0 },
            blendMode: 'ADD',
            quantity: 20,
            on: false
        });
    
        emitter.explode(20, x, y);
    }


    // Function to handle collisions between missile and alien
    handleMissileAlienCollision(alien, missile) {
        // Destroy or deactivate the missile
        missile.destroy(); 

        this.createExplosion(alien.x, alien.y);

        // Play the explosion sound when missile hits alien
        this.sound.play('explosion-sound');

        // reset position of alien object
        this.alien01.setPosition(this.randomX, this.randomY);
    }    

    // Function to handle collisions between rocketship and alien 
    handleAlienCollision(rocketship, alien) {
        // Decrement the number of lives
        this.lives--;
    
        // Remove a heart from the display
        if (this.hearts.length > 0) {
            let removedHeart = this.hearts.pop();
            removedHeart.destroy();
        }

        // Check if all lives are lost
        if (this.lives <= 0) {
            this.losePrompt.setVisible(true); 
            this.endGame();
        }
    
        // Reset the alien position
        this.alien01.setPosition(this.randomX, this.randomY);
    }

    // Functions to handle collisions between rocketship and coin
    handleCoinCollision(rocketship, coin) {
        // Increase the score by 1
        this.Score += 1;

        // Update the text on the screen
        this.scoreDisplay.text = "Score: " + this.Score;

        // Play the coin sound
        this.sound.play('coinsound');

        if (this.Score >= 5) {
            // Set game over flag
            this.winPrompt.setVisible(true); 
            this.endGame();
        }

        // Reset the coin to the top of the screen
        this.coin01.setPosition(this.randomX, this.randomY);
    }

    // End game function
    endGame() {
        this.gameOver = true;
        this.physics.pause(); // Pause game mechanics
    }
}
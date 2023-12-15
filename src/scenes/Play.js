class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.dropdownSpeed = 1.2;
        this.Score = 0;
        
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

        // define key to restart game/scene
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        // restart configuration
        this.restartPrompt = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'GAME OVER! Press R to Restart', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
            align: 'center'
        }).setOrigin(0.5).setVisible(false);
        
        // define keys to shoot
        //keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        // add alien
        this.randomX = Phaser.Math.Between(100, 700);
        this.randomY = Phaser.Math.Between(0, 100);
        this.alien01 = this.physics.add.sprite(this.randomX, this.randomY, 'alien');

        // Adjusting the size of the alien
        this.alien01.setScale(0.09, 0.09); 

        // establish hitbox for alien
        this.alien01.setSize(800, 800);

        this.physics.add.overlap(this.rocketship01, this.alien01, this.handleMissileAlienCollision, null, this);

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



        // rocketship and coin
        this.physics.add.overlap(this.rocketship01, this.coin01, this.handleCoinCollision, null, this);

        // Display 5 hearts in the top-right corner
        // for (let i = 0; i < 5; i++) {
        //     let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
        //     // Set unique key for each heart
        //     heart.setData('heartIndex', i);
        // }

        // Display 5 hearts in the top-right corner
        //for (let i = 0; i < 5; i++) {
           // let heart = this.add.image(game.config.width - borderUISize - (i * 30), borderUISize, 'heart').setScale(0.05, 0.05);
            // Set unique key for each heart  
            //heart.setData('heartIndex', i);
            //this.hearts.push(heart);
        //}

        // heart group and alien
        //this.physics.add.collider(this.heartsGroup, this.alien01, this.handleAlienHeartCollision, null, this);


        // Game Over flag
        //this.gameOver = false;

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

        // collision handler for missile and alien
        // this.physics.add.overlap(missile, this.alien01, this.handleMissileAlienCollision, null, this);
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
        }

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

        // check collisions
        // if (this.checkCollision(this.missile, this.alien01)) {
        //     this.missile.destroy(); 
        //     this.missile.reset();
        //     this.resetAlien();
        // }

        // Update all missiles
        this.missiles.getChildren().forEach(missile => {
            missile.update();
        });

        this.physics.overlap(this.missiles, this.alien01, this.handleMissileAlienCollision, null, this);

        // Conditions to reset the alien and coin to the top of screen
        if (this.alien01.y >= this.game.config.height) {
            this.alien01.setPosition(this.randomX, this.randomY);
        }
        else if (this.coin01.y >= this.game.config.height) {
            this.coin01.setPosition(this.randomX, this.randomY);
        }

    }

    // Function to reset the alien to the top of the screen
    resetAlien() {
        this.randomX = Phaser.Math.Between(100, 700);
        this.randomY = Phaser.Math.Between(0, 100);
        this.alien01.setPosition(this.randomX, this.randomY);
    }



    // Function to restart game
    resetGameState() {
        this.Score = 0;
        this.scoreDisplay.text = "Score: " + this.Score;
        this.gameOver = false;
        this.restartPrompt.setVisible(false);
        this.physics.resume(); 

        if (this.gameMusic && this.gameMusic.isPlaying) {
            this.gameMusic.stop();
        }
    }

    // checkCollision(missile, alien) {
    //     // simple AABB checking
    //     if (missile.x < alien.x + alien.width && 
    //         missile.x + missile.width > alien.x && 
    //         missile.y < alien.y + alien.height &&
    //         missile.height + missile.y > alien.y) {
    //             return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    // Function to handle collisions between missile and alien
    handleMissileAlienCollision(missile, alien) {
        // Destroy or deactivate the missilep
        // missile.destroy(); 

        // Deactivate the missile
        missile.setActive(false);
        missile.setVisible(false);

        // Handle the impact on the alien ship
        // alien.destroy(); 

        // resets the missile
        // missile.reset();

        // reset position of alien object
        // this.alien01.setPosition(this.randomX, this.randomY);
        this.resetAlien();
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
            this.endGame();
        }
    
        // Reset the alien position
        // this.alien01.setPosition(this.randomX, this.randomY);
        this.alien01.resetAlien();
    }
    
    // endGame() {
      //  if (this.lives === 0) {
        //    this.gameOver = true;
          //  this.physics.pause(); 
        //}
        //this.restartPrompt.setVisible(true); 
    //}

    endGame() {
        this.gameOver = true;
        this.physics.pause(); // Pause game mechanics
        this.restartPrompt.setVisible(true); 
    }

    // Functions to handle collisions between rocketship and coin
    handleCoinCollision(rocketship, coin) {
        // Increase the score by 1
        this.Score += 1;

        // Update the text on the screen
        this.scoreDisplay.text = "Score: " + this.Score;

        if (this.Score >= 5) {
            // Set game over flag
            this.endGame();
        }

        // Reset the coin to the top of the screen
        this.coin01.setPosition(this.randomX, this.randomY);
    }
}
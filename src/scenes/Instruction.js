class Instruction extends Phaser.Scene {
    constructor(){
        super("instructionScene");
    }

    create() {

        // Set the background color to blue
        this.cameras.main.setBackgroundColor('#0000FF');

        // instruction screen configuration
        let instructionConfig = {
            fontFamily: 'Rubik Pixels, Papyrus', 
            fontSize: '25px', 
            //backgroundColor: '#F8F9F9',
            color: '#B22222',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        let mssgConfig = {
            fontFamily: 'Rubik Pixels, Papyrus', 
            fontSize: '23px', 
            //backgroundColor: '#F8F9F9',
            color: '#B22222',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: game.config.width - 20, // Adjust the width as needed
            wordWrap: { width: game.config.width - 20, useAdvancedWrap: true }
        };
        const mssg = `Code Blast Adventure has 2 objectives: Shoot the aliens before you lose all your health or collect 5 coins to win the Game!
       

        Use the right and left keys to move!
        `;
        this.add.text(game.config.width/2, game.config.height/3.5 - borderUISize - borderPadding, 'Instructions', instructionConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 300, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 425, 'Click <- to go back to menu' , instructionConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        
    }

    update() {

        // Left key to switch back to Menu Scene 
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");    
        }
    }
}
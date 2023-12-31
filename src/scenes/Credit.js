class Credit extends Phaser.Scene {
    constructor(){
        super("creditScene");
    }
    
    create(){

        // Set the background color to blue
        this.cameras.main.setBackgroundColor('#0000FF');

        // Credit screen configuration
        let creditConfig = {
            fontFamily: 'Rubik Pixels, Papyrus', 
            fontSize: '25px', 
            fontStyle: 'bold',
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
            fontSize: '30px', 
            fontStyle: 'bold',
            color: '#B22222',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = `Developed by: Atri Mehta and Rahamat Zaman`;
        
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Credits', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 250, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 325, 'Click <- to go back to menu' , creditConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update(){

        // Left key to switch back to Menu Scene
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              this.scene.start("menuScene");    
        }
    }

}
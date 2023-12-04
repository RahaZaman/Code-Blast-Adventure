class Instruction extends Phaser.Scene {
    constructor(){
        super("instructionScene");
    }

    create() {
        //this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
   
        let instructionConfig = {
            fontFamily: 'Merci', 
            fontSize: '25px', 
            backgroundColor: 'transparent',
            color: 'red',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        let mssgConfig = {
            fontFamily: 'Merci', 
            fontSize: '19px', 
            backgroundColor: 'transparent',
            color: 'green',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = `SpaceFootballRun has 2 objectives: Run and Dodge the football coming at you!
       

        Use the space bar to jump. Good Luck!!
        `;
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'Instructions', instructionConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 250, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 375, 'Click <- to go back to menu' , instructionConfig).setOrigin(0.5);

        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        
   
    }
    update(){

    

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");    
        }
    }
}
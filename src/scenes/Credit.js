class Credit extends Phaser.Scene {
    constructor(){
        super("creditScene");
    }
    create(){
        //this.background= this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        
        let creditConfig = {
            fontFamily: 'Georgia', 
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
            fontFamily: 'Georgia', 
            fontSize: '10px', 
            backgroundColor: 'transparent',
            color: 'green',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = 
        `Developed by: Atri Mehta and Rahamat Zaman
        

        Assets: Football sprite: https://www.deviantart.com/jynxedones/art/BW-Football-Player-OW-Walking-Sprite-485628399
                Jump Sound: https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6462
                Music: https://uppbeat.io/t/matrika/action-replay/https://www.chosic.com/download-audio/27878/
                Art edited on PixelArt

        Modified the sprite sheet to fit game. 

        `;
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'Credits', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 200, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 300, 'Click <- to go back to menu' , creditConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        

    }
    update(){

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              this.scene.start("menuScene");    
        }
    }

}
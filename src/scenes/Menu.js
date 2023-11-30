class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {

    }

    create() {
        // menu screen configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#F8F9F9',
            color: '#FF0000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Code Blast Adventure', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3.95, 'Press P to Play', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FF0000';
        menuConfig.color = '#000';
    }

    update() {
      
    }
}
// Rocketship prefab
class Rocketship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); 
        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);

        // this.setCollideWorldBounds(true);
     
        this.moveSpeed = 2;     // pixels per frame
    }

    update() {
        // Arrow Key Input

        // left
        if (keyLEFT.isDown) {
            this.x -= this.moveSpeed;
        }
        
        // right    
        else if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
        }
    }
}
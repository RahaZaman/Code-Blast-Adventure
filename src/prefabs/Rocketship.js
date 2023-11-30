// Rocketship prefab
class Rocketship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); 

        this.moveSpeed = 1.5;     // pixels per frame
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
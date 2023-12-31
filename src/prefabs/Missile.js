class Missile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'missile');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityY(-300); // Adjust the speed as needed
        this.moveSpeed = 2.5;
    }

    update() {
        if (this.y < 0 - this.height) {
            this.destroy(); // Destroys the missile when it goes off the screen
        }
        if (this.y > 0) {
            this.y -= this.moveSpeed
        }
        else {
            this.destroy()
        }
    }

    // Position resets
    reset() {
        this.y = game.config.height; // This will place the missile at the bottom of the screen
    }
}
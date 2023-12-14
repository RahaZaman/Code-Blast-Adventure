class Missile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'missile');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setVelocityY(-300); // Adjust the speed as needed
    }

    update() {
        // Remove the missile if it goes off-screen
        if (this.y < 0) {
            this.destroy();
        }
    }
}


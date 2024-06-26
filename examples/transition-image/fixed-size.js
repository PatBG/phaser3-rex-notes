import phaser from 'phaser/src/phaser.js';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('user', 'assets/images/user.png');
        this.load.image('A-smile', 'assets/images/characters/portrait-src/A-smile.png');
    }

    create() {
        var image = this.add.rexTransitionImage(400, 300, 'user', undefined, {
            width: 120, height: 120
        })
            .on('complete', function () {
                console.log(image.currentImage.scaleX, image.currentImage.scaleY);
            })

        console.log(image.texture.key, image.width, image.height);
        image.transit('A-smile');
        console.log(image.texture.key, image.width, image.height);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexTransitionImage',
            plugin: TransitionImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
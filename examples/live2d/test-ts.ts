import 'phaser';

import Live2dPlugin from '../../plugins/live2d-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        this.load.rexLive2d('Hiyori', 'assets/live2d/Hiyori/Hiyori.model3.json');
    }

    create() {
        var x = 1920 / 2,
            y = 1080 / 2;

        var character = this.add.rexLive2d(x, y, 'Haru', {
            autoPlayIdleMotion: 'TapBody'
        })
            .setScale(0.25);

    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexLive2d',
                plugin: Live2dPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
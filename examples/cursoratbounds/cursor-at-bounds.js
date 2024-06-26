import phaser from 'phaser/src/phaser.js';
import CursorAtBoundsPlugin from '../../plugins/cursoratbounds-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() { }

    create() {
        this.cursorAtBounds = this.plugins.get('rexCursorAtBounds').add(this, {
            sensitiveDistance: 20,
            pointerOutGameRelease: false,
            bounds: new Phaser.Geom.Rectangle(100, 100, 600, 400)
        });

        this.debugGraphics = this.add.graphics();
        this.print = this.add.text(0, 0, '');
    }

    update() {
        var cursorKeys = this.cursorAtBounds.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        this.print.text = s;

        this.debugGraphics
            .clear()
            .lineStyle(3, 0x00ff00)
            .strokeRectShape(this.cursorAtBounds.bounds)
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,  // RESIZE
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCursorAtBounds',
            plugin: CursorAtBoundsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
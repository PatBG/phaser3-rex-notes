import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var panel0 = CreateScrollablePanel(this, 30).setPosition(200, 300).layout();
        var panel1 = CreateScrollablePanel(this, 10).setPosition(400, 300).layout();
        var panel2 = CreateScrollablePanel(this, 1).setPosition(600, 300).layout();

        var panels = [panel0, panel1, panel2];
        panels.forEach(function (panel) {
            SetDragable(panel);
        })
    }

    update() { }
}

var CreateScrollablePanel = function (scene, itemCount) {
    return scene.rexUI.add.scrollablePanel({
        width: 150, height: 420,

        scrollMode: 'y',

        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            strokeColor: COLOR_DARK
        }),

        panel: {
            child: CreatePanel(scene, itemCount),
            mask: {
                padding: 2,
            },
        },

        slider: {
            track: scene.rexUI.add.roundRectangle({
                width: 20,
                radius: 10,
                color: COLOR_DARK
            }),
            thumb: scene.rexUI.add.roundRectangle({
                radius: 13,
                color: COLOR_LIGHT
            }),
        },

        scroller: false,

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }
    })
}

var CreatePanel = function (scene, itemCount) {
    if (itemCount === undefined) {
        itemCount = 0;
    }

    var sizer = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 6, right: 6, top: 6, bottom: 6, item: 6 },
    })

    for (var i = 0; i < itemCount; i++) {
        sizer.add(
            CreateLabel(scene, i.toString()),
            { expand: true }
        );
    }
    return sizer;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_LIGHT
        }),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'center',
        space: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        },

    })
}

var SetDragable = function (scrollablePanel) {
    var rexUI = scrollablePanel.scene.rexUI;

    // Set background as dropZone
    var background = scrollablePanel.getElement('background');
    background.setInteractive({ dropZone: true });

    var items = scrollablePanel.getElement('panel.items');
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        let child = items[i];
        child
            .setInteractive({ draggable: true })
            .on('dragstart', function (pointer, dragX, dragY) {
                var currentSizer = child.getParentSizer();
                // Save start sizer and index
                child.setData({
                    sizer: currentSizer,
                    index: currentSizer.getChildIndex(child)
                });
                currentSizer.remove(child);
                // Don't layout currentSizer in this moment,
                // just clear mask manually
                child.clearMask();

                OnChildDragStart(child);
            })
            .on('drag', function (pointer, dragX, dragY) {
                // On dragging
                child.setPosition(dragX, dragY);
            })
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                if (dropped) { // Process 'drop' event
                    return;
                }

                var previousSizer = child.getData('sizer');

                OnChildDragEnd(child);

                // Insert back to previous sizer if not dropping on another panel
                previousSizer.insert(child.getData('index'), child, { expand: true });
                ArrangeItems(previousSizer);
            })
            .on('drop', function (pointer, dropZone) {
                // Drop at another sizer
                OnChildDragEnd(child);

                // dropZone : Background = RoundRectangleShape
                var currentSizer = rexUI.getTopmostSizer(dropZone).getElement('panel'),
                    previousSizer = child.getData('sizer');

                // Layout previous sizer
                if (previousSizer !== currentSizer) {
                    ArrangeItems(previousSizer);
                }

                // Item is placed to new position in current sizer
                currentSizer.insertAtPosition(
                    pointer.x, pointer.y,
                    child,
                    { expand: true }
                );
                ArrangeItems(currentSizer);
            })
    }
}

var OnChildDragStart = function (child) {
    child.setDepth(1);
    child.getElement('background').setStrokeStyle(3, 0xff0000);
}

var OnChildDragEnd = function (child) {
    child.setDepth(0);
    child.getElement('background').setStrokeStyle();
}

var ArrangeItems = function (sizer) {
    var children = sizer.getElement('items');
    // Save current position
    children.forEach(function (child) {
        child.setData({ startX: child.x, startY: child.y });
    })
    // Item is placed to new position in sizer
    sizer.getTopmostSizer().layout();
    // Move child from start position to new position
    children.forEach(function (child) {
        var fromX = child.getData('startX'),
            fromY = child.getData('startY');
        if ((child.x !== fromX) || (child.y !== fromY)) {
            child.moveFrom({ x: fromX, y: fromY, speed: 300 })
        }
    })
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);
import Sequence from './sequence.js';

class SequencePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(config) {
        return new Sequence(undefined, config);
    }
}

export default SequencePlugin;
import Sizer from '../sizer/Sizer.js';
import Build from './methods/Build.js';
import ProgressValueMethods from '../../../plugins/utils/progressvalue/ProgressValueMethods.js';

class NameValueLabel extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexNameValueLabel';

        Build.call(this, scene, config);
    }

    // Access nameText game object
    get nameText() {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set nameText(value) {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setNameText(value) {
        this.nameText = value;
        return this;
    }

    // Access valueText game object
    get valueText() {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set valueText(value) {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setValueText(value) {
        this.valueText = value;
        return this;
    }

    // Access icon game object
    setTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return;
        }
        imageObject.setTexture(key, frame);
        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
            return this;
        }

        super.runLayout(parent, newWidth, newHeight);
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.setPosition();
            this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.setPosition();
            this.resetChildPositionState(actionMask);
        }
        return this;
    }

    resize(width, height) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.resize();
        }
        return this;
    }

    get value() {
    }

    set value(value) {

    }
}

Object.assign(
    NameValueLabel.prototype,
    ProgressValueMethods
)

export default NameValueLabel;
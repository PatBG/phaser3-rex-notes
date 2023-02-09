import Label from '../label/Label';
import BuildDisplayLabelConfig from '../utils/build/BuildDisplayLabelConfig';

export default SimpleLabel;

declare namespace SimpleLabel {
    interface IConfig extends BuildDisplayLabelConfig.IConfig {
    }
}

declare class SimpleLabel extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleLabel.IConfig
    );

}
import * as Phaser from 'phaser';

import ButtonsFactory from './buttons/Factory';
import CanvasFactory from './canvas/Factory';
import CircleMaskImageFactory from './circlemaskimage/Factory';
import ContainerFactory from './container/Factory';
import DialogFactory from './dialog/Factory';
import LabelFactory from './label/Factory';
import MenuFactory from './menu/Factory';
import NinePatchFactory from './ninepatch/Factory';
import NumberBarFactory from './numberbar/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';
import SizerFactory from './sizer/Factory';

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        buttons: ButtonsFactory,
        canvas: CanvasFactory,
        circleMaskImage: CircleMaskImageFactory,
        container: ContainerFactory,
        dialog: DialogFactory,
        label: LabelFactory,
        menu: MenuFactory,
        ninePatch: NinePatchFactory,
        numberBar: NumberBarFactory,
        roundRectangle: RoundRectangleFactory,
        sizer: SizerFactory,
    }
}
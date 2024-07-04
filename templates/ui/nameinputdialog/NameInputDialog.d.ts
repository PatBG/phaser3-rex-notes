import Dialog from '../dialog/Dialog';
import BaseSizer from '../basesizer/BaseSizer';
import { GeneralCreateGameObjectCallbackType } from '../utils/build/GeneralCreateGameObjectCallbackType';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import InputText from '../canvasinput/CanvasInput';
import Label from '../label/Label';

export default NameInputDialog;

declare namespace NameInputDialog {
    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,

            names?: number,
            firstNameTitle?: number,
            lastNameTitle?: number,
            content?: number,
            contentLeft?: number,
            contentRight?: number,

            actionsLeft?: number,
            actionsRight?: number,
            action?: number,
        };

        background?: CreateBackground.IConfig,

        title?: SimpleLabel.IConfig,

        firstNameTitle?: SimpleLabel.IConfig,
    
        firstNameInput?: InputText.IConfig,

        lastNameTitle?: SimpleLabel.IConfig,

        lastNameInput?: InputText.IConfig,

        button?: SimpleLabel.IConfig,

        proportion?: {
            title?: number,
            actions?: number,
        },

        expand?: {
            title?: boolean,
            actions?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            actions?: AlignTypes,
        },

        click?: IConfigClick,

        modal?: Dialog.IModalConfig
    }

    interface IResetChoiceDisplayContentConfig extends Label.IResetDisplayContentConfig {
        value?: any;
    }

    interface IResetDisplayContentConfig {
        title?: string | Label.IResetDisplayContentConfig,
        firstNameTitle?: string | Label.IResetDisplayContentConfig,
        lastNameTitle?: string | Label.IResetDisplayContentConfig,
        button?: string | Label.IResetDisplayContentConfig,

        firstName?: string,
        lastName?: string,
    }

    interface ICreatorsConfig {
        background?: GeneralCreateGameObjectCallbackType,
        title?: SimpleLabel.ICreatorsConfig,
        firstNameTitle?: SimpleLabel.ICreatorsConfig,
        lastNameTitle?: SimpleLabel.ICreatorsConfig,
        button?: SimpleLabel.ICreatorsConfig,
    }
}

declare class NameInputDialog extends Dialog {
    constructor(
        scene: Phaser.Scene,
        config?: NameInputDialog.IConfig,
        creators?: NameInputDialog.ICreatorsConfig
    );

    resetDisplayContent(
        config?: NameInputDialog.IResetDisplayContentConfig
    ): this;
}
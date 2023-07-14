export default AddBlurProperties;

declare namespace AddBlurProperties {
    interface BlurGameObject extends Phaser.GameObjects.GameObject {
        blurColor: number | null | false;
        blurQuality: number;
        blurX: number;
        blurY: number;
        blurStrength: number;
        blurSteps: number;
    }
}

declare function AddBlurProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBlurProperties.BlurGameObject;
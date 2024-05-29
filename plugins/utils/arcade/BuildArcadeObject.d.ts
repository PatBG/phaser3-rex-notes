declare class ArcadeGameObject extends Phaser.GameObjects.GameObject {
    setAcceleration(x: number, y?: number): this;
    setAccelerationX(value: number): this;
    setAccelerationY(value: number): this;
    setAngularVelocity(value: number): this;
    setAngularAcceleration(value: number): this;
    setAngularDrag(value: number): this;
    setBounce(x: number, y?: number): this;
    setBounceX(value: number): this;
    setBounceY(value: number): this;
    setCollideWorldBounds(value?: boolean, bounceX?: number, bounceY?: number, onWorldBounds?: boolean): this;
    setCollisionCategory(category: number): this;
    willCollideWith(category: number): boolean;
    addCollidesWith(category: number): this;
    removeCollidesWith(category: number): this;
    setCollidesWith(categories: number | number[]): this;
    resetCollisionCategory(): this;
    setDebug(showBody: boolean, showVelocity: boolean, bodyColor: number): this;
    setDebugBodyColor(value: number): this;
    debugShowBody: boolean;
    debugShowVelocity: boolean;
    debugBodyColor: number;
    setDrag(x: number, y?: number): this;
    setDragX(value: number): this;
    setDragY(value: number): this;
    setDamping(value: boolean): this;
    setDirectControl(value?: boolean): this;
    enableBody(reset?: boolean, x?: number, y?: number, enableGameObject?: boolean, showGameObject?: boolean): this;
    disableBody(disableGameObject?: boolean, hideGameObject?: boolean): this;
    refreshBody(): this;
    setFriction(x: number, y?: number): this;
    setFrictionX(x: number): this;
    setFrictionY(y: number): this;
    setGravity(x: number, y?: number): this;
    setGravityX(x: number): this;
    setGravityY(y: number): this;
    setImmovable(value?: boolean): this;
    setMass(value: number): this;
    setPushable(value?: boolean): this;
    setOffset(x: number, y?: number): this;
    setBodySize(width: number, height: number, center?: boolean): this;
    setCircle(radius: number, offsetX?: number, offsetY?: number): this;
    setVelocity(x: number, y?: number): this;
    setVelocityX(x: number): this;
    setVelocityY(y: number): this;
    setMaxVelocity(x: number, y?: number): this;
}

export default function BuildArcadeObject(
    gameObject: Phaser.GameObjects.GameObject,
    isStatic?: boolean
): ArcadeGameObject;

export default function BuildArcadeObject(
    gameObject: Phaser.GameObjects.GameObject[],
    isStatic?: boolean
): ArcadeGameObject[];
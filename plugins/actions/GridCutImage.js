import GenerateFrames from '../utils/texture/gridcut/GenerateFrames.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DefaultImageClass = Phaser.GameObjects.Image;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const RotateAround = Phaser.Math.RotateAround;

var GridCutImage = function (gameObject, columns, rows, config) {
    if (IsPlainObject(columns)) {
        config = columns;
        columns = GetValue(config, 'columns', 1);
        rows = GetValue(config, 'rows', 1);
    }

    var createImageCallback = GetValue(config, 'onCreateImage');
    if (!createImageCallback) {
        var ImageClass = GetValue(config, 'ImageClass', DefaultImageClass);
        createImageCallback = function (scene, key, frame) {
            return new ImageClass(scene, 0, 0, key, frame);
        }
    }

    var originX = GetValue(config, 'originX', 0.5);
    var originY = GetValue(config, 'originY', 0.5);

    var overlap = GetValue(config, 'overlap', 0);
    var overlapX = GetValue(config, 'overlapX', overlap);
    var overlapY = GetValue(config, 'overlapY', overlap);

    var addToScene = GetValue(config, 'add', true);

    var align = GetValue(config, 'align', addToScene);

    var imageObjectPool = GetValue(config, 'objectPool', undefined);

    var scene = gameObject.scene;
    var texture = gameObject.texture;
    var frame = gameObject.frame;

    var result = GenerateFrames(scene, texture, frame, columns, rows, overlapX, overlapY);
    var getFrameNameCallback = result.getFrameNameCallback;
    var scaleX = gameObject.scaleX,
        scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;
    var topLeft = gameObject.getTopLeft(),
        startX = topLeft.x,
        startY = topLeft.y;

    var cellGameObjects = [];
    var scaleCellWidth = result.cellWidth * scaleX,
        scaleCellHeight = result.cellHeight * scaleY;
    var scaleOverlapX = overlapX * scaleX,
        scaleOverlapY = overlapY * scaleY;
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < columns; x++) {
            var cellGameObject;

            var frameName = getFrameNameCallback(x, y);
            if (imageObjectPool && (imageObjectPool.length > 0)) {
                cellGameObject = (imageObjectPool.pop()).setTexture(texture, frameName);
            } else {
                cellGameObject = createImageCallback(scene, texture, frameName);
            }

            if (addToScene) {
                scene.add.existing(cellGameObject);
            }

            var cellTLX = startX + (scaleCellWidth * x) - (scaleOverlapX * (x - 1));
            var cellTLY = startY + (scaleCellHeight * y) - (scaleOverlapY * (y - 1));
            var cellX = cellTLX + (originX * scaleCellWidth);
            var cellY = cellTLY + (originY * scaleCellHeight);

            if (align) {
                cellGameObject
                    .setOrigin(originX, originY)
                    .setPosition(cellX, cellY)
                    .setScale(scaleX, scaleY)
                    .setRotation(rotation);
                RotateAround(cellGameObject, startX, startY, rotation);
            }

            cellGameObjects.push(cellGameObject);
        }
    }

    return cellGameObjects;
}

export default GridCutImage;
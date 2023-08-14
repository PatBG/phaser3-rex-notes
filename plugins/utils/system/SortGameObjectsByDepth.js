var SortGameObjectsByDepth = function (gameObjects, descending) {
    if (gameObjects.length <= 1) {
        return gameObjects;
    }

    if (descending === undefined) {
        descending = false;
    }

    var displayList = gameObjects[0].displayList;
    displayList.depthSort();

    if (descending) {
        gameObjects.sort(function (childA, childB) {
            return displayList.getIndex(childB) - displayList.getIndex(childA);
        })
    } else {
        gameObjects.sort(function (childA, childB) {
            return displayList.getIndex(childA) - displayList.getIndex(childB);
        })
    }

    return gameObjects;
}

export default SortGameObjectsByDepth;
import IsArray from '../object/IsArray.js';

var GetGameObjectByName = function (children, name) {
    var child;
    if (IsArray(children)) {
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = TestName(children[i], name);
            if (child) {
                return child;
            }
        }
    } else { // Is plain object
        for (var key in children) {
            child = TestName(children[key], name);
            if (child) {
                return child;
            }
        }
    }
}

var TestName = function (gameObject, name) {
    if (!gameObject) {
        return null;
    } else if (gameObject.hasOwnProperty('name')) {
        return (gameObject.name === name) ? gameObject : null;
    } else { // Array, or plain object
        return GetElementByName(gameObject, name);
    }
}

export default GetGameObjectByName;
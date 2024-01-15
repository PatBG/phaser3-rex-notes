var GetChildrenWidth = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var childrenWidth;
    if ((this.orientation === 0) || minimumMode) {
        childrenWidth = this.maxChildWidth;
    } else {
        childrenWidth = (this.wrapResult) ? this.wrapResult.width : undefined;
    }

    if (childrenWidth === undefined) {
        return undefined;
    }

    return childrenWidth + this.space.left + this.space.right;
}

export default GetChildrenWidth;
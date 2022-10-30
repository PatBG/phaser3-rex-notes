export default {
    setupBinding() {
        var inputField = this.childrenMap.inputField;
        inputField
            // Set text value to object when closing editor
            .on('close', function () {
                if (!this.bindTarget) {
                    return;
                }
                this.bindTarget[this.bindTargetKey] = inputField.getValue();;
            }, this);

        return this;
    },

    setBindingTarget(target, key) {
        this.bindTarget = target;
        if (key !== undefined) {
            this.setBindingTargetKey(key);
        }
        return this;
    },

    setBindingTargetKey(key) {
        this.bindTargetKey = key;
        this.syncTargetValue();
        return this;
    },

    syncTargetValue() {
        if (!this.bindTarget) {
            return this;
        }

        var inputField = this.childrenMap.inputField;
        inputField.setValue(this.bindTarget[this.bindTargetKey]);

        return this;
    },

}
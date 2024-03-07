import { BehaviorTree, IfSelector, IDLE, RUNNING } from '../../../behaviortree';

const RoundState = '$roundState';
const ConditionEvalPassed = '$conditionEvalPassed';

const RoundIdle = 0
const RoundRun = 1
const RoundComplete = 2

class EventBehaviorTree extends BehaviorTree {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        super(config);

        var { parallel = false } = config
        this.properties.parallel = parallel;

        var { condition = 'true' } = config;
        var root = new IfSelector({
            title: this.title,
            expression: condition,
            conditionEvalBreak: true   // Return RUNNING instead of SUCCESS for condition eval
        })
        this.setRoot(root);

        this.conditionEvalPassed = undefined;

        this.roundState = RoundIdle;
    }

    get isParallel() {
        return this.properties.parallel;
    }

    get conditionEvalPassed() {
        return this._conditionEvalPassed;
    }

    set conditionEvalPassed(value) {
        this._conditionEvalPassed = value;
        var blackboard = this.ticker.blackboard;
        if (blackboard) {
            this.setData(blackboard, ConditionEvalPassed, value);
        }
    }

    get roundState() {
        return this._roundState;
    }

    set roundState(value) {
        this._roundState = value;
        var blackboard = this.ticker.blackboard;
        if (blackboard) {
            this.setData(blackboard, RoundState, value);
        }
    }

    get roundComplete() {
        return this._roundState === RoundComplete;
    }

    set roundComplete(value) {
        this.roundState = (value) ? RoundComplete : RoundRun;
    }

    setConditionEnable(enable = true) {
        var selectChildIndex = (enable) ? undefined : 0;
        this.root.setSelectChildIndex(selectChildIndex);
        return this;
    }

    open(blackboard, target) {
        if (this.roundState === RoundRun) {
            return false;
        }

        this.setData(blackboard, RoundState, false);

        var state = this.getState(blackboard);
        if (state !== RUNNING) {
            this.resetState(blackboard);
        }

        this.roundState = RoundRun;

        // Condition eval
        this.tick(blackboard, target);

        return true;
    }

    tick(blackboard, target) {
        var isIdleState = blackboard.getTreeState(this.id) == IDLE;

        var state = super.tick(blackboard, target);

        if (isIdleState) {
            // Run *if* part (pass), or *catch* part (failled)
            var nodeMemory = this.root.getNodeMemory(this.ticker);
            this.conditionEvalPassed = (nodeMemory.$runningChild === 0);
        }

        if (state !== RUNNING) {
            this.roundState = RoundComplete;
        }

        return state;
    }

    abort(blackboard, target) {
        this.roundState = RoundIdle;

        super.abort(blackboard, target);
    }
}

export default EventBehaviorTree;
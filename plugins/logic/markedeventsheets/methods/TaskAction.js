import { Action, } from '../../behaviortree';
import IsEventEmitter from '../../../utils/system/IsEventEmitter.js';

class TaskAction extends Action {
    constructor(config) {
        // config: {name, parameters:{...} }        
        super({
            name: 'Task',
            title: config.name,
            properties: config,
        });

        this.isRunning = false;
    }

    open(tick) {
        this.isRunning = false;

        var taskData = this.properties;

        var taskName = taskData.name;
        if (!taskName) {
            return;
        }

        var taskHandlers = tick.target;
        var handler = taskHandlers[taskName];
        if (!handler) {
            if (taskHandlers.getHandler) {
                handler = taskHandlers.getHandler(taskName);
            }
            if (!handler) {
                return;
            }
        }

        var eventEmitter = handler.call(taskHandlers, taskData.parameters, tick.blackboard);
        if (IsEventEmitter(eventEmitter)) {
            this.isRunning = true;
            this.$nextTick = taskHandlers.$nextTick;
            eventEmitter.once('complete', this.onTaskComplete, this)
        }
    }

    onTaskComplete() {
        this.isRunning = false;

        this.$nextTick();
    }

    tick(tick) {
        return (this.isRunning) ? this.RUNNING : this.SUCCESS;
    }

    close(tick) {
    }

}

export default TaskAction
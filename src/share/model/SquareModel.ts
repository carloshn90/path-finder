import {ActionEnum} from "../enum/ActionEnum";

export class SquareModel {

    private readonly _action: ActionEnum;
    private readonly _isPath: boolean;

    constructor(action: ActionEnum, isPath: boolean) {
        this._action = action;
        this._isPath = isPath;
    }

    get action(): ActionEnum {
        return this._action;
    }

    get isPath(): boolean {
        return this._isPath;
    }
}
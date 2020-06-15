import {ActionEnum} from "../enum/ActionEnum";

export class SquareModel {

    private readonly _action: ActionEnum;
    private readonly _nodeColor: string | null;

    constructor(action: ActionEnum, nodeColor: string | null) {
        this._action = action;
        this._nodeColor = nodeColor;
    }

    get action(): ActionEnum {
        return this._action;
    }

    get nodeColor(): string | null {
        return this._nodeColor;
    }
}
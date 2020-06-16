import {ActionEnum} from "../enum/ActionEnum";
import { v4 as uuidv4 } from "uuid";

export class SquareModel {

    private readonly _id: string;
    private readonly _action: ActionEnum;
    private readonly _nodeColor: string | null;

    constructor(action: ActionEnum, nodeColor: string | null) {
        this._id = uuidv4();
        this._action = action;
        this._nodeColor = nodeColor;
    }

    get id(): string {
        return this._id;
    }

    get action(): ActionEnum {
        return this._action;
    }

    get nodeColor(): string | null {
        return this._nodeColor;
    }
}
import {Point} from "./Point";
import { v4 as uuidv4 } from "uuid";

export class TreeNode {
    private readonly _id: string;
    private readonly _position: Point;
    private readonly _childArray: Array<TreeNode>;
    private _distant: number | null;
    private readonly _isEnd: boolean;


    constructor(position: Point, childArray: Array<TreeNode>, isEnd: boolean, distant: number | null) {
        this._id = uuidv4();
        this._position = position;
        this._childArray = childArray;
        this._isEnd = isEnd;
        this._distant = distant;
    }

    get id(): string {
        return this._id;
    }

    get position(): Point {
        return this._position;
    }

    get childArray(): Array<TreeNode> {
        return this._childArray;
    }

    get isEnd(): boolean {
        return this._isEnd;
    }

    get distant(): number | null {
        return this._distant;
    }

    set distant(value: number | null) {
        this._distant = value;
    }
}
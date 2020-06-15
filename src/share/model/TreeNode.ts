import {Point} from "./Point";

export class TreeNode {
    private readonly _position: Point;
    private readonly _childArray: Array<TreeNode>;
    private _distant: number | null;
    private readonly _isEnd: boolean;


    constructor(position: Point, childArray: Array<TreeNode>, isEnd: boolean, distant: number | null) {
        this._position = position;
        this._childArray = childArray;
        this._isEnd = isEnd;
        this._distant = distant;
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
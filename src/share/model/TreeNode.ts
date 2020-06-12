import {Point} from "./Point";

export class TreeNode {
    private readonly _position: Point;
    private readonly _branches: Array<TreeNode>;
    private readonly _isEnd: boolean;


    constructor(position: Point, branches: Array<TreeNode>, isEnd: boolean) {
        this._position = position;
        this._branches = branches;
        this._isEnd = isEnd;
    }

    get position(): Point {
        return this._position;
    }

    get branches(): Array<TreeNode> {
        return this._branches;
    }

    get isEnd(): boolean {
        return this._isEnd;
    }
}
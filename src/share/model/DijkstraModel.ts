import {TreeNode} from "./TreeNode";

export class DijkstraModel {

    private readonly _currentNode: TreeNode;
    private readonly _previousTreeNode: TreeNode | null;
    private _distant: number;

    constructor(currentNode: TreeNode, previousTreeNode: TreeNode | null, distant: number) {
        this._currentNode = currentNode;
        this._previousTreeNode = previousTreeNode;
        this._distant = distant;
    }

    get currentNode(): TreeNode {
        return this._currentNode;
    }

    get previousTreeNode(): TreeNode | null {
        return this._previousTreeNode;
    }

    get distant(): number {
        return this._distant;
    }

    set distant(value: number) {
        this._distant = value;
    }

    static compare(a: DijkstraModel, b: DijkstraModel): number {
        if (a.distant < b.distant){
            return -1;
        }
        if (a.distant > b.distant){
            return 1;
        }
        return 0;
    }

}
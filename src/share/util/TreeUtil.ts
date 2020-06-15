import {ActionEnum} from "../enum/ActionEnum";
import {Point} from "../model/Point";
import {TreeNode} from "../model/TreeNode";
import {isEmpty, isNil} from "lodash";
import {SquareModel} from "../model/SquareModel";

export class TreeUtil {

    fifoStack: Array<TreeNode>;
    positionChecked: Set<string>;

    constructor() {
        this.fifoStack = [];
        this.positionChecked = new Set<string>();
    }


    matrixToTree = (matrix: Array<Array<SquareModel>>, initPosition: Point): Array<TreeNode> => {

        this.fifoStack = [new TreeNode(initPosition, [], false, null)];
        const nodeTree: Array<TreeNode> = [];

        while (!isEmpty(this.fifoStack)) {
            const node: TreeNode | undefined = this.fifoStack.shift();
            if (!isNil(node)) {
                const position: Point = node.position;
                const rightNode: TreeNode | undefined = this.createTreeNode(matrix, position.col, position.row - 1);
                const leftNode: TreeNode | undefined = this.createTreeNode(matrix, position.col, position.row + 1);
                const upNode: TreeNode | undefined = this.createTreeNode(matrix, position.col - 1, position.row);
                const downNode: TreeNode | undefined = this.createTreeNode(matrix, position.col + 1, position.row);

                TreeUtil.addToFatherNode(node, rightNode, leftNode, upNode, downNode);
                this.addNodesQueue(rightNode, leftNode, upNode, downNode);
                nodeTree.push(node);
            }
        }

        return nodeTree;
    }

    private createTreeNode = (matrix: Array<Array<SquareModel>>, col: number, row: number): TreeNode | undefined => {

        const colRowKey: string = "" + col + row;
        if (this.positionChecked.has(colRowKey)) return undefined;

        this.positionChecked.add(colRowKey);
        try {
            const action: ActionEnum | undefined = matrix[col][row].action;

            if (isNil(action) || action === ActionEnum.start || action === ActionEnum.wall) return undefined;

            return new TreeNode(new Point(col, row), [], action === ActionEnum.end, null);
        } catch (e) {
            return undefined;
        }
    }

    private addNodesQueue = (rightNode: TreeNode | undefined, leftNode: TreeNode | undefined,
                          upNode: TreeNode | undefined, downNode: TreeNode | undefined) => {

        if (!isNil(rightNode)) this.fifoStack.push(rightNode);
        if (!isNil(leftNode)) this.fifoStack.push(leftNode);
        if (!isNil(upNode)) this.fifoStack.push(upNode);
        if (!isNil(downNode)) this.fifoStack.push(downNode);
    }

    private static addToFatherNode = (fatherNode: TreeNode, rightNode: TreeNode | undefined,
                                   leftNode: TreeNode | undefined, upNode: TreeNode | undefined, downNode: TreeNode | undefined) => {

        if (!isNil(rightNode)) fatherNode.childArray.push(rightNode);
        if (!isNil(leftNode)) fatherNode.childArray.push(leftNode);
        if (!isNil(upNode)) fatherNode.childArray.push(upNode);
        if (!isNil(downNode)) fatherNode.childArray.push(downNode);
    }
}
import {ActionEnum} from "../enum/ActionEnum";
import {Point} from "../model/Point";
import {TreeNode} from "../model/TreeNode";
import {isEmpty, isNil} from "lodash";

export class TreeUtil {

    fifoStack: Array<TreeNode>;
    positionChecked: Set<string>;

    constructor() {
        this.fifoStack = [];
        this.positionChecked = new Set<string>();
    }


    matrixToTree(matrix: Array<Array<ActionEnum>>, initPosition: Point): Array<TreeNode> {

        this.fifoStack = [new TreeNode(initPosition, [], false)];
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

    private createTreeNode(matrix: Array<Array<ActionEnum>>, col: number, row: number): TreeNode | undefined {

        const colRowKey: string = "" + col + row;
        if (this.positionChecked.has(colRowKey)) return undefined;

        this.positionChecked.add(colRowKey);
        try {
            const action: ActionEnum | undefined = matrix[col][row];

            if (isNil(action) || action === ActionEnum.start || action === ActionEnum.wall) return undefined;

            return new TreeNode(new Point(col, row), [], action === ActionEnum.end);
        } catch (e) {
            return undefined;
        }
    }

    private addNodesQueue(rightNode: TreeNode | undefined, leftNode: TreeNode | undefined,
                          upNode: TreeNode | undefined, downNode: TreeNode | undefined) {

        if (!isNil(rightNode)) this.fifoStack.push(rightNode);
        if (!isNil(leftNode)) this.fifoStack.push(leftNode);
        if (!isNil(upNode)) this.fifoStack.push(upNode);
        if (!isNil(downNode)) this.fifoStack.push(downNode);
    }

    private static addToFatherNode(fatherNode: TreeNode, rightNode: TreeNode | undefined,
                                   leftNode: TreeNode | undefined, upNode: TreeNode | undefined, downNode: TreeNode | undefined) {

        if (!isNil(rightNode)) fatherNode.branches.push(rightNode);
        if (!isNil(leftNode)) fatherNode.branches.push(leftNode);
        if (!isNil(upNode)) fatherNode.branches.push(upNode);
        if (!isNil(downNode)) fatherNode.branches.push(downNode);
    }
}
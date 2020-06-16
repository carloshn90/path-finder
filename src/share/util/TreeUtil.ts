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
                const rightNode: TreeNode | null = this.createTreeNode(matrix, position.col, position.row - 1);
                const leftNode: TreeNode | null = this.createTreeNode(matrix, position.col, position.row + 1);
                const upNode: TreeNode | null = this.createTreeNode(matrix, position.col - 1, position.row);
                const downNode: TreeNode | null = this.createTreeNode(matrix, position.col + 1, position.row);

                TreeUtil.addToFatherNode(node, rightNode, leftNode, upNode, downNode);
                this.addNodesQueue(rightNode, leftNode, upNode, downNode);
                nodeTree.push(node);
            }
        }

        return nodeTree;
    }

    private createTreeNode = (matrix: Array<Array<SquareModel>>, col: number, row: number): TreeNode | null => {


        if (col < 0 || col >= (matrix.length)) return null;
        if (row < 0 || row >= (matrix[col].length))  return null;


        try {
            const squreModel: SquareModel = matrix[col][row];

            if (this.positionChecked.has(squreModel.id)) return null;
            this.positionChecked.add(squreModel.id);

            if (isNil(squreModel.action) || squreModel.action === ActionEnum.start || squreModel.action === ActionEnum.wall) {
                console.log("wall");
                return null;
            }

            return new TreeNode(new Point(col, row), [], squreModel.action === ActionEnum.end, null);
        } catch (e) {
            console.log("Errror: ", col);
            return null;
        }
    }

    private addNodesQueue = (rightNode: TreeNode | null, leftNode: TreeNode | null,
                          upNode: TreeNode | null, downNode: TreeNode | null) => {

        if (!isNil(rightNode)) this.fifoStack.push(rightNode);
        if (!isNil(leftNode)) this.fifoStack.push(leftNode);
        if (!isNil(upNode)) this.fifoStack.push(upNode);
        if (!isNil(downNode)) this.fifoStack.push(downNode);
    }

    private static addToFatherNode = (fatherNode: TreeNode, rightNode: TreeNode | null,
                                   leftNode: TreeNode | null, upNode: TreeNode | null, downNode: TreeNode | null) => {

        if (!isNil(rightNode)) fatherNode.childArray.push(rightNode);
        if (!isNil(leftNode)) fatherNode.childArray.push(leftNode);
        if (!isNil(upNode)) fatherNode.childArray.push(upNode);
        if (!isNil(downNode)) fatherNode.childArray.push(downNode);
    }
}
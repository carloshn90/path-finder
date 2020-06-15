import {TreeNode} from "../../model/TreeNode";
import { isNil, isEmpty } from "lodash";
import {DijkstraModel} from "../../model/DijkstraModel";
import {Point} from "../../model/Point";

export class Dijkstra {

    visited: Set<string>;
    dijkstraModelArray: Array<DijkstraModel>

    constructor() {
        this.visited = new Set<string>();
        this.dijkstraModelArray = [];
    }

    calculateShorterPath = (treeNodeArray: Array<TreeNode>): Array<Point> | null => {

        let currentNode: TreeNode | null = treeNodeArray[0];

        do {
            this.visited.add(Dijkstra.createNodeKey(currentNode));
            const currentDijkstra: DijkstraModel = new DijkstraModel(currentNode, null, 0);
            this.dijkstraModelArray.push(currentDijkstra);
            this.iterateChild(currentDijkstra);
            currentNode = this.getNextNotVisitedNode();
        } while (!isNil(currentNode) && !currentNode.isEnd);

        if (isNil(currentNode)) return null;

        return this.createPath(currentNode);
    }

    private iterateChild = (currentDijkstra: DijkstraModel) => {

        const currentNode: TreeNode = currentDijkstra.currentNode;

        for (let childTreeNode of currentNode.childArray) {
            if (!this.hasVisited(childTreeNode)) {
                childTreeNode.distant = currentDijkstra.distant + 1;
                this.updateDijkstraModelArray(childTreeNode, currentNode, childTreeNode.distant);
            }
        }

    }

    private updateDijkstraModelArray = (currentNode: TreeNode, previousNode: TreeNode, distant: number): void => {

        const existInDijkstraModelArray: DijkstraModel | undefined = this.dijkstraModelArray.find(dijkstra => dijkstra.currentNode === currentNode);

        if (isNil(existInDijkstraModelArray)) {
            this.dijkstraModelArray.push(new DijkstraModel(currentNode, previousNode, distant));
        } else if (existInDijkstraModelArray.distant > distant) {
            existInDijkstraModelArray.distant = distant;
        }
    }

    private getNextNotVisitedNode = (): TreeNode | null => {
        const notVisitedNodeArray: Array<DijkstraModel> = this.dijkstraModelArray
            .filter(dijkstra => !this.visited.has(Dijkstra.createNodeKey(dijkstra.currentNode)));

        if (isEmpty(notVisitedNodeArray)) return null;

        return notVisitedNodeArray.sort(DijkstraModel.compare)[0].currentNode;
    }

    private hasVisited = (node: TreeNode): boolean => {

        const nodeKey: string = Dijkstra.createNodeKey(node);

        return this.visited.has(nodeKey);
    }

    private createPath = (lastNode: TreeNode): Array<Point>  => {
        const path: Array<Point> = [];
        let currentNode: DijkstraModel | undefined = this.findDijkstraByCurrentNode(lastNode);

        do {
            if (!isNil(currentNode)) {
                const dijkstraModel: DijkstraModel = currentNode;
                path.push(dijkstraModel.currentNode.position);
                currentNode = this.findDijkstraByCurrentNode(dijkstraModel.previousTreeNode);
            }
        }
        while (!isNil(currentNode));

        return path;
    }

    private findDijkstraByCurrentNode = (currentNode: TreeNode | null): DijkstraModel | undefined => {

        if (isNil(currentNode)) return undefined;

        return this.dijkstraModelArray.find(dijkstra => dijkstra.currentNode === currentNode)
    }


    private static createNodeKey = (node: TreeNode): string => {
        return "" + node.position.col + node.position.row;
    }
}
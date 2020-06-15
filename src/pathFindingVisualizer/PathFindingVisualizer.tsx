import React, {Component, ReactElement} from "react";
import "./PathFindingVisualizer.css"
import {Board} from "./board/Board";
import {ToolPanel} from "./tools/ToolPanel";
import {ActionEnum} from "../share/enum/ActionEnum";
import {Point} from "../share/model/Point";
import {TreeNode} from "../share/model/TreeNode";
import {TreeUtil} from "../share/util/TreeUtil";
import {isNil} from "lodash";
import {Dijkstra} from "../share/algorithm/dijkstra/Dijkstra";
import {SquareModel} from "../share/model/SquareModel";

export interface IPathFindingVisualizerProps {}
export interface IPathFindingVisualizerState {
    actionSelected: ActionEnum;
    isClicked: boolean;
    actionMatrix: Array<Array<SquareModel>>;
    startPosition: Point | null;
    endPosition: Point | null;
}

export class PathFindingVisualizer extends Component<IPathFindingVisualizerProps, IPathFindingVisualizerState>{

    constructor(props: IPathFindingVisualizerProps) {
        super(props);
        this.state = {
            actionSelected: ActionEnum.none,
            isClicked: false,
            actionMatrix: this.createActionMatrix(20, 30),
            startPosition: null,
            endPosition: null
        };
    }

    private setActionState = (action: ActionEnum): void => {

        this.setState({
            actionSelected: action,
            isClicked: this.state.isClicked
        });
    }

    private setIsClicked = (isClicked: boolean): void => {
        this.setState({
            actionSelected: this.state.actionSelected,
            isClicked: isClicked
        });
    }

    private createActionMatrix = (numberRows: number, numberCol: number): Array<Array<SquareModel>> => {

        const actionMatrix: Array<Array<SquareModel>> = [[]];

        for (let row = 0; row < numberRows; ++row) {
            const actionColArray: Array<SquareModel> = [];
            for (let col = 0; col < numberCol; ++col) {
                actionColArray.push(new SquareModel(ActionEnum.none, false));
            }
            actionMatrix.push(actionColArray);
        }

        return actionMatrix;
    }

    private updateActionMatrix = (position: Point): void => {

        const actionMatrixCopy: Array<Array<SquareModel>> = this.cleanActionMatrix(position, this.state.actionSelected);

        actionMatrixCopy[position.col][position.row] = new SquareModel(this.state.actionSelected, false);

        this.setState({
            actionSelected: this.state.actionSelected,
            actionMatrix: actionMatrixCopy,
            isClicked: this.state.isClicked
        });
    }

    private cleanActionMatrix = (position: Point, action: ActionEnum): Array<Array<SquareModel>> => {

        const actionMatrixCopy: Array<Array<SquareModel>> = this.state.actionMatrix.slice(0);

        switch (action) {
            case ActionEnum.start:
                this.cleanStarPosition(position, actionMatrixCopy);
                break;
            case ActionEnum.end:
                this.cleanEndPosition(position, actionMatrixCopy);
                break;
        }

        return actionMatrixCopy;
    }

    private cleanStarPosition = (position: Point, actionMatrix: Array<Array<SquareModel>>): Array<Array<SquareModel>> => {

        if (this.state.startPosition !== null)
            actionMatrix[this.state.startPosition.col][this.state.startPosition.row] = new SquareModel(ActionEnum.none, false);

        this.setState({startPosition: position});

        return actionMatrix;
    }

    private cleanEndPosition = (position: Point, actionMatrix: Array<Array<SquareModel>>): Array<Array<SquareModel>> => {

        if (this.state.endPosition !== null)
            actionMatrix[this.state.endPosition.col][this.state.endPosition.row] = new SquareModel(ActionEnum.none, false);

        this.setState({endPosition: position});

        return actionMatrix;
    }

    private executeDijkstraAlgorithm = (): void => {

        const initPosition: Point | null = this.state.startPosition;
        if (!isNil(initPosition)) {
            const treeNodeArray: Array<TreeNode> = new TreeUtil().matrixToTree(this.state.actionMatrix, initPosition);
            const path: Array<Point> | null = new Dijkstra().calculateShorterPath(treeNodeArray);
            if (!isNil(path)) {
                this.paintPath(path);
            }
        }
    }

    private paintPath = (path: Array<Point>): void => {

        const actionMatrixCopy: Array<Array<SquareModel>> = this.getCleanPathMatrix();

        for (let pathPosition of path) {
            const squareModelAux: SquareModel = actionMatrixCopy[pathPosition.col][pathPosition.row];
            actionMatrixCopy[pathPosition.col][pathPosition.row] = new SquareModel(squareModelAux.action, true);
        }

        this.setState({
            actionMatrix: actionMatrixCopy
        });
    }

    private getCleanPathMatrix = (): Array<Array<SquareModel>> => {
        const actionMatrixCopy: Array<Array<SquareModel>> = this.state.actionMatrix.slice(0);

        for (let colPosition = 0; colPosition < actionMatrixCopy.length; ++colPosition) {
            for (let rowPosition = 0; rowPosition < actionMatrixCopy[colPosition].length; ++rowPosition) {
                const squareModelAux: SquareModel = actionMatrixCopy[colPosition][rowPosition];
                actionMatrixCopy[colPosition][rowPosition] = new SquareModel(squareModelAux.action, false);
            }
        }

        return actionMatrixCopy;
    }

    render = (): ReactElement => {
        return (
            <div className="container">
                <div className="col-12">
                    <div className="row">

                        <div className="path-finding">

                            <div className="col-12">
                                <div className="row">
                                    <h1 className="text-center title">Path finder</h1>
                                </div>
                                <div className="row">
                                    <ToolPanel
                                        onAction={(action: ActionEnum) => this.setActionState(action)}
                                        onPlay={() => this.executeDijkstraAlgorithm()}
                                    >
                                    </ToolPanel>
                                </div>
                                <div className="row">
                                    <Board
                                        actionMatrix={this.state.actionMatrix}
                                        actionSelected={this.state.actionSelected}
                                        isClicked={this.state.isClicked}
                                        onMouseDown={() => this.setIsClicked(true)}
                                        onMouseUp={() => this.setIsClicked(false)}
                                        onChangeAction={(point: Point) => this.updateActionMatrix(point)}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }

}
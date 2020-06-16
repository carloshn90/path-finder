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
import {DijkstraResultModel} from "../share/model/DijkstraResultModel";
import {DijkstraModel} from "../share/model/DijkstraModel";

export interface IPathFindingVisualizerProps {}
export interface IPathFindingVisualizerState {
    actionSelected: ActionEnum;
    isClicked: boolean;
    actionMatrix: Array<Array<SquareModel>>;
    startPosition: Point | null;
    endPosition: Point | null;
    speed: number;
    steps: number;
    isPlaying: boolean;
}

export class PathFindingVisualizer extends Component<IPathFindingVisualizerProps, IPathFindingVisualizerState>{

    constructor(props: IPathFindingVisualizerProps) {
        super(props);
        this.state = {
            actionSelected: ActionEnum.none,
            isClicked: false,
            actionMatrix: this.createActionMatrix(20, 30),
            startPosition: null,
            endPosition: null,
            speed: 0,
            steps: 0,
            isPlaying: false
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
                actionColArray.push(new SquareModel(ActionEnum.none, null));
            }
            actionMatrix.push(actionColArray);
        }

        return actionMatrix;
    }

    private updateActionMatrix = (position: Point): void => {

        const actionMatrixCopy: Array<Array<SquareModel>> = this.cleanActionMatrix(position, this.state.actionSelected);

        actionMatrixCopy[position.col][position.row] = new SquareModel(this.state.actionSelected, null);

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
            actionMatrix[this.state.startPosition.col][this.state.startPosition.row] = new SquareModel(ActionEnum.none, null);

        this.setState({startPosition: position});

        return actionMatrix;
    }

    private cleanEndPosition = (position: Point, actionMatrix: Array<Array<SquareModel>>): Array<Array<SquareModel>> => {

        if (this.state.endPosition !== null)
            actionMatrix[this.state.endPosition.col][this.state.endPosition.row] = new SquareModel(ActionEnum.none, null);

        this.setState({endPosition: position});

        return actionMatrix;
    }

    private executeDijkstraAlgorithm = (): void => {

        if (this.state.isPlaying) return;

        this.setState({isPlaying: true})

        const initPosition: Point | null = this.state.startPosition;
        if (!isNil(initPosition)) {
            const treeNodeArray: Array<TreeNode> = new TreeUtil().matrixToTree(this.state.actionMatrix, initPosition);
            const dijkstraResultModel: DijkstraResultModel = new Dijkstra().calculateShorterPath(treeNodeArray);
            this.paintSimulation(dijkstraResultModel.dijkstraStepResults)
                .then(_ => this.paintPath(dijkstraResultModel.path));
        }
    }

    private paintSimulation = async (dijkstraStepResults: Array<DijkstraModel>): Promise<void> => {

        let actionMatrixCopy: Array<Array<SquareModel>> = this.getCleanPathMatrix();
        this.setState({steps: 0});
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        for (let dijkstraModel of dijkstraStepResults) {
            const currentNode: TreeNode = dijkstraModel.currentNode;
            const squareModelAux: SquareModel = actionMatrixCopy[currentNode.position.col][currentNode.position.row];
            actionMatrixCopy[currentNode.position.col][currentNode.position.row] =
                new SquareModel(squareModelAux.action, PathFindingVisualizer.getColorByDistant(dijkstraModel.distant));

            this.setState({
                actionMatrix: actionMatrixCopy.slice(0),
                steps: this.state.steps + 1
            });

            if (this.state.speed > 1)
                await delay(this.state.speed);
        }
    }

    private paintPath = (path: Array<Point>): void => {

        const actionMatrixCopy: Array<Array<SquareModel>> = this.state.actionMatrix.slice(0);

        for (let pathPosition of path) {
            const squareModelAux: SquareModel = actionMatrixCopy[pathPosition.col][pathPosition.row];
            actionMatrixCopy[pathPosition.col][pathPosition.row] = new SquareModel(squareModelAux.action, 'blue');
        }

        this.setState({
            actionMatrix: actionMatrixCopy,
            isPlaying: false
        });
    }

    private getCleanPathMatrix = (): Array<Array<SquareModel>> => {
        const actionMatrixCopy: Array<Array<SquareModel>> = this.state.actionMatrix.slice(0);

        for (let colPosition = 0; colPosition < actionMatrixCopy.length; ++colPosition) {
            for (let rowPosition = 0; rowPosition < actionMatrixCopy[colPosition].length; ++rowPosition) {
                const squareModelAux: SquareModel = actionMatrixCopy[colPosition][rowPosition];
                actionMatrixCopy[colPosition][rowPosition] = new SquareModel(squareModelAux.action, null);
            }
        }

        return actionMatrixCopy;
    }

    private static getColorByDistant(distant: number): string {
        if (distant < 6) return 'green';
        if (distant < 12) return 'yellow';
        if (distant < 18) return 'orange';

        return 'red';
    }

    render = (): ReactElement => {
        return (
            <div className="container">
                <div className="col-12">
                    <div className="row">

                        <div className="path-finding">

                            <div className="col-12">
                                <div className="row">
                                    <h1 className="text-center title">Dijkstra</h1>
                                </div>
                                <div className="row">
                                    <ToolPanel
                                        speed={this.state.speed}
                                        steps={this.state.steps}
                                        isPlaying={this.state.isPlaying}
                                        onSpeedChange={(value: number) => this.setState({speed: value})}
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
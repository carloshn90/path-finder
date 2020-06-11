import React, {Component, ReactElement} from "react";
import "./PathFindingVisualizer.css"
import {Board} from "./board/Board";
import {ToolPanel} from "./tools/ToolPanel";
import {ActionEnum} from "../share/enum/ActionEnum";
import {Point} from "../share/model/Point";

export interface IPathFindingVisualizerProps {}
export interface IPathFindingVisualizerState {
    actionSelected: ActionEnum;
    isClicked: boolean;
    actionMatrix: Array<Array<ActionEnum>>;
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

    private createActionMatrix = (numberRows: number, numberCol: number): Array<Array<ActionEnum>> => {

        const actionMatrix: Array<Array<ActionEnum>> = [[]];

        for (let row = 0; row < numberRows; ++row) {
            const actionColArray: Array<ActionEnum> = [];
            for (let col = 0; col < numberCol; ++col) {
                actionColArray.push(ActionEnum.none);
            }
            actionMatrix.push(actionColArray);
        }

        return actionMatrix;
    }

    private updateActionMatrix = (position: Point): void => {

        const actionMatrixCopy: Array<Array<ActionEnum>> = this.cleanActionMatrix(position, this.state.actionSelected);

        actionMatrixCopy[position.col][position.row] = this.state.actionSelected;

        this.setState({
            actionSelected: this.state.actionSelected,
            actionMatrix: actionMatrixCopy,
            isClicked: this.state.isClicked
        });
    }

    private cleanActionMatrix = (position: Point, action: ActionEnum): Array<Array<ActionEnum>> => {

        const actionMatrixCopy: Array<Array<ActionEnum>> = this.state.actionMatrix.slice(0);

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

    private cleanStarPosition = (position: Point, actionMatrix: Array<Array<ActionEnum>>): Array<Array<ActionEnum>> => {

        if (this.state.startPosition !== null)
            actionMatrix[this.state.startPosition.col][this.state.startPosition.row] = ActionEnum.none;

        this.setState({startPosition: position});

        return actionMatrix;
    }

    private cleanEndPosition = (position: Point, actionMatrix: Array<Array<ActionEnum>>): Array<Array<ActionEnum>> => {

        if (this.state.endPosition !== null)
            actionMatrix[this.state.endPosition.col][this.state.endPosition.row] = ActionEnum.none;

        this.setState({endPosition: position});

        return actionMatrix;
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
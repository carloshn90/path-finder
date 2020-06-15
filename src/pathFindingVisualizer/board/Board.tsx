import {Component, ReactElement} from "react";
import React from "react";
import {Square} from "./square/Square";
import "./Board.css"
import {ActionEnum} from "../../share/enum/ActionEnum";
import {Point} from "../../share/model/Point";
import {SquareModel} from "../../share/model/SquareModel";


export interface IBoardProps {
    actionSelected: ActionEnum;
    actionMatrix: Array<Array<SquareModel>>;
    isClicked: boolean;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onChangeAction: (point: Point) => void;
}

export interface IBoardState {

}

export class Board extends Component<IBoardProps, IBoardState> {

    private renderSquare = (colIndex: number, rowIndex: number, squareModel: SquareModel): ReactElement => {
        return <Square
            actionSelected={this.props.actionSelected}
            position={new Point(colIndex, rowIndex)}
            squareModel={squareModel}
            isClicked={this.props.isClicked}
            onMouseDown={() => this.props.onMouseDown()}
            onMouseUp={() => this.props.onMouseUp()}
            onChangeAction={(point: Point) => this.props.onChangeAction(point)}
        />;
    }

    private createBoard = (actionMatrix: Array<Array<SquareModel>>): Array<ReactElement> => {
        const elementArray: Array<ReactElement> = [];
        let colIndex: number = 0;
        for (let colArray of actionMatrix) {
            let rowIndex: number = 0;
            const colElementArray: Array<ReactElement> = [];
            for (let squareModel of colArray) {
                colElementArray.push(this.renderSquare(colIndex, rowIndex, squareModel));
                rowIndex += 1;
            }
            colIndex += 1;
            elementArray.push(<div className="board-row" key={colIndex}>{colElementArray}</div>);
        }

        return elementArray;
    }

    render = (): ReactElement => {
        return (
            <div>
                {this.createBoard(this.props.actionMatrix)}
            </div>
        );
    }

}

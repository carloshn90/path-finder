import {Component, ReactElement} from "react";
import React from "react";
import {Square} from "./square/Square";
import "./Board.css"
import {ActionEnum} from "../../share/enum/ActionEnum";
import {Point} from "../../share/model/Point";


export interface IBoardProps {
    actionSelected: ActionEnum;
    actionMatrix: Array<Array<ActionEnum>>;
    isClicked: boolean;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onChangeAction: (point: Point) => void;
}

export interface IBoardState {

}

export class Board extends Component<IBoardProps, IBoardState> {

    private renderSquare = (colIndex: number, rowIndex: number, action: ActionEnum): ReactElement => {
        return <Square
            actionSelected={this.props.actionSelected}
            position={new Point(colIndex, rowIndex)}
            action={action}
            isClicked={this.props.isClicked}
            onMouseDown={() => this.props.onMouseDown()}
            onMouseUp={() => this.props.onMouseUp()}
            onChangeAction={(point: Point) => this.props.onChangeAction(point)}
        />;
    }

    private createBoard = (actionMatrix: Array<Array<ActionEnum>>): Array<ReactElement> => {
        const elementArray: Array<ReactElement> = [];
        let colIndex: number = 0;
        for (let colArray of actionMatrix) {
            let rowIndex: number = 0;
            const colElementArray: Array<ReactElement> = [];
            for (let action of colArray) {
                colElementArray.push(this.renderSquare(colIndex, rowIndex, action));
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

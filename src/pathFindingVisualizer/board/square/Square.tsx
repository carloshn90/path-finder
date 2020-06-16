import React, {Component, ReactElement} from "react";
import "./Square.css"
import {faArrowRight, faBullseye, faEraser, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ActionEnum} from "../../../share/enum/ActionEnum";
import {Point} from "../../../share/model/Point";
import {SquareModel} from "../../../share/model/SquareModel";
import {isNil} from "lodash";

export interface ISquareProps {
    actionSelected: ActionEnum;
    squareModel: SquareModel;
    isClicked: boolean;
    position: Point;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onChangeAction: (point: Point) => void;
}

export interface ISquareState {
    isHovered: boolean;
}

export class Square extends Component<ISquareProps, ISquareState>{

    constructor(props: ISquareProps) {
        super(props);

        this.state = {
            isHovered: false
        };
    }

    private getBackgroundColor = (): string => {

        if (!isNil(this.props.squareModel.nodeColor)) return this.props.squareModel.nodeColor;

        switch (this.props.squareModel.action) {
            case ActionEnum.wall:
                return 'black';
            case ActionEnum.clean:
                return 'white';
            case ActionEnum.none:
                return 'white';
        }

        return 'white';
    }

    private showHoverIcon = (): ReactElement | null => {

        if (!this.state.isHovered
            || this.props.squareModel.action === ActionEnum.start
            || this.props.squareModel.action === ActionEnum.end) return null;

        switch (this.props.actionSelected) {
            case ActionEnum.wall:
                return (<FontAwesomeIcon icon={faPencilAlt} />);
            case ActionEnum.clean:
                return (<FontAwesomeIcon icon={faEraser} color="white" />);
            case ActionEnum.start:
                return (<FontAwesomeIcon icon={faArrowRight} />);
            case ActionEnum.end:
                return (<FontAwesomeIcon icon={faBullseye} />);
            case ActionEnum.none:
                return null;
        }
    }

    private onMouseDown = (): void => {
        this.props.onChangeAction(this.props.position);
        this.props.onMouseDown()
    }

    private onMouseEnter = (): void => {
        this.setState({
            isHovered: true
        });

        if (this.props.isClicked)
            this.props.onChangeAction(this.props.position);
    }

    private onMouseLeave = (): void => {
        this.setState({
            isHovered: false
        })
    }

    private showIcon = (): ReactElement | null => {
        switch (this.props.squareModel.action) {
            case ActionEnum.start:
                return (<FontAwesomeIcon icon={faArrowRight} />);
            case ActionEnum.end:
                return (<FontAwesomeIcon icon={faBullseye} />);
        }

        return null;
    }

    render = (): ReactElement => {
        return (
            <button className="square"
                    style={{ backgroundColor: this.getBackgroundColor() }}
                    onMouseDown={() => this.onMouseDown()}
                    onMouseUp={() => this.props.onMouseUp()}
                    onMouseEnter={() => this.onMouseEnter()}
                    onMouseLeave={() => this.onMouseLeave()}
            >
                { this.showIcon() }
                { this.showHoverIcon() }
            </button>
        );
    }
}
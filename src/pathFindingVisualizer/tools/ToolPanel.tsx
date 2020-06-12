import React, {Component, ReactElement} from "react";
import "./ToolPanel.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faBullseye, faEraser, faPencilAlt, faPlay} from "@fortawesome/free-solid-svg-icons";
import {ActionEnum} from "../../share/enum/ActionEnum";

export interface IToolPanelProps {
    onAction: (action: ActionEnum) => void;
    onPlay: () => void;
}

export class ToolPanel extends Component<IToolPanelProps, {}> {

    render = (): ReactElement => {
        return (
            <div className="card tool">
                <div className="card-header">
                    Tools
                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-2">
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => this.props.onAction(ActionEnum.wall)}
                            >
                                <FontAwesomeIcon icon={faPencilAlt}/>
                                <span>Wall</span>
                            </button>
                        </div>

                        <div className="col-2">
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => this.props.onAction(ActionEnum.clean)}
                            >
                                <FontAwesomeIcon icon={faEraser}/>
                                <span>clean</span>
                            </button>
                        </div>

                        <div className="col-2">
                            <button className="btn btn-outline-secondary"
                                    onClick={() => this.props.onAction(ActionEnum.start)}
                            >
                                <FontAwesomeIcon icon={faArrowRight}/>
                                <span>start</span>
                            </button>
                        </div>

                        <div className="col-2">
                            <button className="btn btn-outline-secondary"
                                    onClick={() => this.props.onAction(ActionEnum.end)}
                            >
                                <FontAwesomeIcon icon={faBullseye}/>
                                <span>end</span>
                            </button>
                        </div>

                        <div className="col-2">
                            <button className="btn btn-outline-secondary"
                                    onClick={() => this.props.onPlay()}
                            >
                                <FontAwesomeIcon icon={faPlay}/>
                                <span>play</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}